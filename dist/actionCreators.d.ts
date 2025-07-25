import { ActionType, InsertRowPosition } from './enums';
import { Column } from './Models/Column';
import { Focused } from './Models/Focused';
import { IMoveFocusedSettings } from './Utils/NavigationUtils';
import { PopupPosition } from './Models/PopupPosition';
export declare const updateHeaderFilterValues: (columnKey: string, item: any, checked: boolean) => {
    columnKey: string;
    checked: boolean;
    item: any;
    type: ActionType;
};
export declare const updatePopupPosition: (popupPosition: PopupPosition) => {
    popupPosition: PopupPosition;
    type: ActionType;
};
export declare const updateHeaderFilterPopupState: (columnKey: string, isHeaderFilterPopupShown?: boolean) => {
    columnKey: string;
    isHeaderFilterPopupShown: boolean;
    type: ActionType;
};
export declare const updateFilterRowValue: (columnKey: string, filterRowValue: any) => {
    columnKey: string;
    filterRowValue: any;
    type: ActionType;
};
export declare const updateHeaderFilterSearchValue: (columnKey: string, headerFilterSearchValue: string) => {
    columnKey: string;
    headerFilterSearchValue: string;
    type: ActionType;
};
export declare const updateFilterRowOperator: (columnKey: string, filterRowOperator: string) => {
    columnKey: string;
    filterRowOperator: string;
    type: ActionType;
};
export declare const clearAllFilters: () => {
    type: ActionType;
};
export declare const updateEditorValue: (rowKeyValue: any, columnKey: string, value: any) => {
    columnKey: string;
    rowKeyValue: any;
    type: ActionType;
    value: any;
};
export declare const updateCellValue: (rowKeyValue: any, columnKey: string, value: any) => {
    columnKey: string;
    rowKeyValue: any;
    type: ActionType;
    value: any;
};
export declare const updateSortDirection: (columnKey: string) => {
    columnKey: string;
    type: ActionType;
};
export declare const closeEditor: (rowKeyValue: any, columnKey: string) => {
    columnKey: string;
    rowKeyValue: any;
    type: ActionType;
};
export declare const deleteRow: (rowKeyValue: any) => {
    rowKeyValue: any;
    type: ActionType;
};
export declare const deselectAllRows: () => {
    type: ActionType;
};
export declare const deselectAllFilteredRows: () => {
    type: ActionType;
};
export declare const deselectAllVisibleRows: () => {
    type: ActionType;
};
export declare const deselectRow: (rowKeyValue: any) => {
    rowKeyValue: any;
    type: ActionType;
};
export declare const deselectRows: (rowsKeyValues: any[]) => {
    rowsKeyValues: any[];
    type: ActionType;
};
export declare const openEditor: (rowKeyValue: any, columnKey: string) => {
    columnKey: string;
    rowKeyValue: any;
    type: ActionType;
};
export declare const search: (searchText: any) => {
    searchText: any;
    type: ActionType;
};
export declare const selectAllRows: () => {
    type: ActionType;
};
export declare const selectAllFilteredRows: () => {
    type: ActionType;
};
export declare const selectAllVisibleRows: () => {
    type: ActionType;
};
export declare const selectSingleRow: (rowKeyValue: any) => {
    rowKeyValue: any;
    type: ActionType;
};
export declare const selectRow: (rowKeyValue: any) => {
    rowKeyValue: any;
    type: ActionType;
};
export declare const selectRows: (rowsKeyValues: any[]) => {
    rowsKeyValues: any[];
    type: ActionType;
};
export declare const selectRowsRange: (rowKeyValueFrom: any, rowKeyValueTo: any) => {
    rowKeyValueFrom: any;
    rowKeyValueTo: any;
    type: ActionType;
};
export declare const updateGroupsExpanded: (groupKey: any[]) => {
    groupKey: any[];
    type: ActionType;
};
export declare const updateData: (data: any[]) => {
    data: any[];
    type: ActionType;
};
export declare const showLoading: (text?: string) => {
    text: string;
    type: ActionType;
};
export declare const hideLoading: () => {
    type: ActionType;
};
export declare const showNewRow: () => {
    type: ActionType;
};
export declare const hideNewRow: () => {
    type: ActionType;
};
export declare const showDetailsRow: (rowKeyValue: any) => {
    rowKeyValue: any;
    type: ActionType;
};
export declare const hideDetailsRow: (rowKeyValue: any) => {
    rowKeyValue: any;
    type: ActionType;
};
export declare const saveNewRow: (rowKeyValue: any, settings?: {
    validate?: boolean;
}) => {
    rowKeyValue: any;
    validate: boolean;
    type: ActionType;
};
export declare const openRowEditors: (rowKeyValue: any) => {
    rowKeyValue: any;
    type: ActionType;
};
export declare const closeRowEditors: (rowKeyValue: any) => {
    rowKeyValue: any;
    type: ActionType;
};
export declare const saveRowEditors: (rowKeyValue: any, settings?: {
    validate?: boolean;
}) => {
    rowKeyValue: any;
    validate: boolean;
    type: ActionType;
};
export declare const updateRow: (rowData: any) => {
    type: ActionType;
    rowData: any;
};
export declare const updatePageIndex: (pageIndex: number) => {
    pageIndex: number;
    type: ActionType;
};
export declare const updatePageSize: (pageSize: number) => {
    pageSize: number;
    type: ActionType;
};
export declare const updatePagesCount: (pagesCount: number) => {
    pagesCount: number;
    type: ActionType;
};
export declare const resizeColumn: (columnKey: string, width: number) => {
    type: ActionType;
    columnKey: string;
    width: number;
};
export declare const reorderRows: (rowKeyValue: any, targetRowKeyValue: any) => {
    type: ActionType;
    rowKeyValue: any;
    targetRowKeyValue: any;
};
export declare const reorderColumns: (columnKey: string, targetColumnKey: string) => {
    type: ActionType;
    columnKey: string;
    targetColumnKey: string;
};
export declare const moveColumnBefore: (columnKey: string, targetColumnKey: string) => {
    type: ActionType;
    columnKey: string;
    targetColumnKey: string;
};
export declare const insertColumn: (column: Column, index: number) => {
    type: ActionType;
    column: Column<any>;
    index: number;
};
export declare const moveColumnToIndex: (columnKey: string, index: number) => {
    type: ActionType;
    columnKey: string;
    index: number;
};
export declare const showColumn: (columnKey: any) => {
    columnKey: any;
    type: ActionType;
};
export declare const hideColumn: (columnKey: any) => {
    columnKey: any;
    type: ActionType;
};
export declare const loadData: () => {
    type: ActionType;
};
export declare const clearSingleAction: () => {
    type: ActionType;
};
export declare const setSingleAction: (singleAction: any) => {
    singleAction: any;
    type: ActionType;
};
export declare const clearFocused: () => {
    type: ActionType;
};
export declare const setFocused: (focused: Focused) => {
    focused: Focused;
    type: ActionType;
};
export declare const moveFocusedRight: (settings: IMoveFocusedSettings) => {
    settings: IMoveFocusedSettings;
    type: ActionType;
};
export declare const moveFocusedLeft: (settings?: IMoveFocusedSettings) => {
    settings: IMoveFocusedSettings;
    type: ActionType;
};
export declare const moveFocusedUp: (settings?: IMoveFocusedSettings) => {
    settings: IMoveFocusedSettings;
    type: ActionType;
};
export declare const moveFocusedDown: (settings?: IMoveFocusedSettings) => {
    settings: IMoveFocusedSettings;
    type: ActionType;
};
export declare const updateTreeGroupsExpanded: (rowKeyValue: any) => {
    rowKeyValue: any;
    type: ActionType;
};
export declare const validate: () => {
    type: ActionType;
};
export declare const openAllEditors: () => {
    type: ActionType;
};
export declare const saveAllEditors: () => {
    type: ActionType;
};
export declare const insertRow: (rowData: any, options?: {
    rowKeyValue?: any;
    insertRowPosition?: InsertRowPosition;
}) => {
    rowData: any;
    options: {
        rowKeyValue?: any;
        insertRowPosition?: InsertRowPosition;
    };
    type: ActionType;
};
export declare const groupColumn: (columnKey: string) => {
    columnKey: string;
    type: ActionType;
};
export declare const ungroupColumn: (columnKey: string) => {
    columnKey: string;
    type: ActionType;
};
