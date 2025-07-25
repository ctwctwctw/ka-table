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
var React = __importStar(require("react"));
var ComponentUtils_1 = require("../../Utils/ComponentUtils");
var HeadCellContent_1 = __importDefault(require("../HeadCellContent/HeadCellContent"));
var HeadCellResize_1 = __importDefault(require("../HeadCellResize/HeadCellResize"));
var defaultOptions_1 = __importDefault(require("../../defaultOptions"));
var PropsUtils_1 = require("../../Utils/PropsUtils");
var HeadRowUtils_1 = require("../../Utils/HeadRowUtils");
var CellResizeUtils_1 = require("../../Utils/CellResizeUtils");
var actionCreators_1 = require("../../actionCreators");
var HeadCell = function (props) {
    var childComponents = props.childComponents, colSpan = props.colSpan, column = props.column, _a = props.column, style = _a.style, isResizable = _a.isResizable, key = _a.key, columnReordering = props.columnReordering, columnResizing = props.columnResizing, dispatch = props.dispatch, groupPanel = props.groupPanel, hasChildren = props.hasChildren, isGrouped = props.isGrouped, rowSpan = props.rowSpan, sortingMode = props.sortingMode;
    var headCell = props.childComponents.headCell;
    if ((columnReordering || (groupPanel === null || groupPanel === void 0 ? void 0 : groupPanel.enabled)) && column.isDraggable !== false && !hasChildren) {
        var reorderedRowProps = (0, PropsUtils_1.getDraggableProps)({
            key: key,
            dispatch: dispatch,
            actionCreator: actionCreators_1.reorderColumns,
            draggedClass: defaultOptions_1.default.css.draggedColumn,
            dragOverClass: defaultOptions_1.default.css.dragOverColumn,
            hasReordering: !!columnReordering
        });
        headCell = (0, ComponentUtils_1.addElementAttributes)(reorderedRowProps, props, headCell);
    }
    var _b = (0, ComponentUtils_1.getElementCustomization)({
        className: (0, HeadRowUtils_1.getHeadCellClassName)(sortingMode, isGrouped),
        colSpan: colSpan,
        rowSpan: rowSpan,
        scope: 'col',
        style: style,
        id: key,
    }, props, headCell), elementAttributes = _b.elementAttributes, content = _b.content;
    return (React.createElement("th", __assign({}, elementAttributes),
        React.createElement("div", { className: defaultOptions_1.default.css.theadCellWrapper },
            React.createElement("div", { className: defaultOptions_1.default.css.theadCellContentWrapper }, content || React.createElement(HeadCellContent_1.default, __assign({}, props))),
            (0, CellResizeUtils_1.isCellResizeShown)(isResizable, columnResizing) && !hasChildren && (React.createElement(HeadCellResize_1.default, { column: column, dispatch: dispatch, childComponents: childComponents })))));
};
exports.default = HeadCell;
