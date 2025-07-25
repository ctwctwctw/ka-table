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
exports.GroupedColumnsRow = void 0;
var React = __importStar(require("react"));
var GroupedColumnsUtils_1 = require("../../Utils/GroupedColumnsUtils");
var EmptyCells_1 = __importDefault(require("../EmptyCells/EmptyCells"));
var HeadCell_1 = __importDefault(require("../HeadCell/HeadCell"));
var defaultOptions_1 = __importDefault(require("../../defaultOptions"));
var GroupedColumnsRow = function (props) {
    var columns = props.columns, groupColumnsCount = props.groupColumnsCount, _a = props.groupedColumns, groupedColumns = _a === void 0 ? [] : _a, childComponents = props.childComponents;
    var rows = (0, GroupedColumnsUtils_1.getRowsWithGroupedColumns)(columns, groupedColumns);
    var columnsKeys = columns.map(function (c) { return c.key; });
    return (React.createElement(React.Fragment, null, rows.map(function (row, index) { return ((React.createElement("tr", { className: defaultOptions_1.default.css.theadRow, key: index },
        React.createElement(EmptyCells_1.default, { count: groupColumnsCount, isTh: true, childComponents: childComponents }),
        row.map(function (item, columnIndex) {
            return (React.createElement(HeadCell_1.default, __assign({}, props, { colSpan: item.colSpan, rowSpan: item.rowSpan, column: item.column, hasChildren: !columnsKeys.includes(item.column.key), isGrouped: true, key: columnIndex })));
        })))); })));
};
exports.GroupedColumnsRow = GroupedColumnsRow;
