"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("./enums");
var CssClasses_1 = require("./Models/CssClasses");
var DefaultOptions = /** @class */ (function () {
    function DefaultOptions() {
        this.columnDataType = enums_1.DataType.String;
        this.columnSortDirection = enums_1.SortDirection.Ascend;
        this.css = new CssClasses_1.CssClasses();
        this.fieldDelimiter = '.';
    }
    return DefaultOptions;
}());
var defaultOptions = new DefaultOptions();
exports.default = defaultOptions;
