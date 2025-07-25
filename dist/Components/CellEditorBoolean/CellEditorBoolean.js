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
var actionCreators_1 = require("../../actionCreators");
var react_1 = __importDefault(require("react"));
var defaultOptions_1 = __importDefault(require("../../defaultOptions"));
var ComponentUtils_1 = require("../../Utils/ComponentUtils");
var CommonUtils_1 = require("../../Utils/CommonUtils");
var CellEditorBoolean = function (props) {
    var column = props.column, dispatch = props.dispatch, value = props.value, rowKeyValue = props.rowKeyValue, autoFocus = props.autoFocus, childComponents = props.childComponents;
    var _a = (0, ComponentUtils_1.getElementCustomization)({
        className: "".concat(defaultOptions_1.default.css.checkbox),
        autoFocus: autoFocus,
        type: 'checkbox',
        checked: value || false,
        onChange: function (event) { return dispatch((0, actionCreators_1.updateCellValue)(rowKeyValue, column.key, event.currentTarget.checked)); },
        onBlur: function () { return dispatch((0, actionCreators_1.closeEditor)(rowKeyValue, column.key)); }
    }, props, childComponents === null || childComponents === void 0 ? void 0 : childComponents.cellEditorInput), elementAttributes = _a.elementAttributes, content = _a.content;
    return (content ||
        (react_1.default.createElement("input", __assign({ ref: function (elem) {
                elem && (elem.indeterminate = (0, CommonUtils_1.isEmpty)(value));
            } }, elementAttributes))));
};
exports.default = CellEditorBoolean;
