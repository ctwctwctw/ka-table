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
exports.getDraggableProps = exports.groupPanelOnDrop = exports.prepareTableOptions = exports.getPagesCountByProps = exports.getSortedColumns = exports.getSelectedData = exports.isValid = exports.getData = exports.areAllVisibleRowsSelected = exports.areAllFilteredRowsSelected = exports.getFilteredData = void 0;
exports.extendProps = extendProps;
exports.mergeProps = mergeProps;
var PagingUtils_1 = require("./PagingUtils");
var SortUtils_1 = require("./SortUtils");
var enums_1 = require("../enums");
var FilterUtils_1 = require("./FilterUtils");
var GroupUtils_1 = require("./GroupUtils");
var TreeUtils_1 = require("./TreeUtils");
var ReducerUtils_1 = require("./ReducerUtils");
var DataUtils_1 = require("./DataUtils");
var actionCreators_1 = require("../actionCreators");
function extendProps(childElementAttributes, childProps, childComponent) {
    var resultProps = childElementAttributes;
    var childCustomAttributes = childComponent && childComponent.elementAttributes && childComponent.elementAttributes(childProps);
    if (childCustomAttributes) {
        var dispatch = childProps.dispatch;
        resultProps = mergeProps(childElementAttributes, childProps, childCustomAttributes, dispatch);
    }
    return resultProps;
}
;
var emptyFunc = function () { };
function mergeProps(childElementAttributes, childProps, childCustomAttributes, dispatch) {
    var customPropsWithEvents = {};
    var _loop_1 = function (prop) {
        if (childCustomAttributes.hasOwnProperty(prop)) {
            var propName = prop;
            var propValue_1 = childCustomAttributes[propName];
            var baseFunc_1 = childElementAttributes[propName] || emptyFunc;
            if (typeof propValue_1 === 'function') {
                customPropsWithEvents[prop] = function (e) {
                    propValue_1(e, {
                        baseFunc: baseFunc_1,
                        childElementAttributes: childElementAttributes,
                        childProps: childProps,
                        dispatch: dispatch,
                    });
                };
            }
        }
    };
    for (var prop in childCustomAttributes) {
        _loop_1(prop);
    }
    var mergedResult = __assign(__assign(__assign(__assign({}, childElementAttributes), childCustomAttributes), customPropsWithEvents), { className: "".concat(childElementAttributes.className || '', " ").concat(childCustomAttributes.className || ''), style: __assign(__assign({}, childElementAttributes.style), childCustomAttributes.style) });
    return mergedResult;
}
;
var getFilteredData = function (props) {
    return (0, FilterUtils_1.filterAndSearchData)(props);
};
exports.getFilteredData = getFilteredData;
var areAllFilteredRowsSelected = function (props) {
    var _a = props.selectedRows, selectedRows = _a === void 0 ? [] : _a, rowKeyField = props.rowKeyField;
    return (0, FilterUtils_1.filterAndSearchData)(props).every(function (d) { return selectedRows.includes((0, DataUtils_1.getValueByField)(d, rowKeyField)); });
};
exports.areAllFilteredRowsSelected = areAllFilteredRowsSelected;
var areAllVisibleRowsSelected = function (props) {
    var _a = props.selectedRows, selectedRows = _a === void 0 ? [] : _a, rowKeyField = props.rowKeyField;
    return (0, exports.getData)(props).every(function (d) { return selectedRows.includes((0, DataUtils_1.getValueByField)(d, rowKeyField)); });
};
exports.areAllVisibleRowsSelected = areAllVisibleRowsSelected;
var getDataWithoutPaging = function (props) {
    var columns = props.columns, groups = props.groups, groupsExpanded = props.groupsExpanded, treeGroupKeyField = props.treeGroupKeyField, treeGroupsExpanded = props.treeGroupsExpanded, extendedSort = props.extendedSort, rowKeyField = props.rowKeyField, sort = props.sort, _a = props.sortingMode, sortingMode = _a === void 0 ? enums_1.SortingMode.None : _a;
    var _b = props.data, data = _b === void 0 ? [] : _b;
    var resultData = __spreadArray([], data, true);
    resultData = (0, FilterUtils_1.filterAndSearchData)(props);
    if (!(0, SortUtils_1.isRemoteSorting)(sortingMode)) {
        resultData = (0, SortUtils_1.sortData)(columns, resultData, sort);
    }
    resultData = extendedSort ? extendedSort(resultData, columns) : resultData;
    var groupedColumns = groups ? columns.filter(function (c) { return groups.some(function (g) { return g.columnKey === c.key; }); }) : [];
    resultData = groups ? (0, GroupUtils_1.getGroupedData)(resultData, groups, groupedColumns, groupsExpanded) : resultData;
    resultData = treeGroupKeyField ? (0, TreeUtils_1.getTreeData)({ data: resultData, rowKeyField: rowKeyField, treeGroupKeyField: treeGroupKeyField, treeGroupsExpanded: treeGroupsExpanded, originalData: data }) : resultData;
    return resultData;
};
var getData = function (props) {
    var paging = props.paging;
    var resultData = getDataWithoutPaging(props);
    resultData = (0, PagingUtils_1.getPageData)(resultData, paging);
    return resultData;
};
exports.getData = getData;
var isValid = function (props) {
    return (!props.validation || !(0, ReducerUtils_1.getValidatedEditableCells)(props).some(function (cell) { return cell.validationMessage; }));
};
exports.isValid = isValid;
var getSelectedData = function (_a) {
    var data = _a.data, selectedRows = _a.selectedRows, rowKeyField = _a.rowKeyField;
    return data ? data.filter(function (d) {
        var value = (0, DataUtils_1.getValueByField)(d, rowKeyField);
        return selectedRows === null || selectedRows === void 0 ? void 0 : selectedRows.some(function (v) { return v === value; });
    }) : [];
};
exports.getSelectedData = getSelectedData;
var getSortedColumns = function (props) {
    return (0, SortUtils_1.sortColumns)(props.columns);
};
exports.getSortedColumns = getSortedColumns;
var getPagesCountByProps = function (props) {
    var paging = props.paging;
    var pagesCount = 1;
    if (paging && paging.enabled) {
        var data = getDataWithoutPaging(props);
        pagesCount = (0, PagingUtils_1.getPagesCount)(data, paging);
    }
    return pagesCount;
};
exports.getPagesCountByProps = getPagesCountByProps;
var prepareTableOptions = function (props) {
    var groups = props.groups;
    var columns = props.columns;
    var groupedData = (0, exports.getData)(props);
    var groupColumnsCount = 0;
    var groupedColumns = [];
    if (groups) {
        groupColumnsCount = groups.length;
        groupedColumns = columns.filter(function (c) { return groups.some(function (g) { return g.columnKey === c.key; }); });
        columns = columns.filter(function (c) { return !groups.some(function (g) { return g.columnKey === c.key; }); });
    }
    columns = columns.filter(function (c) { return c.visible !== false; });
    return {
        columns: columns,
        groupColumnsCount: groupColumnsCount,
        groupedColumns: groupedColumns,
        groupedData: groupedData
    };
};
exports.prepareTableOptions = prepareTableOptions;
var groupPanelOnDrop = function (event, dispatch) {
    var _a;
    var draggableKeyValueData = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData('ka-draggableKeyValue');
    if (draggableKeyValueData) {
        var draggableKeyValue = JSON.parse(draggableKeyValueData);
        dispatch((0, actionCreators_1.groupColumn)(draggableKeyValue));
    }
};
exports.groupPanelOnDrop = groupPanelOnDrop;
var getDraggableProps = function (_a) {
    var key = _a.key, dispatch = _a.dispatch, actionCreator = _a.actionCreator, draggedClass = _a.draggedClass, dragOverClass = _a.dragOverClass, hasReordering = _a.hasReordering;
    var count = 0;
    var reorderingProps = hasReordering ? {
        onDragEnter: function (event) {
            count++;
            if (!event.currentTarget.classList.contains(dragOverClass)) {
                event.currentTarget.classList.add(dragOverClass);
            }
            event.preventDefault();
        },
        onDragLeave: function (event) {
            count--;
            if (count === 0) {
                event.currentTarget.classList.remove(dragOverClass);
            }
        },
        onDragOver: function (event) {
            if (!event.currentTarget.classList.contains(dragOverClass)) {
                event.currentTarget.classList.add(dragOverClass);
            }
            event.preventDefault();
        }
    } : {};
    return __assign({ draggable: true, onDragStart: function (event) {
            count = 0;
            event.dataTransfer.setData('ka-draggableKeyValue', JSON.stringify(key));
            event.currentTarget.classList.add(draggedClass);
            event.dataTransfer.effectAllowed = 'move';
        }, onDragEnd: function (event) {
            event.currentTarget.classList.remove(draggedClass);
        }, onDrop: function (event) {
            event.currentTarget.classList.remove(dragOverClass);
            var keyDataTransfer = event.dataTransfer.getData('ka-draggableKeyValue');
            if (hasReordering && keyDataTransfer) {
                var draggableKeyValue = JSON.parse(keyDataTransfer);
                dispatch(actionCreator(draggableKeyValue, key));
            }
        } }, reorderingProps);
};
exports.getDraggableProps = getDraggableProps;
