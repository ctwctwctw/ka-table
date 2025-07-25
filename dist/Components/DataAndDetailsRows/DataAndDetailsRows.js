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
var DataRow_1 = __importDefault(require("../DataRow/DataRow"));
var DetailsRow_1 = __importDefault(require("../DetailsRow/DetailsRow"));
var DataAndDetailsRows = function (props) {
    var isDetailsRowShown = props.isDetailsRowShown;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(DataRow_1.default, __assign({}, props)),
        isDetailsRowShown && react_1.default.createElement(DetailsRow_1.default, __assign({}, props))));
};
exports.default = DataAndDetailsRows;
