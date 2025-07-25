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
var FilterRowBoolean_1 = __importDefault(require("../FilterRowBoolean/FilterRowBoolean"));
var FilterRowDate_1 = __importDefault(require("../FilterRowDate/FilterRowDate"));
var FilterRowNumber_1 = __importDefault(require("../FilterRowNumber/FilterRowNumber"));
var FilterRowString_1 = __importDefault(require("../FilterRowString/FilterRowString"));
var FilterRowDataType = function (props) {
    switch (props.column.dataType) {
        case enums_1.DataType.Boolean: return react_1.default.createElement(FilterRowBoolean_1.default, __assign({}, props));
        case enums_1.DataType.Date: return react_1.default.createElement(FilterRowDate_1.default, __assign({}, props));
        case enums_1.DataType.Number: return react_1.default.createElement(FilterRowNumber_1.default, __assign({}, props));
        default: return react_1.default.createElement(FilterRowString_1.default, __assign({}, props));
    }
};
exports.default = FilterRowDataType;
