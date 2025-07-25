"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CellComponent_1 = __importDefault(require("../CellComponent/CellComponent"));
var CollapsedIcon_1 = require("../../Icons/CollapsedIcon");
var ExpandedIcon_1 = require("../../Icons/ExpandedIcon");
var react_1 = __importDefault(require("react"));
var defaultOptions_1 = __importDefault(require("../../defaultOptions"));
var CellUtils_1 = require("../../Utils/CellUtils");
var ColumnUtils_1 = require("../../Utils/ColumnUtils");
var DataUtils_1 = require("../../Utils/DataUtils");
var actionCreators_1 = require("../../actionCreators");
var DataRowContent = function (_a) {
    var childComponents = _a.childComponents, columns = _a.columns, treeDeep = _a.treeDeep, dispatch = _a.dispatch, editingMode = _a.editingMode, format = _a.format, isDetailsRowShown = _a.isDetailsRowShown, isSelectedRow = _a.isSelectedRow, isTreeExpanded = _a.isTreeExpanded, isTreeGroup = _a.isTreeGroup, rowData = _a.rowData, rowEditableCells = _a.rowEditableCells, rowKeyField = _a.rowKeyField, rowKeyValue = _a.rowKeyValue, selectedRows = _a.selectedRows, validation = _a.validation, treeExpandButtonColumnKey = _a.treeExpandButtonColumnKey;
    var arrow = isTreeGroup
        ? (react_1.default.createElement("div", { className: 'ka-icon-tree-arrow', onClick: function () { return dispatch((0, actionCreators_1.updateTreeGroupsExpanded)(rowKeyValue)); } }, (isTreeExpanded
            ? react_1.default.createElement(ExpandedIcon_1.ExpandedIcon, { className: defaultOptions_1.default.css.iconTreeArrowExpanded })
            : react_1.default.createElement(CollapsedIcon_1.CollapsedIcon, { className: defaultOptions_1.default.css.iconTreeArrowCollapsed })))) : undefined;
    return (react_1.default.createElement(react_1.default.Fragment, null, columns.map(function (column, index) {
        var editableCell = (0, CellUtils_1.getEditableCell)(column, rowEditableCells);
        var hasEditorValue = editableCell && editableCell.hasOwnProperty('editorValue');
        var editorValue = editableCell && editableCell.editorValue;
        var value = hasEditorValue ? editorValue : (0, DataUtils_1.getValueByColumn)(rowData, column);
        var isTreeColumn = treeExpandButtonColumnKey ? treeExpandButtonColumnKey === column.key : index === 0;
        var cellDeep = treeDeep != null && isTreeColumn ? treeDeep : undefined;
        return (react_1.default.createElement(CellComponent_1.default, { treeArrowElement: isTreeColumn && arrow, childComponents: childComponents, treeDeep: cellDeep, column: column, dispatch: dispatch, editingMode: editingMode, editorValue: editorValue, field: (0, ColumnUtils_1.getField)(column), format: format, hasEditorValue: editableCell && editableCell.hasOwnProperty('editorValue'), isDetailsRowShown: isDetailsRowShown, isEditableCell: !!editableCell, isSelectedRow: isSelectedRow, key: column.key, rowData: rowData, rowKeyField: rowKeyField, rowKeyValue: rowKeyValue, selectedRows: selectedRows, validation: validation, validationMessage: editableCell && editableCell.validationMessage, value: value }));
    })));
};
exports.default = DataRowContent;
