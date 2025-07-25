"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kaReducer = void 0;
var enums_1 = require("../enums");
var ReducerUtils_1 = require("../Utils/ReducerUtils");
var CellUtils_1 = require("../Utils/CellUtils");
var PropsUtils_1 = require("../Utils/PropsUtils");
var NavigationUtils_1 = require("../Utils/NavigationUtils");
var GroupUtils_1 = require("../Utils/GroupUtils");
var DataUtils_1 = require("../Utils/DataUtils");
var FilterUtils_1 = require("../Utils/FilterUtils");
var ArrayUtils_1 = require("../Utils/ArrayUtils");
var TreeUtils_1 = require("../Utils/TreeUtils");
var HeadRowUtils_1 = require("../Utils/HeadRowUtils");
var utils_1 = require("../utils");
var const_1 = require("../const");
var ColumnUtils_1 = require("../Utils/ColumnUtils");
var kaReducer = function (props, action) {
    var _a;
    var columns = props.columns, _b = props.data, data = _b === void 0 ? [] : _b, _c = props.detailsRows, detailsRows = _c === void 0 ? [] : _c, _d = props.editableCells, editableCells = _d === void 0 ? [] : _d, groupsExpanded = props.groupsExpanded, loading = props.loading, paging = props.paging, treeGroupsExpanded = props.treeGroupsExpanded, rowKeyField = props.rowKeyField, _e = props.selectedRows, selectedRows = _e === void 0 ? [] : _e, validation = props.validation, _f = props.sortingMode, sortingMode = _f === void 0 ? enums_1.SortingMode.None : _f, virtualScrolling = props.virtualScrolling;
    switch (action.type) {
        case enums_1.ActionType.InsertRow: {
            var rowData = action.rowData, options = action.options;
            var _g = options || {}, rowKeyValue_1 = _g.rowKeyValue, insertRowPosition = _g.insertRowPosition;
            var newData = __spreadArray([], data, true);
            if (rowKeyValue_1 != null) {
                var rowIndex = newData.findIndex(function (d) { return (0, DataUtils_1.getValueByField)(d, rowKeyField) === rowKeyValue_1; });
                if (insertRowPosition === enums_1.InsertRowPosition.after) {
                    rowIndex++;
                }
                newData.splice(rowIndex, 0, rowData);
            }
            else {
                insertRowPosition === enums_1.InsertRowPosition.after ? newData.push(rowData) : newData.unshift(rowData);
            }
            return __assign(__assign({}, props), { data: newData });
        }
        case enums_1.ActionType.UpdateHeaderFilterValues: {
            var newColumns = columns.map(function (c) {
                if (c.key === action.columnKey) {
                    var headerFilterValues = c.headerFilterValues;
                    if (action.checked) {
                        if (headerFilterValues === undefined) {
                            headerFilterValues = [];
                        }
                        if (!headerFilterValues.includes(action.item)) {
                            headerFilterValues.push(action.item);
                        }
                    }
                    else {
                        headerFilterValues = headerFilterValues === null || headerFilterValues === void 0 ? void 0 : headerFilterValues.filter(function (value) { return value !== action.item; });
                    }
                    c.headerFilterValues = headerFilterValues;
                }
                return c;
            });
            return __assign(__assign({}, props), { columns: newColumns });
        }
        case enums_1.ActionType.ClearAllFilters: {
            return __assign(__assign({}, props), { columns: columns.map(function (c) { return (__assign(__assign({}, c), { filterRowValue: undefined, headerFilterValues: undefined })); }) });
        }
        case enums_1.ActionType.UpdatePopupPosition: {
            var newColumns = columns.map(function (c) { return (__assign(__assign({}, c), { headerFilterPopupPosition: action.popupPosition })); });
            return __assign(__assign({}, props), { columns: newColumns });
        }
        case enums_1.ActionType.UpdateHeaderFilterPopupState: {
            var newColumns = columns.map(function (c) { return (__assign(__assign({}, c), { isHeaderFilterPopupShown: c.key === action.columnKey ? !c.isHeaderFilterPopupShown : false })); });
            return __assign(__assign({}, props), { columns: newColumns });
        }
        case enums_1.ActionType.MoveFocusedRight: {
            return (0, ReducerUtils_1.getUpdatedFocused)(props, action, NavigationUtils_1.getRightCell);
        }
        case enums_1.ActionType.MoveFocusedLeft: {
            return (0, ReducerUtils_1.getUpdatedFocused)(props, action, NavigationUtils_1.getLeftCell);
        }
        case enums_1.ActionType.MoveFocusedUp: {
            return (0, ReducerUtils_1.getUpdatedFocused)(props, action, NavigationUtils_1.getUpCell);
        }
        case enums_1.ActionType.MoveFocusedDown: {
            return (0, ReducerUtils_1.getUpdatedFocused)(props, action, NavigationUtils_1.getDownCell);
        }
        case enums_1.ActionType.SetFocused: {
            return __assign(__assign({}, props), { focused: action.focused });
        }
        case enums_1.ActionType.ClearFocused: {
            return __assign(__assign({}, props), { focused: undefined });
        }
        case enums_1.ActionType.ClearSingleAction: {
            return __assign(__assign({}, props), { singleAction: undefined });
        }
        case enums_1.ActionType.SetSingleAction: {
            return __assign(__assign({}, props), { singleAction: action.singleAction });
        }
        case enums_1.ActionType.ShowColumn: {
            var newColumns = (0, ColumnUtils_1.replaceColumnValue)({
                columns: columns,
                columnKey: action.columnKey,
                replacedOption: 'visible',
                replacedValue: true
            });
            return __assign(__assign({}, props), { columns: newColumns });
        }
        case enums_1.ActionType.HideColumn: {
            var newColumns = (0, ColumnUtils_1.replaceColumnValue)({
                columns: columns,
                columnKey: action.columnKey,
                replacedOption: 'visible',
                replacedValue: false
            });
            return __assign(__assign({}, props), { columns: newColumns });
        }
        case enums_1.ActionType.ReorderRows: {
            var newData = (0, DataUtils_1.reorderData)(data, function (d) { return (0, DataUtils_1.getValueByField)(d, rowKeyField); }, action.rowKeyValue, action.targetRowKeyValue);
            return __assign(__assign({}, props), { data: newData });
        }
        case enums_1.ActionType.InsertColumn: {
            var newColumns = __spreadArray([], columns, true);
            newColumns.splice(action.index, 0, action.column);
            return __assign(__assign({}, props), { columns: newColumns });
        }
        case enums_1.ActionType.MoveColumnBefore: {
            var newColumns = (0, DataUtils_1.insertBefore)(columns, function (d) { return d.key; }, action.columnKey, action.targetColumnKey);
            return __assign(__assign({}, props), { columns: newColumns });
        }
        case enums_1.ActionType.ReorderColumns: {
            var newData = (0, DataUtils_1.reorderData)(columns, function (d) { return d.key; }, action.columnKey, action.targetColumnKey);
            return __assign(__assign({}, props), { columns: newData });
        }
        case enums_1.ActionType.MoveColumnToIndex: {
            var newColumns = (0, DataUtils_1.reorderDataByIndex)(columns, function (d) { return d.key; }, action.columnKey, action.index != null ? action.index : columns === null || columns === void 0 ? void 0 : columns.length);
            return __assign(__assign({}, props), { columns: newColumns });
        }
        case enums_1.ActionType.UngroupColumn: {
            var newGroups = (_a = props === null || props === void 0 ? void 0 : props.groups) === null || _a === void 0 ? void 0 : _a.filter(function (group) { return group.columnKey !== action.columnKey; });
            return __assign(__assign({}, props), { groups: (newGroups === null || newGroups === void 0 ? void 0 : newGroups.length) ? newGroups : undefined });
        }
        case enums_1.ActionType.GroupColumn: {
            var newGroups = __spreadArray(__spreadArray([], (props === null || props === void 0 ? void 0 : props.groups) || [], true), [{ columnKey: action.columnKey }], false);
            return __assign(__assign({}, props), { groups: (newGroups === null || newGroups === void 0 ? void 0 : newGroups.length) ? newGroups : undefined });
        }
        case enums_1.ActionType.ResizeColumn: {
            var columnKey_1 = action.columnKey, width_1 = action.width;
            var newColumns = columns.map(function (column) {
                var _a, _b, _c, _d, _e;
                if (column.key === columnKey_1) {
                    var newColumn = __assign({}, column);
                    if (((_a = newColumn.style) === null || _a === void 0 ? void 0 : _a.width) != null) {
                        newColumn.style = __assign(__assign({}, newColumn.style), { width: width_1 });
                    }
                    if (((_b = newColumn.style) === null || _b === void 0 ? void 0 : _b.width) == null || newColumn.width != null) {
                        newColumn.width = width_1;
                    }
                    if (((_d = (_c = newColumn.colGroup) === null || _c === void 0 ? void 0 : _c.style) === null || _d === void 0 ? void 0 : _d.width) != null) {
                        newColumn.colGroup.style = __assign(__assign({}, newColumn.colGroup.style), { width: width_1 });
                    }
                    if (((_e = newColumn.colGroup) === null || _e === void 0 ? void 0 : _e.width) != null) {
                        newColumn.colGroup.width = width_1;
                    }
                    return newColumn;
                }
                return column;
            });
            return __assign(__assign({}, props), { columns: newColumns });
        }
        case enums_1.ActionType.UpdatePageIndex: {
            return __assign(__assign({}, props), { paging: __assign(__assign({}, paging), { pageIndex: action.pageIndex }) });
        }
        case enums_1.ActionType.UpdatePageSize: {
            return __assign(__assign({}, props), { paging: __assign(__assign({}, paging), { pageSize: action.pageSize }) });
        }
        case enums_1.ActionType.UpdatePagesCount: {
            return __assign(__assign({}, props), { paging: __assign(__assign({}, paging), { pagesCount: action.pagesCount }) });
        }
        case enums_1.ActionType.HideLoading: {
            return __assign(__assign({}, props), { loading: __assign(__assign({}, loading), { enabled: false }) });
        }
        case enums_1.ActionType.ShowLoading: {
            var newLoading = __assign(__assign({}, loading), { enabled: true });
            if (action.text !== undefined) {
                newLoading.text = action.text;
            }
            return __assign(__assign({}, props), { loading: newLoading });
        }
        case enums_1.ActionType.ShowDetailsRow: {
            var newDetailsRows = __spreadArray([], detailsRows, true);
            newDetailsRows.push(action.rowKeyValue);
            return __assign(__assign({}, props), { detailsRows: newDetailsRows });
        }
        case enums_1.ActionType.HideDetailsRow: {
            var newDetailsRows = detailsRows.filter(function (row) { return row !== action.rowKeyValue; });
            return __assign(__assign({}, props), { detailsRows: newDetailsRows });
        }
        case enums_1.ActionType.OpenEditor: {
            var newEditableCells = (0, CellUtils_1.addItemToEditableCells)(action, editableCells);
            return __assign(__assign({}, props), { editableCells: newEditableCells });
        }
        case enums_1.ActionType.CloseEditor: {
            var newEditableCells = (0, CellUtils_1.removeItemFromEditableCells)(action, editableCells);
            return __assign(__assign({}, props), { editableCells: newEditableCells });
        }
        case enums_1.ActionType.UpdateFilterRowValue: {
            var newColumns = (0, ColumnUtils_1.replaceColumnValue)({
                columns: columns,
                columnKey: action.columnKey,
                replacedOption: 'filterRowValue',
                replacedValue: action.filterRowValue
            });
            return __assign(__assign({}, props), { columns: newColumns });
        }
        case enums_1.ActionType.UpdateHeaderFilterSearchValue: {
            var newColumns = (0, ColumnUtils_1.replaceColumnValue)({
                columns: columns,
                columnKey: action.columnKey,
                replacedOption: 'headerFilterSearchValue',
                replacedValue: action.headerFilterSearchValue
            });
            return __assign(__assign({}, props), { columns: newColumns });
        }
        case enums_1.ActionType.UpdateFilterRowOperator: {
            var newColumns = (0, ColumnUtils_1.replaceColumnValue)({
                columns: columns,
                columnKey: action.columnKey,
                replacedOption: 'filterRowOperator',
                replacedValue: action.filterRowOperator
            });
            return __assign(__assign({}, props), { columns: newColumns });
        }
        case enums_1.ActionType.UpdateEditorValue: {
            var newEditableCells = __spreadArray([], editableCells, true);
            var editableCellIndex = newEditableCells.findIndex(function (c) { return c.columnKey === action.columnKey && c.rowKeyValue === action.rowKeyValue; });
            var editableCell = __assign(__assign({}, newEditableCells[editableCellIndex]), { editorValue: action.value });
            newEditableCells[editableCellIndex] = editableCell;
            return __assign(__assign({}, props), { editableCells: newEditableCells });
        }
        case enums_1.ActionType.UpdateCellValue: {
            var row = data.find(function (d) { return (0, DataUtils_1.getValueByField)(d, rowKeyField) === action.rowKeyValue; });
            var column = columns.find(function (c) { return c.key === action.columnKey; });
            var updatedRowData = (0, DataUtils_1.replaceValue)(row, column, action.value);
            var newData = (0, ArrayUtils_1.getCopyOfArrayAndInsertOrReplaceItem)(updatedRowData, rowKeyField, data);
            return __assign(__assign({}, props), { data: newData });
        }
        case enums_1.ActionType.DeleteRow: {
            var newData = data.filter(function (d) { return (0, DataUtils_1.getValueByField)(d, rowKeyField) !== action.rowKeyValue; });
            return __assign(__assign({}, props), { data: newData });
        }
        case enums_1.ActionType.SelectAllRows: {
            var newSelectedRows = data.map(function (d) { return (0, DataUtils_1.getValueByField)(d, rowKeyField); });
            return __assign(__assign({}, props), { selectedRows: newSelectedRows });
        }
        case enums_1.ActionType.SelectAllFilteredRows: {
            var newData = (0, FilterUtils_1.filterAndSearchData)(props);
            var newSelectedRows = (0, ReducerUtils_1.removeDataKeysFromSelectedRows)(selectedRows, newData, rowKeyField);
            newSelectedRows = __spreadArray(__spreadArray([], newSelectedRows, true), newData.map(function (d) { return (0, DataUtils_1.getValueByField)(d, rowKeyField); }), true);
            return __assign(__assign({}, props), { selectedRows: newSelectedRows });
        }
        case enums_1.ActionType.SelectAllVisibleRows: {
            var newData = (0, PropsUtils_1.getData)(props);
            var newSelectedRows = (0, ReducerUtils_1.removeDataKeysFromSelectedRows)(selectedRows, newData, rowKeyField);
            newSelectedRows = __spreadArray(__spreadArray([], newSelectedRows, true), newData.map(function (d) { return (0, DataUtils_1.getValueByField)(d, rowKeyField); }), true);
            return __assign(__assign({}, props), { selectedRows: newSelectedRows });
        }
        case enums_1.ActionType.Search: {
            return __assign(__assign({}, props), { searchText: action.searchText });
        }
        case enums_1.ActionType.SelectSingleRow: {
            var newSelectedRows = [action.rowKeyValue];
            return __assign(__assign({}, props), { selectedRows: newSelectedRows });
        }
        case enums_1.ActionType.DeselectAllRows:
            return __assign(__assign({}, props), { selectedRows: [] });
        case enums_1.ActionType.DeselectAllFilteredRows: {
            var newData = (0, FilterUtils_1.filterAndSearchData)(props);
            var newSelectedRows = (0, ReducerUtils_1.removeDataKeysFromSelectedRows)(selectedRows, newData, rowKeyField);
            return __assign(__assign({}, props), { selectedRows: newSelectedRows });
        }
        case enums_1.ActionType.DeselectAllVisibleRows: {
            var newData = (0, PropsUtils_1.getData)(props);
            var newSelectedRows = (0, ReducerUtils_1.removeDataKeysFromSelectedRows)(selectedRows, newData, rowKeyField);
            return __assign(__assign({}, props), { selectedRows: newSelectedRows });
        }
        case enums_1.ActionType.SelectRow:
            return __assign(__assign({}, props), { selectedRows: __spreadArray(__spreadArray([], selectedRows, true), [action.rowKeyValue], false) });
        case enums_1.ActionType.SelectRows:
            return __assign(__assign({}, props), { selectedRows: __spreadArray(__spreadArray([], selectedRows, true), action.rowsKeyValues, true) });
        case enums_1.ActionType.SelectRowsRange: {
            var rowKeyValueTo_1 = action.rowKeyValueTo;
            if (rowKeyValueTo_1) {
                var shownData = utils_1.kaPropsUtils.getData(props);
                var rowKeyValueToIndex = shownData.findIndex(function (d) { return (0, DataUtils_1.getValueByField)(d, rowKeyField) === rowKeyValueTo_1; });
                var rowKeyValueFromIndex = shownData.findIndex(function (d) { return (0, DataUtils_1.getValueByField)(d, rowKeyField) === action.rowKeyValueFrom; });
                if (rowKeyValueToIndex != null && rowKeyValueFromIndex != null) {
                    var _h = rowKeyValueToIndex > rowKeyValueFromIndex ? [rowKeyValueFromIndex, rowKeyValueToIndex] : [rowKeyValueToIndex, rowKeyValueFromIndex], start = _h[0], end = _h[1];
                    var rowsToSelect = [];
                    for (var i = start; i <= end; i++) {
                        var value = (0, DataUtils_1.getValueByField)(shownData[i], rowKeyField);
                        if (!selectedRows.includes(value)) {
                            rowsToSelect.push(value);
                        }
                    }
                    return __assign(__assign({}, props), { selectedRows: __spreadArray(__spreadArray([], selectedRows, true), rowsToSelect, true) });
                }
            }
            return __assign(__assign({}, props), { selectedRows: __spreadArray(__spreadArray([], selectedRows, true), [action.rowKeyValueFrom], false) });
        }
        case enums_1.ActionType.DeselectRow: {
            var newSelectedRows = __spreadArray([], selectedRows, true).filter(function (s) { return s !== action.rowKeyValue; });
            return __assign(__assign({}, props), { selectedRows: newSelectedRows });
        }
        case enums_1.ActionType.DeselectRows: {
            var newSelectedRows = __spreadArray([], selectedRows, true).filter(function (s) { return !action.rowsKeyValues.includes(s); });
            return __assign(__assign({}, props), { selectedRows: newSelectedRows });
        }
        case enums_1.ActionType.UpdateSortDirection:
            var sortedColumns = (0, HeadRowUtils_1.getUpdatedSortedColumns)(columns, action.columnKey, sortingMode);
            return __assign(__assign({}, props), { columns: sortedColumns });
        case enums_1.ActionType.UpdateVirtualScrolling:
            return __assign(__assign({}, props), { virtualScrolling: action.virtualScrolling });
        case enums_1.ActionType.UpdateData:
            return __assign(__assign({}, props), { data: action.data });
        case enums_1.ActionType.ScrollTable:
            var scrollTop = action.scrollTop;
            return __assign(__assign({}, props), { virtualScrolling: __assign(__assign({}, virtualScrolling), { scrollTop: scrollTop }) });
        case enums_1.ActionType.UpdateGroupsExpanded: {
            var currentGroupsExpanded = groupsExpanded;
            if (!currentGroupsExpanded) {
                var preparedOptions = (0, PropsUtils_1.prepareTableOptions)(props);
                currentGroupsExpanded = (0, GroupUtils_1.getExpandedGroups)(preparedOptions.groupedData);
            }
            var newGroupsExpanded = (0, GroupUtils_1.updateExpandedGroups)(currentGroupsExpanded, action.groupKey);
            return __assign(__assign({}, props), { groupsExpanded: newGroupsExpanded });
        }
        case enums_1.ActionType.ShowNewRow:
        case enums_1.ActionType.OpenRowEditors: {
            var rowKeyValue = action.type === enums_1.ActionType.ShowNewRow ? const_1.newRowId : action.rowKeyValue;
            var newEditableCells = (0, ReducerUtils_1.addColumnsToRowEditableCells)(editableCells, columns, rowKeyValue);
            return __assign(__assign({}, props), { editableCells: newEditableCells });
        }
        case enums_1.ActionType.OpenAllEditors: {
            var newEditableCells = (0, ReducerUtils_1.getEditableCellsByData)(data, rowKeyField, columns);
            return __assign(__assign({}, props), { editableCells: newEditableCells });
        }
        case enums_1.ActionType.HideNewRow:
        case enums_1.ActionType.CloseRowEditors: {
            var rowKeyValue_2 = action.type === enums_1.ActionType.HideNewRow ? const_1.newRowId : action.rowKeyValue;
            var newEditableCells = editableCells.filter(function (e) { return e.rowKeyValue !== rowKeyValue_2; });
            return __assign(__assign({}, props), { editableCells: newEditableCells });
        }
        case enums_1.ActionType.Validate: {
            var newEditableCells = (0, ReducerUtils_1.getValidatedEditableCells)(props);
            return __assign(__assign({}, props), { editableCells: __spreadArray([], newEditableCells, true) });
        }
        case enums_1.ActionType.SaveAllEditors: {
            var newData_1 = __spreadArray([], data, true);
            editableCells === null || editableCells === void 0 ? void 0 : editableCells.forEach(function (editableCell) {
                if (editableCell.hasOwnProperty('editorValue')) {
                    var rowIndex = newData_1.findIndex(function (d) { return (0, DataUtils_1.getValueByField)(d, rowKeyField) === editableCell.rowKeyValue; });
                    if (rowIndex != null) {
                        var column = columns.find(function (c) { return c.key === editableCell.columnKey; });
                        newData_1[rowIndex] = (0, DataUtils_1.replaceValue)(newData_1[rowIndex], column, editableCell.editorValue);
                    }
                }
            });
            return __assign(__assign({}, props), { data: newData_1 });
        }
        case enums_1.ActionType.SaveRowEditors:
        case enums_1.ActionType.SaveNewRow: {
            var isNewRow_1 = action.type === enums_1.ActionType.SaveNewRow;
            var rowEditorKeyValue_1 = isNewRow_1 ? const_1.newRowId : action.rowKeyValue;
            var updatedRowData_1 = data.find(function (d) { return (0, DataUtils_1.getValueByField)(d, rowKeyField) === rowEditorKeyValue_1; });
            var rowEditableCells = editableCells.filter(function (editableCell) { return editableCell.rowKeyValue === rowEditorKeyValue_1
                && (isNewRow_1 || editableCell.hasOwnProperty('editorValue')); });
            if (action.validate && !(0, PropsUtils_1.isValid)(__assign(__assign({}, props), { editableCells: rowEditableCells }))) {
                rowEditableCells.forEach(function (cell) {
                    var column = columns.find(function (c) { return c.key === cell.columnKey; });
                    cell.validationMessage = validation && validation({
                        column: column,
                        value: cell.editorValue,
                        rowData: updatedRowData_1
                    });
                });
                return __assign(__assign({}, props), { editableCells: __spreadArray([], editableCells, true) });
            }
            var newEditableCells = editableCells.filter(function (e) { return e.rowKeyValue !== rowEditorKeyValue_1; });
            rowEditableCells.forEach(function (cell) {
                var column = columns.find(function (c) { return c.key === cell.columnKey; });
                updatedRowData_1 = (0, DataUtils_1.replaceValue)(updatedRowData_1, column, cell.editorValue);
            });
            var newData = void 0;
            if (isNewRow_1) {
                updatedRowData_1[rowKeyField] = action.rowKeyValue;
                newData = __spreadArray([updatedRowData_1], data, true);
            }
            else {
                newData = (0, ArrayUtils_1.getCopyOfArrayAndInsertOrReplaceItem)(updatedRowData_1, rowKeyField, data);
            }
            return __assign(__assign({}, props), { data: newData, editableCells: newEditableCells });
        }
        case enums_1.ActionType.UpdateRow: {
            var newData = (0, ArrayUtils_1.getCopyOfArrayAndInsertOrReplaceItem)(action.rowData, rowKeyField, data);
            return __assign(__assign({}, props), { data: newData });
        }
        case enums_1.ActionType.UpdateTreeGroupsExpanded: {
            var rowKeyValue_3 = action.rowKeyValue;
            var value = treeGroupsExpanded ? !treeGroupsExpanded.some(function (v) { return v === rowKeyValue_3; }) : false;
            if (value) {
                return __assign(__assign({}, props), { treeGroupsExpanded: __spreadArray(__spreadArray([], (treeGroupsExpanded || []), true), [rowKeyValue_3], false) });
            }
            var currentExpanded = treeGroupsExpanded;
            if (!currentExpanded) {
                var preparedOptions = (0, PropsUtils_1.prepareTableOptions)(props);
                currentExpanded = (0, TreeUtils_1.getExpandedParents)(preparedOptions.groupedData, rowKeyField);
            }
            return __assign(__assign({}, props), { treeGroupsExpanded: currentExpanded.filter(function (item) { return item !== rowKeyValue_3; }) });
        }
    }
    return props;
};
exports.kaReducer = kaReducer;
