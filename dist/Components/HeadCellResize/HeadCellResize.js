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
var actionCreators_1 = require("../../actionCreators");
var defaultOptions_1 = __importDefault(require("../../defaultOptions"));
var CellResizeUtils_1 = require("../../Utils/CellResizeUtils");
var ComponentUtils_1 = require("../../Utils/ComponentUtils");
var EffectUtils_1 = require("../../Utils/EffectUtils");
var HeadCellResize = function (props) {
    var _a;
    var _b = props.column, key = _b.key, style = _b.style, colGroup = _b.colGroup, width = _b.width, dispatch = props.dispatch, childComponents = props.childComponents;
    var minWidth = (0, CellResizeUtils_1.getMinWidth)(style) || (0, CellResizeUtils_1.getMinWidth)(colGroup === null || colGroup === void 0 ? void 0 : colGroup.style);
    var currentWidth = width || (colGroup === null || colGroup === void 0 ? void 0 : colGroup.width) || ((_a = colGroup === null || colGroup === void 0 ? void 0 : colGroup.style) === null || _a === void 0 ? void 0 : _a.width) || (style === null || style === void 0 ? void 0 : style.width);
    var _c = (0, ComponentUtils_1.getElementCustomization)({
        className: defaultOptions_1.default.css.theadCellResize,
        draggable: false,
        onMouseDown: function (mouseDownEvent) {
            mouseDownEvent.preventDefault();
            var startX = mouseDownEvent.screenX - ((0, CellResizeUtils_1.isNumberWidth)(currentWidth) ? currentWidth : mouseDownEvent.currentTarget.parentElement.offsetWidth);
            var mouseMoveStop = (0, EffectUtils_1.getEventListenerEffect)('mousemove', (0, CellResizeUtils_1.getMouseMove)(currentWidth, minWidth, startX, key, dispatch));
            var mouseUpStop = (0, EffectUtils_1.getEventListenerEffect)('mouseup', function (event) {
                var newWidth = (0, CellResizeUtils_1.getValidatedWidth)(event.screenX - startX, minWidth);
                dispatch((0, actionCreators_1.resizeColumn)(key, newWidth));
                mouseUpStop();
                mouseMoveStop();
            });
        }
    }, props, childComponents.headCellResize), elementAttributes = _c.elementAttributes, content = _c.content;
    return (React.createElement("div", __assign({}, elementAttributes), content || React.createElement(React.Fragment, null, "\u00A0")));
};
exports.default = HeadCellResize;
