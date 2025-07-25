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
exports.getCopyOfArrayAndInsertOrReplaceItem = exports.getCopyOfArrayAndDeleteItem = exports.getCopyOfArrayAndAddItem = void 0;
var getCopyOfArrayAndAddItem = function (item, array) {
    if (array === void 0) { array = []; }
    return array.concat([item]);
};
exports.getCopyOfArrayAndAddItem = getCopyOfArrayAndAddItem;
var getCopyOfArrayAndDeleteItem = function (item, rowKeyField, array) {
    var rowKeyValue = item[rowKeyField];
    return array.filter(function (i) { return i[rowKeyField] !== rowKeyValue; });
};
exports.getCopyOfArrayAndDeleteItem = getCopyOfArrayAndDeleteItem;
var getCopyOfArrayAndInsertOrReplaceItem = function (item, rowKeyField, array) {
    var newArray = __spreadArray([], array, true);
    var rowKeyValue = item[rowKeyField];
    var index = newArray.findIndex(function (i) { return i[rowKeyField] === rowKeyValue; });
    index >= 0 ? newArray.splice(index, 1, item) : newArray.push(item);
    return newArray;
};
exports.getCopyOfArrayAndInsertOrReplaceItem = getCopyOfArrayAndInsertOrReplaceItem;
