import * as React from 'react';
import { DataType } from '../../enums';
import { getValueByColumn } from '../../Utils/DataUtils';

export type DateTreeNode = {
    label: string;
    value: string;
    isSelected: boolean;
    isExpanded: boolean;
    isIndeterminate?: boolean;
    level: 'year' | 'month' | 'day';
    children?: DateTreeNode[];
    originalValues?: string[]; // Store original date values for filtering
};

export interface DateTreeComponentProps {
    nodes: DateTreeNode[];
    onToggleExpand: (nodeValue: string) => void;
    onToggleSelect: (nodeValue: string, isSelected: boolean) => void;
    level: number;
}

export interface DateTreeFilterProps {
    column: any;
    data: any[];
    format?: any;
    onFilterChange: (selectedValues: string[]) => void;
}

export const DateTreeComponent: React.FC<DateTreeComponentProps> = ({ nodes, onToggleExpand, onToggleSelect, level }) => {
    return (
        <div>
            {nodes.map((node) => (
                <div key={node.value} className="ka-custom-date-tree-item" style={{ marginLeft: `${level * 16}px` }}>
                    <div className="ka-custom-date-tree-content">
                        {node.children && node.children.length > 0 && (
                            <span
                                className="ka-custom-date-tree-expand-icon"
                                onClick={() => onToggleExpand(node.value)}
                            >
                                {node.isExpanded ? '▼' : '▶'}
                            </span>
                        )}
                        {(!node.children || node.children.length === 0) && (
                            <span className="ka-custom-date-tree-expand-spacer"></span>
                        )}
                        <div
                            className={`ka-custom-date-tree-checkbox ${
                                node.isSelected ? 'ka-custom-date-tree-checkbox--selected' :
                                    node.isIndeterminate ? 'ka-custom-date-tree-checkbox--indeterminate' :
                                        'ka-custom-date-tree-checkbox--unselected'
                            }`}
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleSelect(node.value, !node.isSelected);
                            }}
                        >
                            {node.isSelected && !node.isIndeterminate && (
                                <span className="ka-custom-date-tree-checkmark">✓</span>
                            )}
                            {node.isIndeterminate && (
                                <div className="ka-custom-date-tree-indeterminate-fill" />
                            )}
                        </div>
                        <span
                            className="ka-custom-date-tree-label"
                            onClick={() => node.children && node.children.length > 0 && onToggleExpand(node.value)}
                        >
                            {node.label}
                        </span>
                    </div>
                    {node.isExpanded && node.children && (
                        <DateTreeComponent
                            nodes={node.children}
                            onToggleExpand={onToggleExpand}
                            onToggleSelect={onToggleSelect}
                            level={level + 1}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export const DateTreeFilter: React.FC<DateTreeFilterProps> = ({ column, data, format, onFilterChange }) => {
    const [dateTreeNodes, setDateTreeNodes] = React.useState<DateTreeNode[]>([]);

    const buildDateTree = React.useCallback(() => {
        if (column.dataType !== DataType.Date || !data) return [];

        const dateValues = data.map(item => getValueByColumn(item, column)).filter(value => value != null);
        const dateMap = new Map<string, Map<string, Map<string, string[]>>>();

        // Store original date values with their formatted counterparts
        dateValues.forEach(value => {
            const date = new Date(value);
            const year = date.getFullYear().toString();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');

            if (!dateMap.has(year)) {
                dateMap.set(year, new Map());
            }
            if (!dateMap.get(year)!.has(month)) {
                dateMap.get(year)!.set(month, new Map());
            }
            if (!dateMap.get(year)!.get(month)!.has(day)) {
                dateMap.get(year)!.get(month)!.set(day, []);
            }

            // Store the original value (formatted as it would appear in filter)
            const formattedValue = format ? format({ column, value, rowData: null }) : value?.toString();
            dateMap.get(year)!.get(month)!.get(day)!.push(formattedValue || value?.toString());
        });

        const selectedValues = new Set(column.headerFilterValues || []);
        const tree: DateTreeNode[] = [];

        Array.from(dateMap.keys()).sort().forEach(year => {
            const monthMap = dateMap.get(year)!;
            const yearChildren: DateTreeNode[] = [];
            const yearOriginalValues: string[] = [];

            Array.from(monthMap.keys()).sort().forEach(month => {
                const dayMap = monthMap.get(month)!;
                const monthChildren: DateTreeNode[] = [];
                const monthOriginalValues: string[] = [];

                Array.from(dayMap.keys()).sort().forEach(day => {
                    const originalValues = dayMap.get(day)!;
                    monthOriginalValues.push(...originalValues);
                    yearOriginalValues.push(...originalValues);

                    const daySelected = originalValues.some(val => selectedValues.has(val));
                    monthChildren.push({
                        label: day,
                        value: `${year}-${month}-${day}`,
                        isSelected: daySelected,
                        isExpanded: false,
                        level: 'day',
                        originalValues
                    });
                });

                const monthKey = `${year}-${month}`;
                const monthSelectedCount = monthChildren.filter(child => child.isSelected).length;
                const monthAllSelected = monthSelectedCount === monthChildren.length;
                const monthSomeSelected = monthSelectedCount > 0 && monthSelectedCount < monthChildren.length;

                yearChildren.push({
                    label: month,
                    value: monthKey,
                    isSelected: monthAllSelected,
                    isIndeterminate: monthSomeSelected,
                    isExpanded: false,
                    level: 'month',
                    children: monthChildren,
                    originalValues: monthOriginalValues
                });
            });

            const yearSelectedCount = yearChildren.filter(child => child.isSelected).length;
            const yearAllSelected = yearSelectedCount === yearChildren.length && yearChildren.every(child => !child.isIndeterminate);
            const yearSomeSelected = (yearSelectedCount > 0 && yearSelectedCount < yearChildren.length) || yearChildren.some(child => child.isIndeterminate);

            tree.push({
                label: year,
                value: year,
                isSelected: yearAllSelected,
                isIndeterminate: yearSomeSelected,
                isExpanded: false,
                level: 'year',
                children: yearChildren,
                originalValues: yearOriginalValues
            });
        });

        return tree;
    }, [column, data, format]);

    React.useEffect(() => {
        if (column.dataType === DataType.Date) {
            setDateTreeNodes(buildDateTree());
        }
    }, [column.dataType, buildDateTree]);

    const handleToggleExpand = (nodeValue: string) => {
        setDateTreeNodes(prevNodes => {
            const updateNode = (nodes: DateTreeNode[]): DateTreeNode[] => {
                return nodes.map(node => {
                    if (node.value === nodeValue) {
                        return { ...node, isExpanded: !node.isExpanded };
                    }
                    if (node.children) {
                        return { ...node, children: updateNode(node.children) };
                    }
                    return node;
                });
            };
            return updateNode(prevNodes);
        });
    };

    const handleToggleSelect = (nodeValue: string, isSelected: boolean) => {
        const updateSelectionInTree = (nodes: DateTreeNode[]): DateTreeNode[] => {
            return nodes.map(node => {
                if (node.value === nodeValue) {
                    if (node.children) {
                        // Recursively update all children
                        const updatedChildren = node.children.map(child =>
                            updateChildrenSelection(child, isSelected)
                        );
                        return {
                            ...node,
                            isSelected,
                            isIndeterminate: false,
                            children: updatedChildren
                        };
                    }
                    return { ...node, isSelected, isIndeterminate: false };
                }
                if (node.children) {
                    const updatedChildren = updateSelectionInTree(node.children);
                    const selectedCount = updatedChildren.filter(child => child.isSelected).length;
                    const allSelected = selectedCount === updatedChildren.length && updatedChildren.every(child => !child.isIndeterminate);
                    const someSelected = selectedCount > 0 || updatedChildren.some(child => child.isIndeterminate);

                    return {
                        ...node,
                        isSelected: allSelected,
                        isIndeterminate: someSelected && !allSelected,
                        children: updatedChildren
                    };
                }
                return node;
            });
        };

        const updateChildrenSelection = (node: DateTreeNode, selected: boolean): DateTreeNode => {
            if (node.children) {
                const updatedChildren = node.children.map(child => updateChildrenSelection(child, selected));
                return {
                    ...node,
                    isSelected: selected,
                    isIndeterminate: false,
                    children: updatedChildren
                };
            }
            return {
                ...node,
                isSelected: selected,
                isIndeterminate: false
            };
        };

        const updatedNodes = updateSelectionInTree(dateTreeNodes);
        setDateTreeNodes(updatedNodes);

        // Collect all selected original values from day-level nodes
        const getSelectedOriginalValues = (nodes: DateTreeNode[]): string[] => {
            const selected: string[] = [];
            nodes.forEach(node => {
                if (node.level === 'day' && node.isSelected && node.originalValues) {
                    selected.push(...node.originalValues);
                }
                if (node.children) {
                    selected.push(...getSelectedOriginalValues(node.children));
                }
            });
            return Array.from(new Set(selected)); // Remove duplicates
        };

        const selectedOriginalValues = getSelectedOriginalValues(updatedNodes);
        onFilterChange(selectedOriginalValues);
    };

    return (
        <div className="ka-custom-date-tree-container">
            <DateTreeComponent
                nodes={dateTreeNodes}
                onToggleExpand={handleToggleExpand}
                onToggleSelect={handleToggleSelect}
                level={0}
            />
        </div>
    );
};
