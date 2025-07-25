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
exports.TableHead = void 0;
var React = __importStar(require("react"));
var FilterRow_1 = __importDefault(require("../FilterRow/FilterRow"));
var enums_1 = require("../../enums");
var GroupedColumnsRow_1 = require("../GroupedColumnsRow/GroupedColumnsRow");
var HeadRow_1 = __importDefault(require("../HeadRow/HeadRow"));
var defaultOptions_1 = __importDefault(require("../../defaultOptions"));
var ComponentUtils_1 = require("../../Utils/ComponentUtils");
var TableHead = function (props) {
    var areAllRowsSelected = props.areAllRowsSelected, childComponents = props.childComponents, columnReordering = props.columnReordering, columnResizing = props.columnResizing, columns = props.columns, dispatch = props.dispatch, filteringMode = props.filteringMode, groupColumnsCount = props.groupColumnsCount, groupPanel = props.groupPanel, sortingMode = props.sortingMode, _a = props.groupedColumns, groupedColumns = _a === void 0 ? [] : _a;
    var _b = (0, ComponentUtils_1.getElementCustomization)({
        className: defaultOptions_1.default.css.thead,
    }, props, childComponents.tableHead), elementAttributes = _b.elementAttributes, content = _b.content;
    return (React.createElement("thead", __assign({}, elementAttributes), content || (React.createElement(React.Fragment, null,
        groupedColumns.length ? React.createElement(GroupedColumnsRow_1.GroupedColumnsRow, __assign({}, props)) : (React.createElement(HeadRow_1.default, { areAllRowsSelected: areAllRowsSelected, childComponents: childComponents, columnReordering: columnReordering, columnResizing: columnResizing, columns: columns, dispatch: dispatch, groupColumnsCount: groupColumnsCount, groupPanel: groupPanel, sortingMode: sortingMode, filteringMode: filteringMode })),
        (filteringMode === enums_1.FilteringMode.FilterRow || filteringMode === enums_1.FilteringMode.FilterRowAndHeaderFilter) &&
            (React.createElement(FilterRow_1.default, __assign({}, props, { dispatch: dispatch })))))));
};
exports.TableHead = TableHead;
