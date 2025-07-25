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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var HeaderFilterPopupContent_1 = __importDefault(require("../HeaderFilterPopupContent/HeaderFilterPopupContent"));
var ComponentUtils_1 = require("../../Utils/ComponentUtils");
var actionCreators_1 = require("../../actionCreators");
var UseOuterClick_1 = require("../../hooks/UseOuterClick");
var HeaderFilterPopup = function (props) {
    var _a, _b;
    var column = props.column, dispatch = props.dispatch, childComponents = props.childComponents;
    var refToElement = (0, UseOuterClick_1.useOuterClick)(function () {
        dispatch((0, actionCreators_1.updateHeaderFilterPopupState)(column.key, !column.isHeaderFilterPopupShown));
    });
    var _c = (0, ComponentUtils_1.getElementCustomization)({
        className: 'ka-popup-content'
    }, props, childComponents === null || childComponents === void 0 ? void 0 : childComponents.headerFilterPopupContent), elementAttributes = _c.elementAttributes, content = _c.content;
    return (React.createElement("div", { className: 'ka-popup', ref: refToElement, style: {
            left: (_a = column.headerFilterPopupPosition) === null || _a === void 0 ? void 0 : _a.x,
            top: (_b = column.headerFilterPopupPosition) === null || _b === void 0 ? void 0 : _b.y,
        } },
        React.createElement("div", __assign({}, elementAttributes), content || React.createElement(HeaderFilterPopupContent_1.default, __assign({}, props)))));
};
exports.default = HeaderFilterPopup;
