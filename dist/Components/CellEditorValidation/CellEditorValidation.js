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
var defaultOptions_1 = __importDefault(require("../../defaultOptions"));
var CellEditorDataType_1 = __importDefault(require("../CellEditorDataType/CellEditorDataType"));
var CellEditorValidationMessage_1 = __importDefault(require("../CellEditorValidationMessage/CellEditorValidationMessage"));
var CellEditorValidation = function (props) {
    var validationMessage = props.validationMessage;
    return (react_1.default.createElement("div", { className: "".concat(validationMessage ? defaultOptions_1.default.css.kaCellEditorValidationError : '') },
        react_1.default.createElement(CellEditorDataType_1.default, __assign({}, props)),
        validationMessage && react_1.default.createElement(CellEditorValidationMessage_1.default, { message: validationMessage })));
};
exports.default = CellEditorValidation;
