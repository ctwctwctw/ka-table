"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DataRow_1 = __importDefault(require("../DataRow/DataRow"));
var enums_1 = require("../../enums");
var react_1 = __importDefault(require("react"));
var CellUtils_1 = require("../../Utils/CellUtils");
var const_1 = require("../../const");
var NewRow = function (_a) {
    var childComponents = _a.childComponents, columns = _a.columns, dispatch = _a.dispatch, editableCells = _a.editableCells, format = _a.format, groupColumnsCount = _a.groupColumnsCount, rowKeyField = _a.rowKeyField, validation = _a.validation;
    return (react_1.default.createElement(DataRow_1.default, { childComponents: childComponents, columns: columns, dispatch: dispatch, format: format, editableCells: editableCells, editingMode: enums_1.EditingMode.None, groupColumnsCount: groupColumnsCount, isDetailsRowShown: false, isSelectedRow: false, rowData: (0, CellUtils_1.getNewRowDataFromEditableCells)(editableCells, columns), rowKeyField: rowKeyField, rowKeyValue: const_1.newRowId, rowReordering: false, validation: validation, selectedRows: [], rowEditableCells: editableCells }));
};
exports.default = NewRow;
