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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var PagingUtils_1 = require("../../Utils/PagingUtils");
var PagingIndex_1 = __importDefault(require("../PagingIndex/PagingIndex"));
var defaultOptions_1 = __importDefault(require("../../defaultOptions"));
var ComponentUtils_1 = require("../../Utils/ComponentUtils");
var actionCreators_1 = require("../../actionCreators");
var PagingPages = function (props) {
    var childComponents = props.childComponents, dispatch = props.dispatch, pagesCount = props.pagesCount, _a = props.pageIndex, pageIndex = _a === void 0 ? 0 : _a;
    var pages = (0, PagingUtils_1.getPagesArrayBySize)(pagesCount);
    React.useEffect(function () {
        if (pageIndex !== 0 && pageIndex >= pages.length) {
            dispatch((0, actionCreators_1.updatePageIndex)(0));
        }
    }, [dispatch, pageIndex, pages]);
    var isEndShown = pageIndex < pages.length - PagingUtils_1.centerLength && pages.length > PagingUtils_1.centerLength + Math.ceil(PagingUtils_1.centerLength / 2);
    var isStartShown = pageIndex >= PagingUtils_1.centerLength && pages.length > PagingUtils_1.centerLength + Math.ceil(PagingUtils_1.centerLength / 2);
    var centerPages = (0, PagingUtils_1.getPagesForCenter)(pages, isStartShown, isEndShown, pageIndex);
    var _b = (0, ComponentUtils_1.getElementCustomization)({
        className: defaultOptions_1.default.css.pagingPages
    }, props, childComponents.pagingPages), elementAttributes = _b.elementAttributes, content = _b.content;
    return (React.createElement("ul", __assign({}, elementAttributes), content || (React.createElement(React.Fragment, null,
        isStartShown &&
            (React.createElement(React.Fragment, null,
                React.createElement(PagingIndex_1.default, __assign({}, props, { pageIndex: 0, isActive: pageIndex === 0, text: 1 })),
                React.createElement(PagingIndex_1.default, __assign({}, props, { pageIndex: centerPages[0] - 1, isActive: false, text: '...' })))),
        centerPages.map(function (value, index) {
            return (React.createElement(PagingIndex_1.default, __assign({}, props, { pageIndex: value, isActive: pageIndex === value, key: value, text: value + 1 })));
        }),
        isEndShown &&
            (React.createElement(React.Fragment, null,
                React.createElement(PagingIndex_1.default, __assign({}, props, { pageIndex: __spreadArray([], centerPages, true).pop() + 1, isActive: false, text: '...' })),
                React.createElement(PagingIndex_1.default, __assign({}, props, { pageIndex: pages[pages.length - 1], isActive: pageIndex === pages[pages.length - 1], text: pages[pages.length - 1] + 1 }))))))));
};
exports.default = PagingPages;
