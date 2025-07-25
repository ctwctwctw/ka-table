"use strict";
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
exports.filterByHeaderFilter = exports.predefinedFilterOperators = exports.getDefaultOperatorForType = exports.filterData = exports.filterAndSearchData = exports.searchData = exports.getRowEditableCells = void 0;
var enums_1 = require("../enums");
var defaultOptions_1 = __importDefault(require("../defaultOptions"));
var DataUtils_1 = require("./DataUtils");
var CommonUtils_1 = require("./CommonUtils");
var getRowEditableCells = function (rowKeyValue, editableCells) {
    return editableCells.filter(function (c) { return c.rowKeyValue === rowKeyValue; });
};
exports.getRowEditableCells = getRowEditableCells;
var searchData = function (columns, data, searchText, search) {
    var searched = columns.reduce(function (initialData, c) {
        var filterFunction = function (item) {
            if (initialData.indexOf(item) >= 0) {
                return false;
            }
            var searchContent = search && search({ column: c, searchText: searchText, rowData: item });
            if (searchContent != null) {
                return searchContent;
            }
            var columnValue = (0, DataUtils_1.getValueByColumn)(item, c);
            if (columnValue == null) {
                return false;
            }
            return columnValue.toString().toLowerCase().includes(searchText.toLowerCase());
        };
        return initialData.concat(data.filter(filterFunction));
    }, []);
    return data.filter(function (d) { return searched.indexOf(d) >= 0; });
};
exports.searchData = searchData;
var filterAndSearchData = function (props) {
    var extendedFilter = props.extendedFilter, searchText = props.searchText, columns = props.columns, search = props.search, filter = props.filter, format = props.format;
    var _a = props.data, data = _a === void 0 ? [] : _a;
    data = __spreadArray([], data, true);
    data = extendedFilter ? extendedFilter(data) : data;
    data = searchText ? (0, exports.searchData)(columns, data, searchText, search) : data;
    data = (0, exports.filterData)(data, columns, filter);
    data = (0, exports.filterByHeaderFilter)(data, columns, format);
    return data;
};
exports.filterAndSearchData = filterAndSearchData;
var getCompare = function (column) {
    var filterRowOperator = column.filterRowOperator
        || (0, exports.getDefaultOperatorForType)(column.dataType || defaultOptions_1.default.columnDataType);
    var filterOperator = exports.predefinedFilterOperators.find(function (fo) { return filterRowOperator === fo.name; });
    if (!filterOperator) {
        throw new Error("'".concat(column.filterRowOperator, "' has not found in predefinedFilterOperators array, available operators: ").concat(exports.predefinedFilterOperators.map(function (o) { return o.name; }).join(', ')));
    }
    return filterOperator.compare;
};
var filterData = function (data, columns, filter) {
    return columns.reduce(function (initialData, column) {
        if ((0, CommonUtils_1.isEmpty)(column.filterRowValue)
            && column.filterRowOperator !== enums_1.FilterOperatorName.IsEmpty
            && column.filterRowOperator !== enums_1.FilterOperatorName.IsNotEmpty) {
            return initialData;
        }
        var customFilter = column.filter || (filter === null || filter === void 0 ? void 0 : filter({ column: column }));
        var compare = customFilter || getCompare(column);
        return initialData.filter(function (d) {
            var fieldValue = (0, DataUtils_1.getValueByColumn)(d, column);
            var conditionValue = column.filterRowValue;
            if (column.dataType === enums_1.DataType.Date && !customFilter) {
                fieldValue = fieldValue == null ? fieldValue : new Date(fieldValue).setHours(0, 0, 0, 0);
                conditionValue = conditionValue == null ? conditionValue : new Date(conditionValue).setHours(0, 0, 0, 0);
            }
            return compare(fieldValue, conditionValue, d);
        });
    }, data);
};
exports.filterData = filterData;
var getDefaultOperatorForType = function (type) {
    var filterOperator = exports.predefinedFilterOperators.find(function (o) { return o.defaultForTypes && o.defaultForTypes.includes(type); });
    return (filterOperator && filterOperator.name) || '=';
};
exports.getDefaultOperatorForType = getDefaultOperatorForType;
exports.predefinedFilterOperators = [{
        compare: function (fieldValue, conditionValue) {
            return fieldValue === conditionValue;
        },
        defaultForTypes: [enums_1.DataType.Boolean, enums_1.DataType.Number, enums_1.DataType.Date],
        name: enums_1.FilterOperatorName.Equal,
    }, {
        compare: function (fieldValue, conditionValue) {
            return fieldValue !== conditionValue;
        },
        name: enums_1.FilterOperatorName.IsNotEqual,
    }, {
        compare: function (fieldValue, conditionValue) {
            return fieldValue > conditionValue;
        },
        name: enums_1.FilterOperatorName.MoreThan,
    }, {
        compare: function (fieldValue, conditionValue) {
            return fieldValue < conditionValue;
        },
        name: enums_1.FilterOperatorName.LessThan,
    }, {
        compare: function (fieldValue, conditionValue) {
            return fieldValue >= conditionValue;
        },
        name: enums_1.FilterOperatorName.MoreThanOrEqual,
    }, {
        compare: function (fieldValue, conditionValue) {
            return fieldValue <= conditionValue;
        },
        name: enums_1.FilterOperatorName.LessThanOrEqual,
    }, {
        compare: function (fieldValue, conditionValue) {
            return fieldValue != null && fieldValue.toString().toLowerCase().includes(conditionValue.toString().toLowerCase());
        },
        defaultForTypes: [enums_1.DataType.String],
        name: enums_1.FilterOperatorName.Contains,
    }, {
        compare: function (fieldValue) {
            return (0, CommonUtils_1.isEmpty)(fieldValue);
        },
        name: enums_1.FilterOperatorName.IsEmpty,
    }, {
        compare: function (fieldValue) {
            return !(0, CommonUtils_1.isEmpty)(fieldValue);
        },
        name: enums_1.FilterOperatorName.IsNotEmpty,
    }];
var filterByHeaderFilter = function (data, columns, format) {
    return columns.reduce(function (initialData, column) {
        if ((0, CommonUtils_1.isEmpty)(column.headerFilterValues)) {
            return initialData;
        }
        return initialData.filter(function (item) {
            var _a;
            var value = (0, DataUtils_1.getValueByColumn)(item, column);
            if (column === null || column === void 0 ? void 0 : column.filter) {
                return column.filter(value, column.headerFilterValues, item);
            }
            var fieldValue = (format && format({ column: column, value: value, rowData: item }))
                || (value === null || value === void 0 ? void 0 : value.toString());
            return (_a = column.headerFilterValues) === null || _a === void 0 ? void 0 : _a.includes(fieldValue);
        });
    }, data);
};
exports.filterByHeaderFilter = filterByHeaderFilter;
