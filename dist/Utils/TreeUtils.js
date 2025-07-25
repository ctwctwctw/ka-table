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
exports.getTreeData = exports.restoreFilteredData = exports.getTreeGroupChain = exports.getExpandedParents = exports.treeDataMark = exports.treeGroupMark = void 0;
var DataUtils_1 = require("./DataUtils");
exports.treeGroupMark = {};
exports.treeDataMark = {};
var getExpandedParents = function (treeData, rowKeyField) {
    return treeData
        .filter(function (item) { return item.treeGroupMark === exports.treeGroupMark; })
        .map(function (item) { return (0, DataUtils_1.getValueByField)(item.rowData, rowKeyField); });
};
exports.getExpandedParents = getExpandedParents;
var getItemStructure = function (item, dataHash, rowKeyField, treeDeep) {
    if (treeDeep === void 0) { treeDeep = 0; }
    var children = dataHash[(0, DataUtils_1.getValueByField)(item, rowKeyField)];
    if (!children) {
        return [{ treeDataMark: exports.treeDataMark, rowData: item, treeDeep: treeDeep + 1 }];
    }
    var result = [{ treeGroupMark: exports.treeGroupMark, rowData: item, treeDeep: treeDeep }];
    children.forEach(function (c) {
        var childrenData = getItemStructure(c, dataHash, rowKeyField, treeDeep + 1);
        result.push.apply(result, childrenData);
    });
    return result;
};
var getTreeGroupChain = function (keyValue, dataMap, treeGroupKeyField, treeGroupKeyValues, groupChain) {
    if (groupChain === void 0) { groupChain = []; }
    var value = dataMap[keyValue];
    var chain = groupChain;
    if (!treeGroupKeyValues.includes(keyValue)) {
        treeGroupKeyValues.push(keyValue);
        chain = __spreadArray(__spreadArray([], groupChain, true), [value], false);
    }
    var treeGroupKeyValue = (0, DataUtils_1.getValueByField)(value, treeGroupKeyField);
    if (treeGroupKeyValue) {
        return (0, exports.getTreeGroupChain)(treeGroupKeyValue, dataMap, treeGroupKeyField, treeGroupKeyValues, chain);
    }
    return chain;
};
exports.getTreeGroupChain = getTreeGroupChain;
var restoreFilteredData = function (_a) {
    var data = _a.data, originalData = _a.originalData, rowKeyField = _a.rowKeyField, treeGroupKeyField = _a.treeGroupKeyField, treeGroupsExpanded = _a.treeGroupsExpanded;
    var filteredData = [];
    var treeGroupKeyValues = data.map(function (d) { return (0, DataUtils_1.getValueByField)(d, rowKeyField); });
    var dataMap = originalData.reduce(function (acc, d) {
        acc[(0, DataUtils_1.getValueByField)(d, rowKeyField)] = d;
        return acc;
    }, {});
    data.forEach(function (d) {
        var treeGroupKeyValue = (0, DataUtils_1.getValueByField)(d, treeGroupKeyField);
        if (treeGroupKeyValues.includes(treeGroupKeyValue) || !treeGroupKeyValue) {
            filteredData.push(d);
        }
        else {
            var groupsChain = (0, exports.getTreeGroupChain)(treeGroupKeyValue, dataMap, treeGroupKeyField, treeGroupKeyValues);
            filteredData = __spreadArray(__spreadArray(__spreadArray([], filteredData, true), groupsChain, true), [d], false);
        }
    });
    return filteredData;
};
exports.restoreFilteredData = restoreFilteredData;
var getDataHashAndRootElements = function (_a) {
    var data = _a.data, treeGroupKeyField = _a.treeGroupKeyField, treeGroupsExpanded = _a.treeGroupsExpanded;
    var dataHash = {};
    var rootElements = [];
    data.forEach(function (d) {
        var _a;
        var parentRowKeyValue = (_a = (0, DataUtils_1.getValueByField)(d, treeGroupKeyField)) !== null && _a !== void 0 ? _a : undefined;
        if (!parentRowKeyValue) {
            rootElements.push(d);
            return;
        }
        if (!dataHash[parentRowKeyValue]) {
            dataHash[parentRowKeyValue] = [];
        }
        if (!treeGroupsExpanded || treeGroupsExpanded.includes(parentRowKeyValue)) {
            dataHash[parentRowKeyValue].push(d);
        }
    });
    return { dataHash: dataHash, rootElements: rootElements };
};
var getTreeData = function (_a) {
    var data = _a.data, originalData = _a.originalData, rowKeyField = _a.rowKeyField, treeGroupKeyField = _a.treeGroupKeyField, treeGroupsExpanded = _a.treeGroupsExpanded;
    if (data.length !== originalData.length) {
        data = (0, exports.restoreFilteredData)({
            data: data,
            originalData: originalData,
            rowKeyField: rowKeyField,
            treeGroupKeyField: treeGroupKeyField,
            treeGroupsExpanded: treeGroupsExpanded
        });
    }
    var _b = getDataHashAndRootElements({
        data: data,
        treeGroupKeyField: treeGroupKeyField,
        treeGroupsExpanded: treeGroupsExpanded
    }), dataHash = _b.dataHash, rootElements = _b.rootElements;
    var newData = [];
    rootElements.forEach(function (d) {
        newData.push.apply(newData, getItemStructure(d, dataHash, rowKeyField));
    });
    return newData;
};
exports.getTreeData = getTreeData;
