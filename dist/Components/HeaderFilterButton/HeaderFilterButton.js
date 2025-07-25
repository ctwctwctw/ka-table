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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var FilterIcon_1 = require("../../Icons/FilterIcon");
var ComponentUtils_1 = require("../../Utils/ComponentUtils");
var actionCreators_1 = require("../../actionCreators");
var HeaderFilterButton = function (props) {
    var _a;
    var childComponents = props.childComponents, column = props.column, dispatch = props.dispatch;
    var _b = (0, ComponentUtils_1.getElementCustomization)({
        className: "ka-header-filter-button ".concat(((_a = column.headerFilterValues) === null || _a === void 0 ? void 0 : _a.length) ? 'ka-header-filter-button-has-value' : ''),
        onClick: function (event) {
            event.stopPropagation();
            dispatch((0, actionCreators_1.updateHeaderFilterPopupState)(column.key, !column.isHeaderFilterPopupShown));
        }
    }, props, childComponents === null || childComponents === void 0 ? void 0 : childComponents.headerFilterButton), elementAttributes = _b.elementAttributes, content = _b.content;
    return (React.createElement("span", __assign({}, elementAttributes), content || (React.createElement(FilterIcon_1.FilterIcon, { className: 'ka-icon ka-icon-filter ka-pointer ka-header-filter-button-icon' }))));
};
exports.default = HeaderFilterButton;
