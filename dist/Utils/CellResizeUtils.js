"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMinWidth = exports.isNumberWidth = exports.getValidatedWidth = exports.getMouseMove = exports.isCellResizeShown = void 0;
var actionCreators_1 = require("../actionCreators");
var isCellResizeShown = function (isResizable, columnResizing) { return !!((isResizable !== false) && (columnResizing || isResizable)); };
exports.isCellResizeShown = isCellResizeShown;
var getMouseMove = function (currentWidth, minWidth, startX, key, dispatch) { return function (event) {
    var newWidth = event.screenX - startX;
    if (newWidth !== currentWidth) {
        newWidth = (0, exports.getValidatedWidth)(newWidth, minWidth);
        dispatch((0, actionCreators_1.resizeColumn)(key, newWidth));
    }
}; };
exports.getMouseMove = getMouseMove;
var getValidatedWidth = function (newWidth, minWidth) {
    if (newWidth < minWidth) {
        return minWidth;
    }
    return newWidth;
};
exports.getValidatedWidth = getValidatedWidth;
var isNumberWidth = function (width) { return width && typeof width === 'number'; };
exports.isNumberWidth = isNumberWidth;
var getMinWidth = function (style) {
    var minWidth = 20;
    if (!style) {
        return minWidth;
    }
    var styleMinWidth = style.minWidth;
    if ((0, exports.isNumberWidth)(styleMinWidth)) {
        minWidth = styleMinWidth;
    }
    return minWidth;
};
exports.getMinWidth = getMinWidth;
