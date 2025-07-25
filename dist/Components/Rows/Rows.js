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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var DataUtils_1 = require("../../Utils/DataUtils");
var GroupUtils_1 = require("../../Utils/GroupUtils");
var TreeUtils_1 = require("../../Utils/TreeUtils");
var DataAndDetailsRows_1 = __importDefault(require("../DataAndDetailsRows/DataAndDetailsRows"));
var GroupRow_1 = __importDefault(require("../GroupRow/GroupRow"));
var GroupSummaryRow_1 = require("../GroupSummaryRow/GroupSummaryRow");
var FilterUtils_1 = require("../../Utils/FilterUtils");
var Rows = function (props) {
    var childComponents = props.childComponents, columns = props.columns, data = props.data, _a = props.detailsRows, detailsRows = _a === void 0 ? [] : _a, dispatch = props.dispatch, editableCells = props.editableCells, format = props.format, groupedColumns = props.groupedColumns, _b = props.groups, groups = _b === void 0 ? [] : _b, _c = props.groupsExpanded, groupsExpanded = _c === void 0 ? [] : _c, isFirstRowOdd = props.isFirstRowOdd, onFirstRowRendered = props.onFirstRowRendered, treeGroupsExpanded = props.treeGroupsExpanded, rowKeyField = props.rowKeyField, rowReordering = props.rowReordering, selectedRows = props.selectedRows, validation = props.validation, treeExpandButtonColumnKey = props.treeExpandButtonColumnKey, oddEvenRows = props.oddEvenRows;
    var groupMark = (0, GroupUtils_1.getGroupMark)();
    var firstRowRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        onFirstRowRendered(firstRowRef);
    }, [firstRowRef, onFirstRowRendered]);
    var rowRefLink = firstRowRef;
    return (react_1.default.createElement(react_1.default.Fragment, null, data.map(function (d, index) {
        if (d.groupMark === groupMark) {
            var groupIndex = d.key.length - 1;
            var group_1 = groups && groups[groupIndex];
            var column = group_1 && groupedColumns.find(function (c) { return c.key === group_1.columnKey; });
            return (react_1.default.createElement(GroupRow_1.default, { childComponents: childComponents, column: column, contentColSpan: columns.length - groupIndex + groups.length, dispatch: dispatch, groupIndex: groupIndex, groupKey: d.key, groupItems: d.groupItems, columns: columns, groupedColumns: groupedColumns, isExpanded: groupsExpanded.some(function (ge) { return JSON.stringify(ge) === JSON.stringify(d.key); }), text: (0, GroupUtils_1.getGroupText)(d.value, column, format, d.groupItems), key: JSON.stringify(d.key) }));
        }
        else if (d.groupSummaryMark === GroupUtils_1.groupSummaryMark) {
            return react_1.default.createElement(GroupSummaryRow_1.GroupSummaryRow, __assign({}, props, { groupData: d.groupData, key: d.key, groupIndex: d.groupIndex }));
        }
        else {
            var isTreeGroup = d.treeGroupMark === TreeUtils_1.treeGroupMark;
            var isTreeData = d.treeDataMark === TreeUtils_1.treeDataMark;
            var isTreeRow = isTreeGroup || isTreeData;
            var rowData = isTreeRow ? d.rowData : d;
            var rowKeyValue_1 = (0, DataUtils_1.getValueByField)(rowData, rowKeyField);
            var isTreeExpanded = isTreeGroup && (!treeGroupsExpanded || treeGroupsExpanded.includes(rowKeyValue_1));
            var isSelectedRow = selectedRows.some(function (s) { return s === rowKeyValue_1; });
            var isDetailsRowShown = detailsRows.some(function (r) { return r === rowKeyValue_1; });
            var rowEditableCells = (0, FilterUtils_1.getRowEditableCells)(rowKeyValue_1, editableCells);
            var isOdd = oddEvenRows
                ? isFirstRowOdd ? (0, DataUtils_1.checkIndexOdd)(index) : !(0, DataUtils_1.checkIndexOdd)(index)
                : undefined;
            var dataRow = (react_1.default.createElement(DataAndDetailsRows_1.default, { isOdd: isOdd, childComponents: props.childComponents, columns: props.columns, dispatch: dispatch, editableCells: props.editableCells, editingMode: props.editingMode, isTreeGroup: isTreeGroup, isTreeExpanded: isTreeExpanded, treeDeep: isTreeRow === true ? d.treeDeep : undefined, treeExpandButtonColumnKey: treeExpandButtonColumnKey, format: format, groupColumnsCount: props.groupColumnsCount, isDetailsRowShown: isDetailsRowShown, isSelectedRow: isSelectedRow, key: rowKeyValue_1, rowData: rowData, rowEditableCells: rowEditableCells, rowKeyField: props.rowKeyField, rowKeyValue: rowKeyValue_1, rowReordering: rowReordering, selectedRows: props.selectedRows, trRef: rowRefLink, validation: validation }));
            rowRefLink = undefined;
            return dataRow;
        }
    })));
};
exports.default = Rows;
