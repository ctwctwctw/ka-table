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
exports.checkIndexOdd = exports.reorderData = exports.insertBefore = exports.reorderDataByIndex = exports.replaceValue = exports.getValueByField = exports.getValueByColumn = exports.createObjByFields = exports.getParentValue = void 0;
var ColumnUtils_1 = require("./ColumnUtils");
var getParentValue = function (rowData, fieldParents) {
    var parentValue = fieldParents.reduce(function (previousValue, currentValue) {
        var result = (previousValue && previousValue[currentValue]);
        return result !== undefined ? result : undefined;
    }, rowData);
    return parentValue ? __assign({}, parentValue) : undefined;
};
exports.getParentValue = getParentValue;
var createObjByFields = function (fieldParents, field, value) {
    var parentValue = {};
    if (fieldParents.length) {
        fieldParents.reduce(function (previousValue, currentItem, currentIndex) {
            var lastObj = {};
            previousValue[currentItem] = lastObj;
            if (currentIndex === (fieldParents.length - 1)) {
                lastObj[field] = value;
            }
            return lastObj;
        }, parentValue);
    }
    else {
        parentValue[field] = value;
    }
    return __assign({}, parentValue);
};
exports.createObjByFields = createObjByFields;
var getValueByColumn = function (rowData, column) {
    return (0, exports.getValueByField)(rowData, (0, ColumnUtils_1.getField)(column));
};
exports.getValueByColumn = getValueByColumn;
var getValueByField = function (rowData, field) {
    var o = __assign({}, rowData);
    var names = (0, ColumnUtils_1.getFieldParts)(field);
    for (var i = 0, n = names.length; i < n; ++i) {
        var k = names[i];
        if (k in o) {
            o = o[k];
        }
        else {
            return;
        }
    }
    return o;
};
exports.getValueByField = getValueByField;
var replaceValueForField = function (rowData, field, newValue, fieldParents) {
    var result = __assign({}, rowData);
    if (fieldParents && fieldParents.length) {
        var parentValue = (0, exports.getParentValue)(result, fieldParents) || {};
        parentValue[field] = newValue;
        var parentsOfParent = __spreadArray([], fieldParents, true);
        var parentFieldName = parentsOfParent.pop();
        result = replaceValueForField(result, parentFieldName, parentValue, parentsOfParent);
    }
    else {
        result[field] = newValue;
    }
    return result;
};
var replaceValue = function (rowData, column, newValue) {
    var field = (0, ColumnUtils_1.getField)(column);
    return replaceValueForField(rowData, (0, ColumnUtils_1.getLastField)(field), newValue, (0, ColumnUtils_1.getLastFieldParents)(field));
};
exports.replaceValue = replaceValue;
var reorderDataByIndex = function (data, getKey, keyValue, targetIndex) {
    var moved = data.find(function (d) { return getKey(d) === keyValue; });
    var newData = data.filter(function (d) { return getKey(d) !== keyValue; });
    newData.splice(targetIndex, 0, moved);
    return newData;
};
exports.reorderDataByIndex = reorderDataByIndex;
var insertBefore = function (data, getKey, keyValue, targetKeyValue) {
    var targetIndex = data.findIndex(function (d) { return getKey(d) === targetKeyValue; });
    var moved = data.findIndex(function (d) { return getKey(d) === keyValue; });
    if (moved < targetIndex) {
        targetIndex = targetIndex - 1;
    }
    return (0, exports.reorderDataByIndex)(data, getKey, keyValue, targetIndex);
};
exports.insertBefore = insertBefore;
var reorderData = function (data, getKey, keyValue, targetKeyValue) {
    var targetIndex = data.findIndex(function (d) { return getKey(d) === targetKeyValue; });
    return (0, exports.reorderDataByIndex)(data, getKey, keyValue, targetIndex);
};
exports.reorderData = reorderData;
var checkIndexOdd = function (index) {
    return index % 2 !== 0;
};
exports.checkIndexOdd = checkIndexOdd;
