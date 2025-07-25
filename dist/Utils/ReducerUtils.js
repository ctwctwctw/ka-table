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
exports.getUpdatedFocused = exports.removeDataKeysFromSelectedRows = exports.addColumnsToRowEditableCells = exports.getEditableCellsByData = exports.getValidatedEditableCells = void 0;
var DataUtils_1 = require("./DataUtils");
var getValidatedEditableCells = function (_a) {
    var data = _a.data, _b = _a.editableCells, editableCells = _b === void 0 ? [] : _b, columns = _a.columns, rowKeyField = _a.rowKeyField, validation = _a.validation;
    return editableCells.map(function (cell) {
        var column = columns.find(function (c) { return c.key === cell.columnKey; });
        var updatedRowData = data === null || data === void 0 ? void 0 : data.find(function (d) { return (0, DataUtils_1.getValueByField)(d, rowKeyField) === cell.rowKeyValue; });
        var value = cell.hasOwnProperty('editorValue') ? cell.editorValue : (0, DataUtils_1.getValueByField)(updatedRowData, cell.columnKey);
        return __assign(__assign({}, cell), { validationMessage: validation && validation({
                column: column,
                rowData: updatedRowData,
                value: value
            }) });
    });
};
exports.getValidatedEditableCells = getValidatedEditableCells;
var getEditableCellsByData = function (data, rowKeyField, columns) {
    var editableCells = [];
    data === null || data === void 0 ? void 0 : data.forEach(function (rowData) {
        var rowKeyValue = (0, DataUtils_1.getValueByField)(rowData, rowKeyField);
        columns.forEach(function (column) {
            editableCells.push({ columnKey: column.key, rowKeyValue: rowKeyValue });
        });
    });
    return editableCells;
};
exports.getEditableCellsByData = getEditableCellsByData;
var addColumnsToRowEditableCells = function (editableCells, columns, rowKeyValue) {
    var newEditableCells = __spreadArray([], editableCells, true);
    columns.forEach(function (column) {
        if (column.isEditable !== false
            && !newEditableCells.some(function (e) { return e.columnKey === column.key && e.rowKeyValue === rowKeyValue; })) {
            newEditableCells.push({
                columnKey: column.key,
                rowKeyValue: rowKeyValue
            });
        }
    });
    return newEditableCells;
};
exports.addColumnsToRowEditableCells = addColumnsToRowEditableCells;
var removeDataKeysFromSelectedRows = function (selectedRows, data, rowKeyField) {
    var newSelectedRows = selectedRows.filter(function (rowKeyValue) {
        return !data.some(function (d) { return (0, DataUtils_1.getValueByField)(d, rowKeyField) === rowKeyValue; });
    });
    return newSelectedRows;
};
exports.removeDataKeysFromSelectedRows = removeDataKeysFromSelectedRows;
var getUpdatedFocused = function (props, action, funcToUpdate) {
    var _a;
    if (!((_a = props === null || props === void 0 ? void 0 : props.focused) === null || _a === void 0 ? void 0 : _a.cell))
        return props;
    var newFocused = { cell: funcToUpdate(props.focused.cell, props, action.settings) };
    return __assign(__assign({}, props), { focused: newFocused });
};
exports.getUpdatedFocused = getUpdatedFocused;
