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
exports.isSortingEnabled = exports.isRemoteSorting = exports.isMultipleSorting = exports.isTripleStateSorting = exports.sortData = exports.sortColumns = void 0;
var enums_1 = require("../enums");
var DataUtils_1 = require("./DataUtils");
var sortColumns = function (columns) {
    return columns.filter(function (c) { return c.sortDirection; }).sort(function (a, b) {
        if (a.sortIndex === b.sortIndex) {
            return 0;
        }
        if (!a.sortIndex) {
            return -1;
        }
        if (!b.sortIndex) {
            return 1;
        }
        if (a.sortIndex < b.sortIndex) {
            return -1;
        }
        return 1;
    });
};
exports.sortColumns = sortColumns;
var sortData = function (columns, data, sort) {
    var column = columns.find(function (c) { return c.sortDirection; });
    if (!column) {
        return data;
    }
    var customSort = sort && sort({ column: column });
    var sortFunc = (customSort && (function (rowDataA, rowDataB) { return customSort((0, DataUtils_1.getValueByColumn)(rowDataA, column), (0, DataUtils_1.getValueByColumn)(rowDataB, column)); })) || (column.sortDirection === enums_1.SortDirection.Ascend
        ? ascendSort(column)
        : descendSort(column));
    var newData = __spreadArray([], data, true).sort(sortFunc);
    return newData;
};
exports.sortData = sortData;
var ascendSort = function (sortedColumn) {
    return function (a, b) {
        var aValue = (0, DataUtils_1.getValueByColumn)(a, sortedColumn);
        var bValue = (0, DataUtils_1.getValueByColumn)(b, sortedColumn);
        if (aValue === bValue) {
            return 0;
        }
        else if (aValue == null) {
            return -1;
        }
        else if (bValue == null) {
            return 1;
        }
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return aValue.toLowerCase() < bValue.toLowerCase() ? -1 : 1;
        }
        return aValue < bValue ? -1 : 1;
    };
};
var descendSort = function (sortedColumn) {
    return function (a, b) {
        var aValue = (0, DataUtils_1.getValueByColumn)(a, sortedColumn);
        var bValue = (0, DataUtils_1.getValueByColumn)(b, sortedColumn);
        if (aValue === bValue) {
            return 0;
        }
        else if (aValue == null) {
            return 1;
        }
        else if (bValue == null) {
            return -1;
        }
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return aValue.toLowerCase() > bValue.toLowerCase() ? -1 : 1;
        }
        return aValue > bValue ? -1 : 1;
    };
};
var isTripleStateSorting = function (sortingMode) {
    return sortingMode === enums_1.SortingMode.MultipleTripleStateRemote
        || sortingMode === enums_1.SortingMode.SingleTripleState
        || sortingMode === enums_1.SortingMode.SingleTripleStateRemote;
};
exports.isTripleStateSorting = isTripleStateSorting;
var isMultipleSorting = function (sortingMode) {
    return sortingMode === enums_1.SortingMode.MultipleTripleStateRemote
        || sortingMode === enums_1.SortingMode.MultipleRemote;
};
exports.isMultipleSorting = isMultipleSorting;
var isRemoteSorting = function (sortingMode) {
    return sortingMode === enums_1.SortingMode.SingleRemote
        || sortingMode === enums_1.SortingMode.MultipleTripleStateRemote
        || sortingMode === enums_1.SortingMode.SingleTripleStateRemote
        || sortingMode === enums_1.SortingMode.MultipleRemote;
};
exports.isRemoteSorting = isRemoteSorting;
var isSortingEnabled = function (sortingMode, column) {
    return sortingMode !== enums_1.SortingMode.None && (column === null || column === void 0 ? void 0 : column.isSortable) !== false;
};
exports.isSortingEnabled = isSortingEnabled;
