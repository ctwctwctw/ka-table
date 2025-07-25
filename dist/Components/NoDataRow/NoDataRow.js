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
var ComponentUtils_1 = require("../../Utils/ComponentUtils");
var NoDataRow = function (props) {
    var childComponents = props.childComponents, columns = props.columns, groupColumnsCount = props.groupColumnsCount, noData = props.noData, loading = props.loading;
    var _a = (0, ComponentUtils_1.getElementCustomization)({
        className: 'ka-tr ka-no-data-row'
    }, props, childComponents.noDataRow), elementAttributes = _a.elementAttributes, content = _a.content;
    var _b = (0, ComponentUtils_1.getElementCustomization)({
        className: 'ka-no-data-cell'
    }, props, childComponents.noDataCell), cellElementAttributes = _b.elementAttributes, cellContent = _b.content;
    return (react_1.default.createElement("tr", __assign({}, elementAttributes),
        react_1.default.createElement("td", __assign({ colSpan: columns.length + groupColumnsCount }, cellElementAttributes), content || cellContent || ((loading === null || loading === void 0 ? void 0 : loading.enabled) ? '' : noData === null || noData === void 0 ? void 0 : noData.text))));
};
exports.default = NoDataRow;
