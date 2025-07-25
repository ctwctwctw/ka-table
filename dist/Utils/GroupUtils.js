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
exports.isMaxDeep = exports.getGroupText = exports.getGroupMark = exports.normalizeKeyForMap = exports.groupBy = exports.getGroupedStructure = exports.convertToFlat = exports.getGroupedData = exports.getExpandedGroups = exports.updateExpandedGroups = exports.groupDataMark = exports.groupSummaryMark = exports.groupMark = void 0;
var DataUtils_1 = require("./DataUtils");
exports.groupMark = {};
exports.groupSummaryMark = {};
exports.groupDataMark = {};
var getGroupSummary = function (groupData, key, groupIndex) { return ({ groupData: groupData, groupSummaryMark: exports.groupSummaryMark, key: JSON.stringify([key, '--:+summary--']), groupIndex: groupIndex }); };
var updateExpandedGroups = function (groupsExpanded, groupKey) {
    var newGroupsExpanded = groupsExpanded.filter(function (ge) { return JSON.stringify(ge) !== JSON.stringify(groupKey); });
    if (newGroupsExpanded.length === groupsExpanded.length) {
        newGroupsExpanded.push(groupKey);
    }
    return newGroupsExpanded;
};
exports.updateExpandedGroups = updateExpandedGroups;
var getExpandedGroups = function (groupedData) {
    return groupedData
        .filter(function (g) { return g.groupMark === exports.groupMark; })
        .map(function (g) { return g.key; });
};
exports.getExpandedGroups = getExpandedGroups;
var getGroupedData = function (data, groups, groupedColumns, groupsExpanded) {
    var grouped = (0, exports.getGroupedStructure)({
        data: data,
        groups: groups,
        groupedColumns: groupedColumns,
        groupsExpanded: groupsExpanded
    });
    return (0, exports.convertToFlat)(grouped);
};
exports.getGroupedData = getGroupedData;
var convertToFlat = function (grouped, key) {
    if (key === void 0) { key = []; }
    var result = [];
    grouped.forEach(function (value, groupValue) {
        if (groupValue === exports.groupSummaryMark) {
            result.push(value);
        }
        else {
            var groupKey = __spreadArray([], key, true);
            groupKey.push(groupValue);
            result.push({ groupMark: exports.groupMark, key: groupKey, value: groupValue, groupItems: (value === null || value === void 0 ? void 0 : value.groupDataMark) === exports.groupDataMark ? value === null || value === void 0 ? void 0 : value.groupData : value });
            result = __spreadArray(__spreadArray([], result, true), (Array.isArray(value) ? value : (0, exports.convertToFlat)(value, groupKey)), true);
        }
    });
    return result;
};
exports.convertToFlat = convertToFlat;
var getGroupedStructure = function (_a) {
    var data = _a.data, groups = _a.groups, groupedColumns = _a.groupedColumns, _b = _a.expandedDeep, expandedDeep = _b === void 0 ? 0 : _b, groupsExpanded = _a.groupsExpanded, _c = _a.parentGroupKey, parentGroupKey = _c === void 0 ? [] : _c;
    groups = __spreadArray([], groups, true);
    var group = groups.shift();
    if (group) {
        var column_1 = groupedColumns && groupedColumns.find(function (g) { return g.key === group.columnKey; });
        if (column_1) {
            var grouped_1 = (0, exports.groupBy)(data, function (item) { return (0, DataUtils_1.getValueByColumn)(item, column_1); });
            grouped_1.forEach(function (groupData, key) {
                var groupExpandedItems = groupsExpanded && groupsExpanded.filter(function (ge) { return ge[expandedDeep] === key; });
                var isGroupExpanded = !groupExpandedItems
                    || groupExpandedItems.some(function (ge) { return ge.length === expandedDeep + 1; });
                if (isGroupExpanded) {
                    var fullKey = __spreadArray(__spreadArray([], parentGroupKey, true), [key], false);
                    var newStructure = (0, exports.getGroupedStructure)({
                        data: groupData,
                        groups: groups,
                        groupedColumns: groupedColumns,
                        expandedDeep: expandedDeep + 1,
                        groupsExpanded: groupExpandedItems && groupExpandedItems.filter(function (ge) { return ge.length > expandedDeep + 1; }),
                        parentGroupKey: fullKey
                    });
                    if (newStructure) {
                        if (group.enableSummary) {
                            newStructure.set(exports.groupSummaryMark, getGroupSummary(groupData, fullKey, expandedDeep));
                        }
                        newStructure.groupDataMark = exports.groupDataMark;
                        newStructure.groupData = groupData;
                        grouped_1.set(key, newStructure);
                    }
                    else if (group.enableSummary) {
                        groupData.push(getGroupSummary(__spreadArray([], groupData, true), fullKey, expandedDeep));
                    }
                }
                else {
                    var emptyArray = [];
                    emptyArray.groupDataMark = exports.groupDataMark;
                    emptyArray.groupData = groupData;
                    grouped_1.set(key, emptyArray);
                }
            });
            return grouped_1;
        }
    }
};
exports.getGroupedStructure = getGroupedStructure;
var groupBy = function (data, keyGetter, isEmptyValue) {
    if (isEmptyValue === void 0) { isEmptyValue = false; }
    var map = new Map();
    data.forEach(function (item) {
        var key = (0, exports.normalizeKeyForMap)(keyGetter(item));
        if (isEmptyValue) {
            map.set(key, []);
        }
        else {
            var collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            }
            else {
                collection.push(item);
            }
        }
    });
    return map;
};
exports.groupBy = groupBy;
var normalizeKeyForMap = function (key) {
    return key instanceof Date
        ? key.toString()
        : key instanceof Object
            ? JSON.stringify(key)
            : key;
};
exports.normalizeKeyForMap = normalizeKeyForMap;
var getGroupMark = function () { return exports.groupMark; };
exports.getGroupMark = getGroupMark;
var getGroupText = function (value, column, format, groupItems) {
    var formattedValue = format && format({ column: column, value: value, rowData: groupItems === null || groupItems === void 0 ? void 0 : groupItems[0] });
    return formattedValue != null ? formattedValue : "".concat((column && column.title ? column.title + ': ' : '')).concat(value);
};
exports.getGroupText = getGroupText;
var isMaxDeep = function (groupPanel, columns, groups) {
    var deep = groupPanel.deep || (columns === null || columns === void 0 ? void 0 : columns.length) - 1;
    return (groups === null || groups === void 0 ? void 0 : groups.length) && ((groups === null || groups === void 0 ? void 0 : groups.length) >= deep);
};
exports.isMaxDeep = isMaxDeep;
