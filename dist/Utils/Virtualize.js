"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVirtualized = exports.isVirtualScrollingEnabled = void 0;
var DataUtils_1 = require("./DataUtils");
var isVirtualScrollingEnabled = function (virtualScrolling) {
    return virtualScrolling && virtualScrolling.enabled !== false;
};
exports.isVirtualScrollingEnabled = isVirtualScrollingEnabled;
var getVirtualized = function (virtualScrolling, data, isNewRowShown, oddEvenRows) {
    var virtualizedData = [];
    var _a = virtualScrolling.scrollTop, scrollTop = _a === void 0 ? 0 : _a, _b = virtualScrolling.bottomInvisibleCount, bottomInvisibleCount = _b === void 0 ? 5 : _b, _c = virtualScrolling.topInvisibleCount, topInvisibleCount = _c === void 0 ? 0 : _c;
    var _d = virtualScrolling.tbodyHeight, tbodyHeight = _d === void 0 ? 600 : _d;
    var beginHeight = 0;
    var endHeight = 0;
    data.reduce(function (acc, value) {
        var itemHeight = virtualScrolling.itemHeight ?
            (typeof virtualScrolling.itemHeight === 'number'
                ? virtualScrolling.itemHeight
                : virtualScrolling.itemHeight(value))
            : 40;
        var topInvisibleHeight = (itemHeight * topInvisibleCount);
        if (acc >= scrollTop - itemHeight - topInvisibleHeight) {
            if (tbodyHeight + topInvisibleHeight >= -(itemHeight * bottomInvisibleCount)) {
                tbodyHeight = tbodyHeight - itemHeight;
                virtualizedData.push(value);
            }
            else {
                endHeight += itemHeight;
            }
        }
        else {
            beginHeight = acc;
            if (!isNewRowShown) {
                beginHeight += itemHeight;
            }
        }
        return acc + itemHeight;
    }, 0);
    return {
        beginHeight: beginHeight,
        endHeight: endHeight,
        virtualizedData: virtualizedData,
        isFirstVisibleRowOdd: oddEvenRows
            ? (0, DataUtils_1.checkIndexOdd)(data === null || data === void 0 ? void 0 : data.indexOf(virtualizedData[0]))
            : undefined
    };
};
exports.getVirtualized = getVirtualized;
