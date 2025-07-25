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
var EmptyCells_1 = __importDefault(require("../EmptyCells/EmptyCells"));
var react_1 = __importDefault(require("react"));
var defaultOptions_1 = __importDefault(require("../../defaultOptions"));
var ComponentUtils_1 = require("../../Utils/ComponentUtils");
var DetailsRow = function (props) {
    var groupColumnsCount = props.groupColumnsCount, childComponents = props.childComponents, columns = props.columns;
    var _a = (0, ComponentUtils_1.getElementCustomization)({
        className: "".concat(defaultOptions_1.default.css.detailsRow),
    }, props, childComponents.detailsRow), elementAttributes = _a.elementAttributes, content = _a.content;
    var _b = (0, ComponentUtils_1.getElementCustomization)({
        className: "".concat(defaultOptions_1.default.css.detailsCell, " ").concat(defaultOptions_1.default.css.cell),
    }, props, childComponents.detailsCell), cellElementAttributes = _b.elementAttributes, cellContent = _b.content;
    var renderContent = (cellContent || content);
    return (react_1.default.createElement("tr", __assign({}, elementAttributes),
        react_1.default.createElement(EmptyCells_1.default, { count: groupColumnsCount, childComponents: childComponents }),
        renderContent
            && react_1.default.createElement("td", __assign({ colSpan: columns.length }, cellElementAttributes), renderContent)));
};
exports.default = DetailsRow;
