import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeaderFilterPopupContent from './HeaderFilterPopupContent';
import { DataType, SortDirection } from '../../enums';

// Mock the dispatch function and other dependencies
const mockDispatch = jest.fn();

describe('HeaderFilterPopupContent', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const defaultProps = {
        column: {
            key: 'name',
            dataType: DataType.String,
            title: 'Name',
            headerFilterValues: [],
            headerFilterSearchValue: ''
        },
        childComponents: {},
        data: [
            { id: 1, name: 'Apple' },
            { id: 2, name: 'Banana' },
            { id: 3, name: 'Cherry' },
            { id: 4, name: 'Date' }
        ],
        dispatch: mockDispatch
    };

    describe('Sort buttons', () => {
        it('should render sort buttons', () => {
            render(<HeaderFilterPopupContent {...defaultProps} />);

            expect(screen.getByText('昇順')).toBeInTheDocument();
            expect(screen.getByText('降順')).toBeInTheDocument();
        });

        it('should show active state for ascending sort', () => {
            const props = {
                ...defaultProps,
                column: {
                    ...defaultProps.column,
                    sortDirection: SortDirection.Ascend
                }
            };

            render(<HeaderFilterPopupContent {...props} />);

            const ascButton = screen.getByText('昇順').closest('div');
            expect(ascButton).toHaveClass('ka-custom-header-filter-sort-button--active');
        });

        it('should show active state for descending sort', () => {
            const props = {
                ...defaultProps,
                column: {
                    ...defaultProps.column,
                    sortDirection: SortDirection.Descend
                }
            };

            render(<HeaderFilterPopupContent {...props} />);

            const descButton = screen.getByText('降順').closest('div');
            expect(descButton).toHaveClass('ka-custom-header-filter-sort-button--active');
        });
    });

    describe('Non-date column filtering', () => {
        it('should render filter table for non-date columns', () => {
            render(<HeaderFilterPopupContent {...defaultProps} />);

            expect(screen.getByText('Apple')).toBeInTheDocument();
            expect(screen.getByText('Banana')).toBeInTheDocument();
            expect(screen.getByText('Cherry')).toBeInTheDocument();
            expect(screen.getByText('Date')).toBeInTheDocument();
        });

        it('should render Select All Visible button', () => {
            render(<HeaderFilterPopupContent {...defaultProps} />);

            expect(screen.getByText('表示中の項目を全選択')).toBeInTheDocument();
        });

        it('should render Clear button', () => {
            render(<HeaderFilterPopupContent {...defaultProps} />);

            expect(screen.getByText('クリア')).toBeInTheDocument();
        });

        it('should call dispatch when Select All Visible is clicked', () => {
            render(<HeaderFilterPopupContent {...defaultProps} />);

            const selectAllButton = screen.getByText('表示中の項目を全選択');
            fireEvent.click(selectAllButton);

            // Should dispatch updateHeaderFilterValues for each visible item
            expect(mockDispatch).toHaveBeenCalledTimes(4); // All 4 items

            // Verify exact dispatch calls for each item
            expect(mockDispatch).toHaveBeenNthCalledWith(1, {
                type: 'UpdateHeaderFilterValues',
                columnKey: 'name',
                item: 'Apple',
                checked: true
            });
            expect(mockDispatch).toHaveBeenNthCalledWith(2, {
                type: 'UpdateHeaderFilterValues',
                columnKey: 'name',
                item: 'Banana',
                checked: true
            });
            expect(mockDispatch).toHaveBeenNthCalledWith(3, {
                type: 'UpdateHeaderFilterValues',
                columnKey: 'name',
                item: 'Cherry',
                checked: true
            });
            expect(mockDispatch).toHaveBeenNthCalledWith(4, {
                type: 'UpdateHeaderFilterValues',
                columnKey: 'name',
                item: 'Date',
                checked: true
            });
        });

        it('should call dispatch when Clear is clicked', () => {
            const propsWithSelectedValues = {
                ...defaultProps,
                column: {
                    ...defaultProps.column,
                    headerFilterValues: ['Apple', 'Banana']
                }
            };

            render(<HeaderFilterPopupContent {...propsWithSelectedValues} />);

            const clearButton = screen.getByText('クリア');
            fireEvent.click(clearButton);

            // Should dispatch updateHeaderFilterValues to deselect each selected item
            expect(mockDispatch).toHaveBeenCalledTimes(2);

            // Verify exact dispatch calls for deselecting items
            expect(mockDispatch).toHaveBeenNthCalledWith(1, {
                type: 'UpdateHeaderFilterValues',
                columnKey: 'name',
                item: 'Apple',
                checked: false
            });
            expect(mockDispatch).toHaveBeenNthCalledWith(2, {
                type: 'UpdateHeaderFilterValues',
                columnKey: 'name',
                item: 'Banana',
                checked: false
            });
        });

        it('should clear search value when Clear is clicked', () => {
            const propsWithSearch = {
                ...defaultProps,
                column: {
                    ...defaultProps.column,
                    headerFilterValues: ['Apple'],
                    headerFilterSearchValue: 'App'
                }
            };

            render(<HeaderFilterPopupContent {...propsWithSearch} />);

            const clearButton = screen.getByText('クリア');
            fireEvent.click(clearButton);

            // Should dispatch both deselect and clear search actions
            expect(mockDispatch).toHaveBeenCalledTimes(2);

            // First call: deselect the Apple item
            expect(mockDispatch).toHaveBeenNthCalledWith(1, {
                type: 'UpdateHeaderFilterValues',
                columnKey: 'name',
                item: 'Apple',
                checked: false
            });

            // Second call: clear the search value
            expect(mockDispatch).toHaveBeenNthCalledWith(2, {
                type: 'UpdateHeaderFilterSearchValue',
                columnKey: 'name',
                headerFilterSearchValue: ''
            });
        });

        it('should handle Select All Visible with search filter', () => {
            const propsWithSearch = {
                ...defaultProps,
                column: {
                    ...defaultProps.column,
                    headerFilterSearchValue: 'a', // Should match 'Banana' and 'Date'
                    isHeaderFilterSearchable: true
                }
            };

            render(<HeaderFilterPopupContent {...propsWithSearch} />);

            const selectAllButton = screen.getByText('表示中の項目を全選択');
            fireEvent.click(selectAllButton);

            // Should only select visible/filtered items (Apple, Banana and Date contain 'a')
            expect(mockDispatch).toHaveBeenCalledTimes(3);

            // Verify exact dispatch calls for filtered items only
            expect(mockDispatch).toHaveBeenNthCalledWith(1, {
                type: 'UpdateHeaderFilterValues',
                columnKey: 'name',
                item: 'Apple',
                checked: true
            });
            expect(mockDispatch).toHaveBeenNthCalledWith(2, {
                type: 'UpdateHeaderFilterValues',
                columnKey: 'name',
                item: 'Banana',
                checked: true
            });
            expect(mockDispatch).toHaveBeenNthCalledWith(3, {
                type: 'UpdateHeaderFilterValues',
                columnKey: 'name',
                item: 'Date',
                checked: true
            });
        });

        it('should not select already selected items in Select All Visible', () => {
            const propsWithSomeSelected = {
                ...defaultProps,
                column: {
                    ...defaultProps.column,
                    headerFilterValues: ['Apple'] // Apple already selected
                }
            };

            render(<HeaderFilterPopupContent {...propsWithSomeSelected} />);

            const selectAllButton = screen.getByText('表示中の項目を全選択');
            fireEvent.click(selectAllButton);

            // Should only dispatch for unselected items (Banana, Cherry, Date)
            expect(mockDispatch).toHaveBeenCalledTimes(3);

            // Verify exact dispatch calls for unselected items only
            expect(mockDispatch).toHaveBeenNthCalledWith(1, {
                type: 'UpdateHeaderFilterValues',
                columnKey: 'name',
                item: 'Banana',
                checked: true
            });
            expect(mockDispatch).toHaveBeenNthCalledWith(2, {
                type: 'UpdateHeaderFilterValues',
                columnKey: 'name',
                item: 'Cherry',
                checked: true
            });
            expect(mockDispatch).toHaveBeenNthCalledWith(3, {
                type: 'UpdateHeaderFilterValues',
                columnKey: 'name',
                item: 'Date',
                checked: true
            });

            // Verify Apple was NOT dispatched (already selected)
            expect(mockDispatch).not.toHaveBeenCalledWith({
                type: 'UpdateHeaderFilterValues',
                columnKey: 'name',
                item: 'Apple',
                checked: true
            });
        });
    });

    describe('Date column filtering', () => {
        const dateProps = {
            ...defaultProps,
            column: {
                key: 'date',
                dataType: DataType.Date,
                title: 'Date',
                headerFilterValues: []
            },
            data: [
                { id: 1, date: '2023-12-25' },
                { id: 2, date: '2023-11-15' },
                { id: 3, date: null }
            ]
        };

        it('should render DateTreeFilter for date columns', () => {
            render(<HeaderFilterPopupContent {...dateProps} />);

            // Should not render Select All / Clear buttons for date columns
            expect(screen.queryByText('表示中の項目を全選択')).not.toBeInTheDocument();
            expect(screen.queryByText('クリア')).not.toBeInTheDocument();

            // Should render date tree structure
            expect(screen.getByText('2023')).toBeInTheDocument();
        });
    });

    describe('Button state management', () => {
        it('should handle empty data gracefully', () => {
            const emptyProps = {
                ...defaultProps,
                data: []
            };

            render(<HeaderFilterPopupContent {...emptyProps} />);

            const selectAllButton = screen.getByText('表示中の項目を全選択');
            fireEvent.click(selectAllButton);

            // Should not dispatch anything for empty data
            expect(mockDispatch).not.toHaveBeenCalled();
        });

        it('should handle no search results gracefully', () => {
            const noResultsProps = {
                ...defaultProps,
                column: {
                    ...defaultProps.column,
                    headerFilterSearchValue: 'xyz', // No matches
                    isHeaderFilterSearchable: true
                }
            };

            render(<HeaderFilterPopupContent {...noResultsProps} />);

            const selectAllButton = screen.getByText('表示中の項目を全選択');
            fireEvent.click(selectAllButton);

            // Should not dispatch anything when no items are visible
            expect(mockDispatch).not.toHaveBeenCalled();
        });

        it('should handle Clear with no selected items', () => {
            const noSelectedProps = {
                ...defaultProps,
                column: {
                    ...defaultProps.column,
                    headerFilterValues: [] // No items selected
                }
            };

            render(<HeaderFilterPopupContent {...noSelectedProps} />);

            const clearButton = screen.getByText('クリア');
            fireEvent.click(clearButton);

            // Should not dispatch any HeaderFilterValues actions (no items to deselect)
            expect(mockDispatch).not.toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'UpdateHeaderFilterValues'
                })
            );

            // Should also not dispatch search clear (no search value)
            expect(mockDispatch).not.toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'UpdateHeaderFilterSearchValue'
                })
            );

            // Verify no dispatch calls at all
            expect(mockDispatch).not.toHaveBeenCalled();
        });
    });

    describe('Integration scenarios', () => {
        it('should handle complete workflow: search -> select all -> clear with detailed dispatch verification', () => {
            const workflowProps = {
                ...defaultProps,
                column: {
                    ...defaultProps.column,
                    headerFilterSearchValue: 'a',
                    isHeaderFilterSearchable: true
                }
            };

            const { rerender } = render(<HeaderFilterPopupContent {...workflowProps} />);

            // Step 1: Select all visible (should select 'Apple', 'Banana' and 'Date')
            const selectAllButton = screen.getByText('表示中の項目を全選択');
            fireEvent.click(selectAllButton);

            // Verify Step 1 dispatch calls
            expect(mockDispatch).toHaveBeenCalledTimes(3);
            expect(mockDispatch).toHaveBeenNthCalledWith(1, {
                type: 'UpdateHeaderFilterValues',
                columnKey: 'name',
                item: 'Apple',
                checked: true
            });
            expect(mockDispatch).toHaveBeenNthCalledWith(2, {
                type: 'UpdateHeaderFilterValues',
                columnKey: 'name',
                item: 'Banana',
                checked: true
            });
            expect(mockDispatch).toHaveBeenNthCalledWith(3, {
                type: 'UpdateHeaderFilterValues',
                columnKey: 'name',
                item: 'Date',
                checked: true
            });

            // Clear mock for next step
            jest.clearAllMocks();

            // Step 2: Simulate items being selected (rerender with updated state)
            const updatedProps = {
                ...workflowProps,
                column: {
                    ...workflowProps.column,
                    headerFilterValues: ['Apple', 'Banana', 'Date'] // Items that matched search
                }
            };

            rerender(<HeaderFilterPopupContent {...updatedProps} />);

            // Step 3: Clear all (should deselect items and clear search)
            const clearButton = screen.getByText('クリア');
            fireEvent.click(clearButton);

            // Verify Step 3 dispatch calls
            expect(mockDispatch).toHaveBeenCalledTimes(4);

            // Clear selected items
            expect(mockDispatch).toHaveBeenNthCalledWith(1, {
                type: 'UpdateHeaderFilterValues',
                columnKey: 'name',
                item: 'Apple',
                checked: false
            });
            expect(mockDispatch).toHaveBeenNthCalledWith(2, {
                type: 'UpdateHeaderFilterValues',
                columnKey: 'name',
                item: 'Banana',
                checked: false
            });
            expect(mockDispatch).toHaveBeenNthCalledWith(3, {
                type: 'UpdateHeaderFilterValues',
                columnKey: 'name',
                item: 'Date',
                checked: false
            });

            // Clear search value
            expect(mockDispatch).toHaveBeenNthCalledWith(4, {
                type: 'UpdateHeaderFilterSearchValue',
                columnKey: 'name',
                headerFilterSearchValue: ''
            });
        });

        it('should handle different column keys in dispatch calls', () => {
            const differentColumnProps = {
                ...defaultProps,
                column: {
                    ...defaultProps.column,
                    key: 'score', // Different column key
                    headerFilterValues: ['100', '200']
                }
            };

            render(<HeaderFilterPopupContent {...differentColumnProps} />);

            const clearButton = screen.getByText('クリア');
            fireEvent.click(clearButton);

            // Verify column key is correctly passed in dispatch
            expect(mockDispatch).toHaveBeenCalledTimes(2);
            expect(mockDispatch).toHaveBeenNthCalledWith(1, {
                type: 'UpdateHeaderFilterValues',
                columnKey: 'score', // Should use the correct column key
                item: '100',
                checked: false
            });
            expect(mockDispatch).toHaveBeenNthCalledWith(2, {
                type: 'UpdateHeaderFilterValues',
                columnKey: 'score', // Should use the correct column key
                item: '200',
                checked: false
            });
        });

        it('should handle special characters in values during dispatch', () => {
            const specialValuesProps = {
                ...defaultProps,
                data: [
                    { id: 1, name: 'Test & Value' },
                    { id: 2, name: 'Test "Quote"' },
                    { id: 3, name: 'Test <HTML>' },
                    { id: 4, name: 'Test 日本語' }
                ]
            };

            render(<HeaderFilterPopupContent {...specialValuesProps} />);

            const selectAllButton = screen.getByText('表示中の項目を全選択');
            fireEvent.click(selectAllButton);

            // Verify special characters are preserved in dispatch
            expect(mockDispatch).toHaveBeenCalledTimes(4);
            expect(mockDispatch).toHaveBeenNthCalledWith(1, {
                type: 'UpdateHeaderFilterValues',
                columnKey: 'name',
                item: 'Test & Value',
                checked: true
            });
            expect(mockDispatch).toHaveBeenNthCalledWith(2, {
                type: 'UpdateHeaderFilterValues',
                columnKey: 'name',
                item: 'Test "Quote"',
                checked: true
            });
            expect(mockDispatch).toHaveBeenNthCalledWith(3, {
                type: 'UpdateHeaderFilterValues',
                columnKey: 'name',
                item: 'Test <HTML>',
                checked: true
            });
            expect(mockDispatch).toHaveBeenNthCalledWith(4, {
                type: 'UpdateHeaderFilterValues',
                columnKey: 'name',
                item: 'Test 日本語',
                checked: true
            });
        });
    });

    it('renders without crashing', () => {
        render(<HeaderFilterPopupContent {...defaultProps} />);
    });
});
