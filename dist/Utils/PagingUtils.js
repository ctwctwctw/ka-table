"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPagingShown = exports.getPagesArrayBySize = exports.getPagesForCenter = exports.getPageData = exports.getPagesCount = exports.centerLength = void 0;
var enums_1 = require("../enums");
exports.centerLength = 5;
var DEFAULT_PAGE_SIZE = 10;
var getPagesCount = function (data, paging) {
    if (!paging || !paging.enabled) {
        return 1;
    }
    if (paging.pagesCount) {
        return paging.pagesCount;
    }
    return Math.ceil(data.length / ((paging && paging.pageSize) || DEFAULT_PAGE_SIZE));
};
exports.getPagesCount = getPagesCount;
var getPageData = function (data, paging) {
    if (!paging || !paging.enabled || paging.pagesCount) {
        return data;
    }
    var pageSize = paging.pageSize || DEFAULT_PAGE_SIZE;
    var pageIndex = paging.pageIndex || 0;
    var startIndex = pageSize * pageIndex;
    return data.slice(startIndex, startIndex + pageSize);
};
exports.getPageData = getPageData;
var getPagesForCenter = function (pages, isStartShown, isEndShown, pageIndex) {
    if (isStartShown && !isEndShown) {
        return pages.filter(function (page) { return (page >= pages.length - exports.centerLength - 1); });
    }
    else if (!isStartShown && isEndShown) {
        return pages.filter(function (page) { return (page <= exports.centerLength); });
    }
    else if (isStartShown && isEndShown) {
        return pages.filter(function (page) { return (page >= pageIndex - Math.floor(exports.centerLength / 2)) && (page <= pageIndex + Math.floor(exports.centerLength / 2)); });
    }
    return pages;
};
exports.getPagesForCenter = getPagesForCenter;
var getPagesArrayBySize = function (pagesCount) { return new Array(pagesCount).fill(undefined).map(function (_, index) { return index; }); };
exports.getPagesArrayBySize = getPagesArrayBySize;
var isPagingShown = function (position, paging) { return !!((paging === null || paging === void 0 ? void 0 : paging.enabled)
    && (paging.position
        ? position === paging.position || paging.position === enums_1.PagingPosition.TopAndBottom
        : position === enums_1.PagingPosition.Bottom)); };
exports.isPagingShown = isPagingShown;
