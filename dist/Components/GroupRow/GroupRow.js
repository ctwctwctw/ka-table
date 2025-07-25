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
var GroupRowContent_1 = __importDefault(require("../GroupRowContent/GroupRowContent"));
var GroupRow = function (props) {
    var childComponents = props.childComponents;
    var _a = (0, ComponentUtils_1.getElementCustomization)({
        className: defaultOptions_1.default.css.groupRow
    }, props, childComponents.groupRow), elementAttributes = _a.elementAttributes, content = _a.content;
    return (react_1.default.createElement("tr", __assign({}, elementAttributes), content ? content : react_1.default.createElement(GroupRowContent_1.default, __assign({}, props))));
};
exports.default = GroupRow;
