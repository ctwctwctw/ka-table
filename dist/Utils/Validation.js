"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidationValue = void 0;
var getValidationValue = function (value, rowData, column, validation) {
    if (validation) {
        return validation({ value: value, rowData: rowData, column: column });
    }
    return undefined;
};
exports.getValidationValue = getValidationValue;
