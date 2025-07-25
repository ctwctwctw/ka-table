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
exports.TableWrapper = void 0;
var React = __importStar(require("react"));
var enums_1 = require("../../enums");
var ColGroup_1 = require("../ColGroup/ColGroup");
var TableBody_1 = __importDefault(require("../TableBody/TableBody"));
var TableFoot_1 = require("../TableFoot/TableFoot");
var TableHead_1 = require("../TableHead/TableHead");
var defaultOptions_1 = __importDefault(require("../../defaultOptions"));
var ComponentUtils_1 = require("../../Utils/ComponentUtils");
var GroupUtils_1 = require("../../Utils/GroupUtils");
var Virtualize_1 = require("../../Utils/Virtualize");
var PropsUtils_1 = require("../../Utils/PropsUtils");
var TableWrapper = function (props) {
    var _a = props.childComponents, childComponents = _a === void 0 ? {} : _a, columnReordering = props.columnReordering, groupPanel = props.groupPanel, columnResizing = props.columnResizing, _b = props.data, data = _b === void 0 ? [] : _b, dispatch = props.dispatch, _c = props.editableCells, editableCells = _c === void 0 ? [] : _c, _d = props.editingMode, editingMode = _d === void 0 ? enums_1.EditingMode.None : _d, _e = props.filteringMode, filteringMode = _e === void 0 ? enums_1.FilteringMode.None : _e, groups = props.groups, _f = props.rowReordering, rowReordering = _f === void 0 ? false : _f, _g = props.selectedRows, selectedRows = _g === void 0 ? [] : _g, _h = props.sortingMode, sortingMode = _h === void 0 ? enums_1.SortingMode.None : _h, virtualScrolling = props.virtualScrolling, noData = props.noData;
    var groupsExpanded = props.groupsExpanded;
    var preparedOptions = (0, PropsUtils_1.prepareTableOptions)(props);
    if (groups && !groupsExpanded) {
        groupsExpanded = (0, GroupUtils_1.getExpandedGroups)(preparedOptions.groupedData);
    }
    var areAllRowsSelected = data.length === selectedRows.length;
    var tableWrapper = (0, ComponentUtils_1.getElementCustomization)({
        className: defaultOptions_1.default.css.tableWrapper,
        onScroll: (0, Virtualize_1.isVirtualScrollingEnabled)(virtualScrolling) ? function (event) {
            dispatch({
                scrollTop: event.currentTarget.scrollTop,
                type: enums_1.ActionType.ScrollTable,
            });
        } : undefined,
    }, props, childComponents.tableWrapper);
    var _j = (0, ComponentUtils_1.getElementCustomization)({
        className: defaultOptions_1.default.css.table,
    }, props, childComponents.table), elementAttributes = _j.elementAttributes, content = _j.content;
    return (React.createElement("div", __assign({}, tableWrapper.elementAttributes), content || tableWrapper.content || (React.createElement("table", __assign({}, elementAttributes),
        React.createElement(ColGroup_1.ColGroup, { columns: preparedOptions.columns, groupColumnsCount: preparedOptions.groupColumnsCount }),
        (!(noData === null || noData === void 0 ? void 0 : noData.hideHeader) || !!data.length) && React.createElement(TableHead_1.TableHead, __assign({}, props, { areAllRowsSelected: areAllRowsSelected, childComponents: childComponents, columnReordering: columnReordering, columnResizing: columnResizing, columns: preparedOptions.columns, dispatch: dispatch, filteringMode: filteringMode, groupColumnsCount: preparedOptions.groupColumnsCount, groupPanel: groupPanel, sortingMode: sortingMode })),
        React.createElement(TableBody_1.default, __assign({}, props, { childComponents: childComponents, columns: preparedOptions.columns, data: preparedOptions.groupedData, editableCells: editableCells, editingMode: editingMode, groupColumnsCount: preparedOptions.groupColumnsCount, groupedColumns: preparedOptions.groupedColumns, groupsExpanded: groupsExpanded, rowReordering: rowReordering, selectedRows: selectedRows })),
        (childComponents.tableFoot || childComponents.summaryRow || childComponents.summaryCell) && (React.createElement(TableFoot_1.TableFoot, __assign({}, props, { data: data, columns: preparedOptions.columns, groupColumnsCount: preparedOptions.groupColumnsCount })))))));
};
exports.TableWrapper = TableWrapper;
