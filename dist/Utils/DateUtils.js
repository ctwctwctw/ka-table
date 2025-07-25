"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateInputValue = void 0;
var getDateInputValue = function (date) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
};
exports.getDateInputValue = getDateInputValue;
