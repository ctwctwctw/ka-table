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
var enums_1 = require("../../enums");
var CellEditorBoolean_1 = __importDefault(require("../CellEditorBoolean/CellEditorBoolean"));
var CellEditorDate_1 = __importDefault(require("../CellEditorDate/CellEditorDate"));
var CellEditorNumber_1 = __importDefault(require("../CellEditorNumber/CellEditorNumber"));
var CellEditorString_1 = __importDefault(require("../CellEditorString/CellEditorString"));
var CellEditorDataType = function (props) {
    switch (props.column.dataType) {
        case enums_1.DataType.Boolean: return react_1.default.createElement(CellEditorBoolean_1.default, __assign({}, props));
        case enums_1.DataType.Date: return react_1.default.createElement(CellEditorDate_1.default, __assign({}, props));
        case enums_1.DataType.Number: return react_1.default.createElement(CellEditorNumber_1.default, __assign({}, props));
        default: return react_1.default.createElement(CellEditorString_1.default, __assign({}, props));
    }
};
exports.default = CellEditorDataType;
