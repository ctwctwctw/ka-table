import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { DateTreeComponent, DateTreeFilter, DateTreeNode } from './DateTreeComponent';
import { DataType } from '../../enums';

describe('DateTreeComponent', () => {
    const mockOnToggleExpand = jest.fn();
    const mockOnToggleSelect = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const createMockNodes = (): DateTreeNode[] => [
        {
            label: '2023',
            value: '2023',
            isSelected: false,
            isExpanded: false,
            level: 'year',
            children: [
                {
                    label: '12',
                    value: '2023-12',
                    isSelected: false,
                    isExpanded: false,
                    level: 'month',
                    children: [
                        {
                            label: '25',
                            value: '2023-12-25',
                            isSelected: true,
                            isExpanded: false,
                            level: 'day',
                            originalValues: ['2023-12-25']
                        }
                    ]
                }
            ]
        },
        {
            label: '日付未設定',
            value: 'unset-dates',
            isSelected: false,
            isExpanded: false,
            level: 'year',
            originalValues: ['unset']
        }
    ];

    describe('DateTreeComponent', () => {
        it('should render tree nodes correctly', () => {
            const nodes = createMockNodes();
            render(
                <DateTreeComponent
                    nodes={nodes}
                    onToggleExpand={mockOnToggleExpand}
                    onToggleSelect={mockOnToggleSelect}
                    level={0}
                />
            );

            expect(screen.getByText('2023')).toBeInTheDocument();
            expect(screen.getByText('日付未設定')).toBeInTheDocument();
        });

        it('should show expand icon for nodes with children', () => {
            const nodes = createMockNodes();
            render(
                <DateTreeComponent
                    nodes={nodes}
                    onToggleExpand={mockOnToggleExpand}
                    onToggleSelect={mockOnToggleSelect}
                    level={0}
                />
            );

            const expandIcon = screen.getByText('▶');
            expect(expandIcon).toBeInTheDocument();
        });

        it('should call onToggleExpand when expand icon is clicked', () => {
            const nodes = createMockNodes();
            render(
                <DateTreeComponent
                    nodes={nodes}
                    onToggleExpand={mockOnToggleExpand}
                    onToggleSelect={mockOnToggleSelect}
                    level={0}
                />
            );

            const expandIcon = screen.getByText('▶');
            fireEvent.click(expandIcon);

            expect(mockOnToggleExpand).toHaveBeenCalledWith('2023');
        });

        it('should call onToggleSelect when checkbox is clicked', () => {
            const nodes = createMockNodes();
            render(
                <DateTreeComponent
                    nodes={nodes}
                    onToggleExpand={mockOnToggleExpand}
                    onToggleSelect={mockOnToggleSelect}
                    level={0}
                />
            );

            const checkboxes = document.querySelectorAll('.ka-custom-date-tree-checkbox');
            fireEvent.click(checkboxes[0]);

            expect(mockOnToggleSelect).toHaveBeenCalledWith('2023', true);
        });

        it('should show selected state correctly', () => {
            const nodes = createMockNodes();
            nodes[0].isSelected = true;

            render(
                <DateTreeComponent
                    nodes={nodes}
                    onToggleExpand={mockOnToggleExpand}
                    onToggleSelect={mockOnToggleSelect}
                    level={0}
                />
            );

            const selectedCheckbox = document.querySelector('.ka-custom-date-tree-checkbox--selected');
            expect(selectedCheckbox).toBeInTheDocument();
        });

        it('should show indeterminate state correctly', () => {
            const nodes = createMockNodes();
            nodes[0].isIndeterminate = true;

            render(
                <DateTreeComponent
                    nodes={nodes}
                    onToggleExpand={mockOnToggleExpand}
                    onToggleSelect={mockOnToggleSelect}
                    level={0}
                />
            );

            const indeterminateCheckbox = document.querySelector('.ka-custom-date-tree-checkbox--indeterminate');
            expect(indeterminateCheckbox).toBeInTheDocument();
        });

        it('should render children when expanded', () => {
            const nodes = createMockNodes();
            nodes[0].isExpanded = true;

            render(
                <DateTreeComponent
                    nodes={nodes}
                    onToggleExpand={mockOnToggleExpand}
                    onToggleSelect={mockOnToggleSelect}
                    level={0}
                />
            );

            expect(screen.getByText('12')).toBeInTheDocument();
        });
    });

    describe('DateTreeFilter', () => {
        const mockOnFilterChange = jest.fn();

        const mockColumn = {
            key: 'date',
            dataType: DataType.Date,
            headerFilterValues: []
        };

        const mockData = [
            { id: 1, date: '2023-12-25' },
            { id: 2, date: '2023-11-15' },
            { id: 3, date: null },
            { id: 4, date: undefined },
            { id: 5, date: 'invalid-date' },
            { id: 6, date: '' }
        ];

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should render date tree filter', () => {
            render(
                <DateTreeFilter
                    column={mockColumn}
                    data={mockData}
                    onFilterChange={mockOnFilterChange}
                />
            );

            expect(screen.getByText('2023')).toBeInTheDocument();
            expect(screen.getByText('日付未設定')).toBeInTheDocument();
        });

        it('should handle valid dates correctly', () => {
            render(
                <DateTreeFilter
                    column={mockColumn}
                    data={[{ id: 1, date: '2023-12-25' }]}
                    onFilterChange={mockOnFilterChange}
                />
            );

            expect(screen.getByText('2023')).toBeInTheDocument();
        });

        it('should handle null/undefined dates as unset', () => {
            render(
                <DateTreeFilter
                    column={mockColumn}
                    data={[{ id: 1, date: null }, { id: 2, date: undefined }]}
                    onFilterChange={mockOnFilterChange}
                />
            );

            expect(screen.getByText('日付未設定')).toBeInTheDocument();
        });

        it('should handle invalid date strings as unset', () => {
            render(
                <DateTreeFilter
                    column={mockColumn}
                    data={[{ id: 1, date: 'invalid-date' }, { id: 2, date: 'not-a-date' }]}
                    onFilterChange={mockOnFilterChange}
                />
            );

            expect(screen.getByText('日付未設定')).toBeInTheDocument();
        });

        it('should handle empty string as unset', () => {
            render(
                <DateTreeFilter
                    column={mockColumn}
                    data={[{ id: 1, date: '' }]}
                    onFilterChange={mockOnFilterChange}
                />
            );

            expect(screen.getByText('日付未設定')).toBeInTheDocument();
        });

        it('should call onFilterChange when selection changes', () => {
            render(
                <DateTreeFilter
                    column={mockColumn}
                    data={mockData}
                    onFilterChange={mockOnFilterChange}
                />
            );

            const checkboxes = document.querySelectorAll('.ka-custom-date-tree-checkbox');
            fireEvent.click(checkboxes[0]);

            expect(mockOnFilterChange).toHaveBeenCalled();
        });

        it('should work with custom format function', () => {
            const mockFormat = jest.fn((props) => {
                if (props.value === null) return 'custom-null';
                return props.value?.toString();
            });

            render(
                <DateTreeFilter
                    column={mockColumn}
                    data={[{ id: 1, date: null }]}
                    format={mockFormat}
                    onFilterChange={mockOnFilterChange}
                />
            );

            expect(mockFormat).toHaveBeenCalled();
        });

        it('should not render for non-date columns', () => {
            const nonDateColumn = {
                ...mockColumn,
                dataType: DataType.String
            };

            const { container } = render(
                <DateTreeFilter
                    column={nonDateColumn}
                    data={mockData}
                    onFilterChange={mockOnFilterChange}
                />
            );

            expect(container.firstChild?.textContent).toBe('');
        });

        it('should return empty tree for empty data', () => {
            render(
                <DateTreeFilter
                    column={mockColumn}
                    data={[]}
                    onFilterChange={mockOnFilterChange}
                />
            );

            const container = document.querySelector('.ka-custom-date-tree-container');
            expect(container?.children.length).toBe(1); // Only the DateTreeComponent wrapper
        });

        it('should handle mixed valid and invalid dates', () => {
            const mixedData = [
                { id: 1, date: '2023-12-25' },
                { id: 2, date: null },
                { id: 3, date: 'invalid' }
            ];

            render(
                <DateTreeFilter
                    column={mockColumn}
                    data={mixedData}
                    onFilterChange={mockOnFilterChange}
                />
            );

            expect(screen.getByText('2023')).toBeInTheDocument();
            expect(screen.getByText('日付未設定')).toBeInTheDocument();
        });

        it('should maintain selection state from headerFilterValues', () => {
            const columnWithValues = {
                ...mockColumn,
                headerFilterValues: ['2023-12-25']
            };

            render(
                <DateTreeFilter
                    column={columnWithValues}
                    data={[{ id: 1, date: '2023-12-25' }]}
                    onFilterChange={mockOnFilterChange}
                />
            );

            // The day node should be selected based on headerFilterValues
            const selectedCheckbox = document.querySelector('.ka-custom-date-tree-checkbox--selected');
            expect(selectedCheckbox).toBeInTheDocument();
        });
    });
});
