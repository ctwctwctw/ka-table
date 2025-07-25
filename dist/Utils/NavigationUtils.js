"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDownCell = exports.getUpCell = exports.getLeftCell = exports.getRightCell = void 0;
var DataUtils_1 = require("./DataUtils");
var PropsUtils_1 = require("./PropsUtils");
var getRightCell = function (currentCell, props, settings) {
    var _a;
    var nextColumnKey;
    var hasNextColumn = true;
    if (settings === null || settings === void 0 ? void 0 : settings.end) {
        nextColumnKey = (_a = props.columns[props.columns.length - 1]) === null || _a === void 0 ? void 0 : _a.key;
    }
    else {
        var columnIndex = props.columns.findIndex(function (c) { return c.key === currentCell.columnKey; });
        hasNextColumn = columnIndex < props.columns.length - 1;
        nextColumnKey = hasNextColumn
            ? props.columns[columnIndex + 1].key
            : currentCell.columnKey;
    }
    return { columnKey: nextColumnKey, rowKeyValue: currentCell.rowKeyValue };
};
exports.getRightCell = getRightCell;
var getLeftCell = function (currentCell, props, settings) {
    var _a;
    var nextColumnKey;
    var hasNextColumn = true;
    if (settings === null || settings === void 0 ? void 0 : settings.end) {
        nextColumnKey = (_a = props.columns[0]) === null || _a === void 0 ? void 0 : _a.key;
    }
    else {
        var columnIndex = props.columns.findIndex(function (c) { return c.key === currentCell.columnKey; });
        hasNextColumn = 0 < columnIndex;
        nextColumnKey = hasNextColumn
            ? props.columns[columnIndex - 1].key
            : currentCell.columnKey;
    }
    return { columnKey: nextColumnKey, rowKeyValue: currentCell.rowKeyValue };
};
exports.getLeftCell = getLeftCell;
var getUpCell = function (currentCell, props, settings) {
    var rowKeyValue = currentCell.rowKeyValue;
    var visibleData = (0, PropsUtils_1.getData)(props);
    if (settings === null || settings === void 0 ? void 0 : settings.end) {
        var nextRow = visibleData[0];
        rowKeyValue = (0, DataUtils_1.getValueByField)(nextRow, props.rowKeyField);
    }
    else {
        var rowIndex = visibleData === null || visibleData === void 0 ? void 0 : visibleData.findIndex(function (d) { return (0, DataUtils_1.getValueByField)(d, props.rowKeyField) === currentCell.rowKeyValue; });
        if (rowIndex > 0) {
            var nextRow = visibleData[rowIndex - 1];
            rowKeyValue = (0, DataUtils_1.getValueByField)(nextRow, props.rowKeyField);
        }
    }
    return { columnKey: currentCell.columnKey, rowKeyValue: rowKeyValue };
};
exports.getUpCell = getUpCell;
var getDownCell = function (currentCell, props, settings) {
    var rowKeyValue = currentCell.rowKeyValue;
    var visibleData = (0, PropsUtils_1.getData)(props);
    if (settings === null || settings === void 0 ? void 0 : settings.end) {
        var nextRow = visibleData[visibleData.length - 1];
        rowKeyValue = (0, DataUtils_1.getValueByField)(nextRow, props.rowKeyField);
    }
    else {
        var rowIndex = visibleData === null || visibleData === void 0 ? void 0 : visibleData.findIndex(function (d) { return (0, DataUtils_1.getValueByField)(d, props.rowKeyField) === currentCell.rowKeyValue; });
        if (rowIndex < visibleData.length - 1) {
            var nextRow = visibleData[rowIndex + 1];
            rowKeyValue = (0, DataUtils_1.getValueByField)(nextRow, props.rowKeyField);
        }
    }
    return { columnKey: currentCell.columnKey, rowKeyValue: rowKeyValue };
};
exports.getDownCell = getDownCell;
