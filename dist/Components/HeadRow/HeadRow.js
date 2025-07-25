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
var EmptyCells_1 = __importDefault(require("../EmptyCells/EmptyCells"));
var HeadCell_1 = __importDefault(require("../HeadCell/HeadCell"));
var react_1 = __importDefault(require("react"));
var defaultOptions_1 = __importDefault(require("../../defaultOptions"));
var ComponentUtils_1 = require("../../Utils/ComponentUtils");
var HeadRow = function (props) {
    var areAllRowsSelected = props.areAllRowsSelected, childComponents = props.childComponents, columnReordering = props.columnReordering, columnResizing = props.columnResizing, columns = props.columns, dispatch = props.dispatch, filteringMode = props.filteringMode, groupColumnsCount = props.groupColumnsCount, groupPanel = props.groupPanel, sortingMode = props.sortingMode;
    var _a = (0, ComponentUtils_1.getElementCustomization)({
        className: defaultOptions_1.default.css.theadRow
    }, props, childComponents.headRow), elementAttributes = _a.elementAttributes, content = _a.content;
    return (react_1.default.createElement("tr", __assign({}, elementAttributes), content ||
        (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(EmptyCells_1.default, { count: groupColumnsCount, isTh: true, dispatch: dispatch, childComponents: childComponents }),
            columns.map(function (column) {
                return (react_1.default.createElement(HeadCell_1.default, { areAllRowsSelected: areAllRowsSelected, childComponents: childComponents, columnReordering: columnReordering, columnResizing: columnResizing, column: column, dispatch: dispatch, filteringMode: filteringMode, groupPanel: groupPanel, key: column.key, sortingMode: sortingMode }));
            })))));
};
exports.default = HeadRow;
