import * as React from 'react';

import { ActionType, DataType, FilteringMode, SortDirection, Table, useTable, } from '../..';
import { updateHeaderFilterSearchValue, updateHeaderFilterValues, updateSortDirection } from '../../actionCreators';

import CellEditorBoolean from '../CellEditorBoolean/CellEditorBoolean';
import { DateTreeFilter } from '../DateTreeComponent/DateTreeComponent';
import { IHeaderFilterPopupProps } from '../../props';
import { getValueByColumn } from '../../Utils/DataUtils';

type HeaderFilterItem = { value: string; isSelected: boolean; };

const HeaderFilterPopupContent: React.FC<IHeaderFilterPopupProps> = (props) => {
    const {
        column,
        childComponents,
        data,
        dispatch,
        format
    } = props;

    const handleDateFilterChange = (selectedValues: string[]) => {
        // Clear all existing filter values for this column first
        const existingValues = column.headerFilterValues || [];
        existingValues.forEach(value => {
            dispatch(updateHeaderFilterValues(column.key, value, false));
        });

        // Add new selected values
        selectedValues.forEach(value => {
            dispatch(updateHeaderFilterValues(column.key, value, true));
        });
    };

    let headerFilterValues: string[] | undefined;
    headerFilterValues = column?.headerFilterListItems ? column?.headerFilterListItems({ data }) : data?.map((item, i) => {
        const value = getValueByColumn(item, column);

        const formattedValue =
            (format && format({ column, value, rowData: item }))
            || value?.toString();
        return formattedValue;
    });
    headerFilterValues = Array.from(new Set(headerFilterValues));
    const headerFilterValuesData: HeaderFilterItem[] = headerFilterValues?.map((value, i) => ({ value, isSelected: !!column.headerFilterValues && column.headerFilterValues.includes(value) }));
    const selectedColumnKey = `${column.key}_isSelected`;
    const table = useTable({
        onDispatch: (action) => {
            if (action.type === ActionType.UpdateFilterRowValue) {
                dispatch(updateHeaderFilterSearchValue(action.columnKey, action.filterRowValue));
            }
        }
    });

    const handleSortAscending = () => {
        if (column.sortDirection === SortDirection.Descend) {
            dispatch(updateSortDirection(column.key));
        } else if (!column.sortDirection) {
            dispatch(updateSortDirection(column.key));
        }
    };

    const handleSortDescending = () => {
        if (column.sortDirection === SortDirection.Ascend) {
            dispatch(updateSortDirection(column.key));
        } else if (!column.sortDirection) {
            dispatch(updateSortDirection(column.key));
            dispatch(updateSortDirection(column.key));
        }
    };

    return (
        <div>
            <div className="ka-custom-header-filter-sort-container">
                <div
                    className={`ka-custom-header-filter-sort-button ${
                        column.sortDirection === SortDirection.Ascend ? 'ka-custom-header-filter-sort-button--active' : ''
                    }`}
                    onClick={handleSortAscending}
                >
                    <span className={`ka-custom-header-filter-sort-icon ${
                        column.sortDirection === SortDirection.Ascend ? 'ka-custom-header-filter-sort-icon--active' : 'ka-custom-header-filter-sort-icon--inactive'
                    }`}>↑</span>
                    <span className={`ka-custom-header-filter-sort-text ${
                        column.sortDirection === SortDirection.Ascend ? 'ka-custom-header-filter-sort-text--active' : ''
                    }`}>昇順</span>
                </div>
                <div
                    className={`ka-custom-header-filter-sort-button ${
                        column.sortDirection === SortDirection.Descend ? 'ka-custom-header-filter-sort-button--active' : ''
                    }`}
                    onClick={handleSortDescending}
                >
                    <span className={`ka-custom-header-filter-sort-icon ${
                        column.sortDirection === SortDirection.Descend ? 'ka-custom-header-filter-sort-icon--active' : 'ka-custom-header-filter-sort-icon--inactive'
                    }`}>↓</span>
                    <span className={`ka-custom-header-filter-sort-text ${
                        column.sortDirection === SortDirection.Descend ? 'ka-custom-header-filter-sort-text--active' : ''
                    }`}>降順</span>
                </div>
            </div>
            {column.dataType === DataType.Date ? (
                <DateTreeFilter
                    column={column}
                    data={data || []}
                    format={format}
                    onFilterChange={handleDateFilterChange}
                />
            ) : (
                <Table
                    table={table}
                    columns={[
                        { key: selectedColumnKey, field: 'isSelected', width: 35, isFilterable: false },
                        {
                            key: column.key,
                            field: 'value',
                            style: { textAlign: 'left' },
                            filterRowValue: column.headerFilterSearchValue
                        }]}
                    filteringMode={column.isHeaderFilterSearchable ? FilteringMode.FilterRow : undefined}
                    data={headerFilterValuesData}
                    selectedRows={column.headerFilterValues}
                    filter={() => column.headerFilterSearch}
                    rowKeyField={'value'}
                    childComponents={{
                        headRow: {
                            elementAttributes: () => ({ style: { display: 'none' } })
                        },
                        filterRowCell: {
                            elementAttributes: ({ column: filterRowColumn }) => ({
                                style: {
                                    top: 0,
                                    display: filterRowColumn.key === selectedColumnKey ? 'none' : undefined
                                },
                                colSpan: filterRowColumn.key === selectedColumnKey ? 0 : 2
                            })
                        },
                        filterRowCellInput: childComponents?.headerFilterPopupSearchInput,
                        rootDiv: {
                            elementAttributes: () => ({
                                className: 'ka-header-filter-table'
                            })
                        },
                        dataRow: childComponents?.headerFilterPopupRow,
                        cell: {
                            ...childComponents?.headerFilterPopupTextCell,
                            elementAttributes: (componentProps) => ({
                                onClick: () => {
                                    const isSelect = !column?.headerFilterValues?.includes(componentProps?.rowKeyValue);
                                    dispatch(updateHeaderFilterValues(column.key, componentProps?.rowKeyValue, isSelect));
                                },
                                ...childComponents?.headerFilterPopupTextCell?.elementAttributes?.(componentProps)
                            }),
                        },
                        cellText: {
                            content: (componentProps) => {
                                switch (componentProps?.column.key) {
                                case selectedColumnKey: return <CellEditorBoolean {...componentProps} />;
                                }
                            },
                        },

                    }} />
            )}
        </div>
    )
}

export default HeaderFilterPopupContent;
