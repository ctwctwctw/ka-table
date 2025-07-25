import * as React from 'react';
export type DateTreeNode = {
    label: string;
    value: string;
    isSelected: boolean;
    isExpanded: boolean;
    isIndeterminate?: boolean;
    level: 'year' | 'month' | 'day';
    children?: DateTreeNode[];
    originalValues?: string[];
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
export declare const DateTreeComponent: React.FC<DateTreeComponentProps>;
export declare const DateTreeFilter: React.FC<DateTreeFilterProps>;
