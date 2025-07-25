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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceColumnValue = exports.getLastFieldParents = exports.getFieldParts = exports.getLastField = exports.getField = exports.getColumn = void 0;
var defaultOptions_1 = __importDefault(require("../defaultOptions"));
var ArrayUtils_1 = require("./ArrayUtils");
var getColumn = function (columns, columnKey) { return columns.find(function (c) { return c.key === columnKey; }); };
exports.getColumn = getColumn;
var getField = function (column) {
    return column.field || column.key;
};
exports.getField = getField;
var getLastField = function (field) {
    if (defaultOptions_1.default.fieldDelimiter) {
        return field.split(defaultOptions_1.default.fieldDelimiter).pop();
    }
    return field;
};
exports.getLastField = getLastField;
var getFieldParts = function (field) {
    return defaultOptions_1.default.fieldDelimiter ? field.split(defaultOptions_1.default.fieldDelimiter) : [field];
};
exports.getFieldParts = getFieldParts;
var getLastFieldParents = function (field) {
    if (defaultOptions_1.default.fieldDelimiter) {
        var fieldParents = field.split(defaultOptions_1.default.fieldDelimiter);
        fieldParents.pop();
        return fieldParents;
    }
    return [];
};
exports.getLastFieldParents = getLastFieldParents;
var replaceColumnValue = function (_a) {
    var _b;
    var columns = _a.columns, columnKey = _a.columnKey, replacedOption = _a.replacedOption, replacedValue = _a.replacedValue;
    var column = columns.find(function (c) { return c.key === columnKey; });
    var newColumn = __assign(__assign({}, column), (_b = {}, _b[replacedOption] = replacedValue, _b));
    var newArray = (0, ArrayUtils_1.getCopyOfArrayAndInsertOrReplaceItem)(newColumn, 'key', columns);
    return newArray;
};
exports.replaceColumnValue = replaceColumnValue;
