"use strict";
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
exports.getRowsWithGroupedColumns = exports.addColumnToRows = exports.getChain = void 0;
var getChain = function (column, groupedColumns, currentChain) {
    if (currentChain === void 0) { currentChain = []; }
    var newChain = __spreadArray([column], currentChain, true);
    var groupedColumn = groupedColumns.find(function (gc) { return gc.columnsKeys.includes(column.key); });
    if (groupedColumn) {
        return (0, exports.getChain)(groupedColumn, groupedColumns, newChain);
    }
    return newChain;
};
exports.getChain = getChain;
var addColumnToRows = function (rows, column, groupedColumns) {
    var rowsResult = __spreadArray([], rows, true);
    var columnsChain = (0, exports.getChain)(column, groupedColumns);
    var isSameLast = true;
    columnsChain.forEach(function (item, index) {
        if (!rowsResult[index]) {
            rowsResult[index] = [];
        }
        var last = __spreadArray([], rowsResult[index], true).pop();
        if (last && last.column === item) {
            if (isSameLast) {
                last.colSpan++;
                last.columns.push(column);
                return;
            }
            isSameLast = true;
        }
        else {
            isSameLast = false;
        }
        rowsResult[index].push({
            colSpan: 1,
            columnChainLength: columnsChain.length,
            column: item,
            columns: [column]
        });
    });
    return rowsResult;
};
exports.addColumnToRows = addColumnToRows;
var getRowsWithGroupedColumns = function (columns, groupedColumns) {
    var rows = [];
    columns.forEach(function (c) {
        rows = (0, exports.addColumnToRows)(rows, c, groupedColumns);
    });
    rows.forEach(function (row, index) {
        row.forEach(function (c) {
            c.rowSpan = index === c.columnChainLength - 1 ? rows.length - c.columnChainLength + 1 : 1;
        });
    });
    return rows;
};
exports.getRowsWithGroupedColumns = getRowsWithGroupedColumns;
