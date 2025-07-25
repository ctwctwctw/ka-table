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
var ComponentUtils_1 = require("../../Utils/ComponentUtils");
var CommonUtils_1 = require("../../Utils/CommonUtils");
var actionCreators_1 = require("../../actionCreators");
var FilterRowBoolean = function (props) {
    var column = props.column, dispatch = props.dispatch, childComponents = props.childComponents;
    var value = column.filterRowValue;
    var _a = (0, ComponentUtils_1.getElementCustomization)({
        className: defaultOptions_1.default.css.checkbox,
        type: 'checkbox',
        checked: value || false,
        onChange: function (event) {
            var filterRowValue = event.currentTarget.checked;
            if (value === false) {
                if (filterRowValue === true) {
                    filterRowValue = undefined;
                }
            }
            dispatch((0, actionCreators_1.updateFilterRowValue)(column.key, filterRowValue));
        }
    }, props, childComponents === null || childComponents === void 0 ? void 0 : childComponents.filterRowCellInput), elementAttributes = _a.elementAttributes, content = _a.content;
    return (content || (react_1.default.createElement("input", __assign({ ref: function (elem) {
            elem && (elem.indeterminate = (0, CommonUtils_1.isEmpty)(value));
        } }, elementAttributes))));
};
exports.default = FilterRowBoolean;
