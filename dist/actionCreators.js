"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideColumn = exports.showColumn = exports.moveColumnToIndex = exports.insertColumn = exports.moveColumnBefore = exports.reorderColumns = exports.reorderRows = exports.resizeColumn = exports.updatePagesCount = exports.updatePageSize = exports.updatePageIndex = exports.updateRow = exports.saveRowEditors = exports.closeRowEditors = exports.openRowEditors = exports.saveNewRow = exports.hideDetailsRow = exports.showDetailsRow = exports.hideNewRow = exports.showNewRow = exports.hideLoading = exports.showLoading = exports.updateData = exports.updateGroupsExpanded = exports.selectRowsRange = exports.selectRows = exports.selectRow = exports.selectSingleRow = exports.selectAllVisibleRows = exports.selectAllFilteredRows = exports.selectAllRows = exports.search = exports.openEditor = exports.deselectRows = exports.deselectRow = exports.deselectAllVisibleRows = exports.deselectAllFilteredRows = exports.deselectAllRows = exports.deleteRow = exports.closeEditor = exports.updateSortDirection = exports.updateCellValue = exports.updateEditorValue = exports.clearAllFilters = exports.updateFilterRowOperator = exports.updateHeaderFilterSearchValue = exports.updateFilterRowValue = exports.updateHeaderFilterPopupState = exports.updatePopupPosition = exports.updateHeaderFilterValues = void 0;
exports.ungroupColumn = exports.groupColumn = exports.insertRow = exports.saveAllEditors = exports.openAllEditors = exports.validate = exports.updateTreeGroupsExpanded = exports.moveFocusedDown = exports.moveFocusedUp = exports.moveFocusedLeft = exports.moveFocusedRight = exports.setFocused = exports.clearFocused = exports.setSingleAction = exports.clearSingleAction = exports.loadData = void 0;
var enums_1 = require("./enums");
var updateHeaderFilterValues = function (columnKey, item, checked) { return ({
    columnKey: columnKey,
    checked: checked,
    item: item,
    type: enums_1.ActionType.UpdateHeaderFilterValues
}); };
exports.updateHeaderFilterValues = updateHeaderFilterValues;
var updatePopupPosition = function (popupPosition) { return ({
    popupPosition: popupPosition,
    type: enums_1.ActionType.UpdatePopupPosition
}); };
exports.updatePopupPosition = updatePopupPosition;
var updateHeaderFilterPopupState = function (columnKey, isHeaderFilterPopupShown) { return ({
    columnKey: columnKey,
    isHeaderFilterPopupShown: isHeaderFilterPopupShown,
    type: enums_1.ActionType.UpdateHeaderFilterPopupState
}); };
exports.updateHeaderFilterPopupState = updateHeaderFilterPopupState;
var updateFilterRowValue = function (columnKey, filterRowValue) { return ({
    columnKey: columnKey,
    filterRowValue: filterRowValue,
    type: enums_1.ActionType.UpdateFilterRowValue,
}); };
exports.updateFilterRowValue = updateFilterRowValue;
var updateHeaderFilterSearchValue = function (columnKey, headerFilterSearchValue) { return ({
    columnKey: columnKey,
    headerFilterSearchValue: headerFilterSearchValue,
    type: enums_1.ActionType.UpdateHeaderFilterSearchValue,
}); };
exports.updateHeaderFilterSearchValue = updateHeaderFilterSearchValue;
var updateFilterRowOperator = function (columnKey, filterRowOperator) { return ({
    columnKey: columnKey,
    filterRowOperator: filterRowOperator,
    type: enums_1.ActionType.UpdateFilterRowOperator,
}); };
exports.updateFilterRowOperator = updateFilterRowOperator;
var clearAllFilters = function () { return ({
    type: enums_1.ActionType.ClearAllFilters,
}); };
exports.clearAllFilters = clearAllFilters;
var updateEditorValue = function (rowKeyValue, columnKey, value) { return ({
    columnKey: columnKey,
    rowKeyValue: rowKeyValue,
    type: enums_1.ActionType.UpdateEditorValue,
    value: value
}); };
exports.updateEditorValue = updateEditorValue;
var updateCellValue = function (rowKeyValue, columnKey, value) { return ({
    columnKey: columnKey,
    rowKeyValue: rowKeyValue,
    type: enums_1.ActionType.UpdateCellValue,
    value: value
}); };
exports.updateCellValue = updateCellValue;
var updateSortDirection = function (columnKey) { return ({
    columnKey: columnKey,
    type: enums_1.ActionType.UpdateSortDirection,
}); };
exports.updateSortDirection = updateSortDirection;
var closeEditor = function (rowKeyValue, columnKey) { return ({
    columnKey: columnKey,
    rowKeyValue: rowKeyValue,
    type: enums_1.ActionType.CloseEditor,
}); };
exports.closeEditor = closeEditor;
var deleteRow = function (rowKeyValue) { return ({
    rowKeyValue: rowKeyValue,
    type: enums_1.ActionType.DeleteRow,
}); };
exports.deleteRow = deleteRow;
var deselectAllRows = function () { return ({
    type: enums_1.ActionType.DeselectAllRows,
}); };
exports.deselectAllRows = deselectAllRows;
var deselectAllFilteredRows = function () { return ({
    type: enums_1.ActionType.DeselectAllFilteredRows,
}); };
exports.deselectAllFilteredRows = deselectAllFilteredRows;
var deselectAllVisibleRows = function () { return ({
    type: enums_1.ActionType.DeselectAllVisibleRows,
}); };
exports.deselectAllVisibleRows = deselectAllVisibleRows;
var deselectRow = function (rowKeyValue) { return ({
    rowKeyValue: rowKeyValue,
    type: enums_1.ActionType.DeselectRow,
}); };
exports.deselectRow = deselectRow;
var deselectRows = function (rowsKeyValues) { return ({
    rowsKeyValues: rowsKeyValues,
    type: enums_1.ActionType.DeselectRows,
}); };
exports.deselectRows = deselectRows;
var openEditor = function (rowKeyValue, columnKey) { return ({
    columnKey: columnKey,
    rowKeyValue: rowKeyValue,
    type: enums_1.ActionType.OpenEditor,
}); };
exports.openEditor = openEditor;
var search = function (searchText) { return ({
    searchText: searchText,
    type: enums_1.ActionType.Search,
}); };
exports.search = search;
var selectAllRows = function () { return ({
    type: enums_1.ActionType.SelectAllRows,
}); };
exports.selectAllRows = selectAllRows;
var selectAllFilteredRows = function () { return ({
    type: enums_1.ActionType.SelectAllFilteredRows,
}); };
exports.selectAllFilteredRows = selectAllFilteredRows;
var selectAllVisibleRows = function () { return ({
    type: enums_1.ActionType.SelectAllVisibleRows,
}); };
exports.selectAllVisibleRows = selectAllVisibleRows;
var selectSingleRow = function (rowKeyValue) { return ({
    rowKeyValue: rowKeyValue,
    type: enums_1.ActionType.SelectSingleRow,
}); };
exports.selectSingleRow = selectSingleRow;
var selectRow = function (rowKeyValue) { return ({
    rowKeyValue: rowKeyValue,
    type: enums_1.ActionType.SelectRow,
}); };
exports.selectRow = selectRow;
var selectRows = function (rowsKeyValues) { return ({
    rowsKeyValues: rowsKeyValues,
    type: enums_1.ActionType.SelectRows,
}); };
exports.selectRows = selectRows;
var selectRowsRange = function (rowKeyValueFrom, rowKeyValueTo) { return ({
    rowKeyValueFrom: rowKeyValueFrom,
    rowKeyValueTo: rowKeyValueTo,
    type: enums_1.ActionType.SelectRowsRange,
}); };
exports.selectRowsRange = selectRowsRange;
var updateGroupsExpanded = function (groupKey) { return ({
    groupKey: groupKey,
    type: enums_1.ActionType.UpdateGroupsExpanded,
}); };
exports.updateGroupsExpanded = updateGroupsExpanded;
var updateData = function (data) { return ({
    data: data,
    type: enums_1.ActionType.UpdateData,
}); };
exports.updateData = updateData;
var showLoading = function (text) { return ({
    text: text,
    type: enums_1.ActionType.ShowLoading,
}); };
exports.showLoading = showLoading;
var hideLoading = function () { return ({
    type: enums_1.ActionType.HideLoading,
}); };
exports.hideLoading = hideLoading;
var showNewRow = function () { return ({
    type: enums_1.ActionType.ShowNewRow,
}); };
exports.showNewRow = showNewRow;
var hideNewRow = function () { return ({
    type: enums_1.ActionType.HideNewRow,
}); };
exports.hideNewRow = hideNewRow;
var showDetailsRow = function (rowKeyValue) { return ({
    rowKeyValue: rowKeyValue,
    type: enums_1.ActionType.ShowDetailsRow,
}); };
exports.showDetailsRow = showDetailsRow;
var hideDetailsRow = function (rowKeyValue) { return ({
    rowKeyValue: rowKeyValue,
    type: enums_1.ActionType.HideDetailsRow,
}); };
exports.hideDetailsRow = hideDetailsRow;
var saveNewRow = function (rowKeyValue, settings) { return ({
    rowKeyValue: rowKeyValue,
    validate: settings && settings.validate,
    type: enums_1.ActionType.SaveNewRow,
}); };
exports.saveNewRow = saveNewRow;
var openRowEditors = function (rowKeyValue) { return ({
    rowKeyValue: rowKeyValue,
    type: enums_1.ActionType.OpenRowEditors,
}); };
exports.openRowEditors = openRowEditors;
var closeRowEditors = function (rowKeyValue) { return ({
    rowKeyValue: rowKeyValue,
    type: enums_1.ActionType.CloseRowEditors,
}); };
exports.closeRowEditors = closeRowEditors;
var saveRowEditors = function (rowKeyValue, settings) { return ({
    rowKeyValue: rowKeyValue,
    validate: settings && settings.validate,
    type: enums_1.ActionType.SaveRowEditors,
}); };
exports.saveRowEditors = saveRowEditors;
var updateRow = function (rowData) {
    return {
        type: enums_1.ActionType.UpdateRow,
        rowData: rowData,
    };
};
exports.updateRow = updateRow;
var updatePageIndex = function (pageIndex) { return ({
    pageIndex: pageIndex,
    type: enums_1.ActionType.UpdatePageIndex,
}); };
exports.updatePageIndex = updatePageIndex;
var updatePageSize = function (pageSize) { return ({
    pageSize: pageSize,
    type: enums_1.ActionType.UpdatePageSize,
}); };
exports.updatePageSize = updatePageSize;
var updatePagesCount = function (pagesCount) { return ({
    pagesCount: pagesCount,
    type: enums_1.ActionType.UpdatePagesCount,
}); };
exports.updatePagesCount = updatePagesCount;
var resizeColumn = function (columnKey, width) { return ({
    type: enums_1.ActionType.ResizeColumn,
    columnKey: columnKey,
    width: width,
}); };
exports.resizeColumn = resizeColumn;
var reorderRows = function (rowKeyValue, targetRowKeyValue) { return ({
    type: enums_1.ActionType.ReorderRows,
    rowKeyValue: rowKeyValue,
    targetRowKeyValue: targetRowKeyValue,
}); };
exports.reorderRows = reorderRows;
var reorderColumns = function (columnKey, targetColumnKey) { return ({
    type: enums_1.ActionType.ReorderColumns,
    columnKey: columnKey,
    targetColumnKey: targetColumnKey,
}); };
exports.reorderColumns = reorderColumns;
var moveColumnBefore = function (columnKey, targetColumnKey) { return ({
    type: enums_1.ActionType.MoveColumnBefore,
    columnKey: columnKey,
    targetColumnKey: targetColumnKey
}); };
exports.moveColumnBefore = moveColumnBefore;
var insertColumn = function (column, index) { return ({
    type: enums_1.ActionType.InsertColumn,
    column: column,
    index: index
}); };
exports.insertColumn = insertColumn;
var moveColumnToIndex = function (columnKey, index) { return ({
    type: enums_1.ActionType.MoveColumnToIndex,
    columnKey: columnKey,
    index: index,
}); };
exports.moveColumnToIndex = moveColumnToIndex;
var showColumn = function (columnKey) { return ({
    columnKey: columnKey,
    type: enums_1.ActionType.ShowColumn,
}); };
exports.showColumn = showColumn;
var hideColumn = function (columnKey) { return ({
    columnKey: columnKey,
    type: enums_1.ActionType.HideColumn,
}); };
exports.hideColumn = hideColumn;
var loadData = function () { return ({
    type: enums_1.ActionType.LoadData
}); };
exports.loadData = loadData;
var clearSingleAction = function () { return ({
    type: enums_1.ActionType.ClearSingleAction
}); };
exports.clearSingleAction = clearSingleAction;
var setSingleAction = function (singleAction) { return ({
    singleAction: singleAction,
    type: enums_1.ActionType.SetSingleAction
}); };
exports.setSingleAction = setSingleAction;
var clearFocused = function () { return ({
    type: enums_1.ActionType.ClearFocused
}); };
exports.clearFocused = clearFocused;
var setFocused = function (focused) { return ({
    focused: focused,
    type: enums_1.ActionType.SetFocused
}); };
exports.setFocused = setFocused;
var moveFocusedRight = function (settings) { return ({
    settings: settings,
    type: enums_1.ActionType.MoveFocusedRight
}); };
exports.moveFocusedRight = moveFocusedRight;
var moveFocusedLeft = function (settings) { return ({
    settings: settings,
    type: enums_1.ActionType.MoveFocusedLeft
}); };
exports.moveFocusedLeft = moveFocusedLeft;
var moveFocusedUp = function (settings) { return ({
    settings: settings,
    type: enums_1.ActionType.MoveFocusedUp
}); };
exports.moveFocusedUp = moveFocusedUp;
var moveFocusedDown = function (settings) { return ({
    settings: settings,
    type: enums_1.ActionType.MoveFocusedDown
}); };
exports.moveFocusedDown = moveFocusedDown;
var updateTreeGroupsExpanded = function (rowKeyValue) { return ({
    rowKeyValue: rowKeyValue,
    type: enums_1.ActionType.UpdateTreeGroupsExpanded,
}); };
exports.updateTreeGroupsExpanded = updateTreeGroupsExpanded;
var validate = function () { return ({
    type: enums_1.ActionType.Validate,
}); };
exports.validate = validate;
var openAllEditors = function () { return ({
    type: enums_1.ActionType.OpenAllEditors,
}); };
exports.openAllEditors = openAllEditors;
var saveAllEditors = function () { return ({
    type: enums_1.ActionType.SaveAllEditors
}); };
exports.saveAllEditors = saveAllEditors;
var insertRow = function (rowData, options) { return ({
    rowData: rowData,
    options: options,
    type: enums_1.ActionType.InsertRow
}); };
exports.insertRow = insertRow;
var groupColumn = function (columnKey) { return ({
    columnKey: columnKey,
    type: enums_1.ActionType.GroupColumn
}); };
exports.groupColumn = groupColumn;
var ungroupColumn = function (columnKey) { return ({
    columnKey: columnKey,
    type: enums_1.ActionType.UngroupColumn
}); };
exports.ungroupColumn = ungroupColumn;
