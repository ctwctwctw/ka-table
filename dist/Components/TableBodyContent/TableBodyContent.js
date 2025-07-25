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
var react_1 = __importDefault(require("react"));
var CellUtils_1 = require("../../Utils/CellUtils");
var NewRow_1 = __importDefault(require("../NewRow/NewRow"));
var NoDataRow_1 = __importDefault(require("../NoDataRow/NoDataRow"));
var VirtualizedRows_1 = __importDefault(require("../VirtualizedRows/VirtualizedRows"));
var TableBodyContent = function (props) {
    var childComponents = props.childComponents, columns = props.columns, data = props.data, dispatch = props.dispatch, editableCells = props.editableCells, format = props.format, groupColumnsCount = props.groupColumnsCount, rowKeyField = props.rowKeyField, validation = props.validation;
    var newRowEditableCells = (0, CellUtils_1.getNewRowEditableCells)(editableCells);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        !!(newRowEditableCells === null || newRowEditableCells === void 0 ? void 0 : newRowEditableCells.length) && (react_1.default.createElement(NewRow_1.default, { childComponents: childComponents, columns: columns, dispatch: dispatch, editableCells: newRowEditableCells, format: format, groupColumnsCount: groupColumnsCount, rowKeyField: rowKeyField, validation: validation })),
        !data.length
            ? react_1.default.createElement(NoDataRow_1.default, __assign({}, props))
            : react_1.default.createElement(VirtualizedRows_1.default, __assign({}, props))));
};
exports.default = TableBodyContent;
