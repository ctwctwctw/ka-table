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
var __1 = require("../..");
var actionCreators_1 = require("../../actionCreators");
var CellEditorBoolean_1 = __importDefault(require("../CellEditorBoolean/CellEditorBoolean"));
var DateTreeComponent_1 = require("../DateTreeComponent/DateTreeComponent");
var DataUtils_1 = require("../../Utils/DataUtils");
var HeaderFilterPopupContent = function (props) {
    var column = props.column, childComponents = props.childComponents, data = props.data, dispatch = props.dispatch, format = props.format;
    var handleDateFilterChange = function (selectedValues) {
        // Clear all existing filter values for this column first
        var existingValues = column.headerFilterValues || [];
        existingValues.forEach(function (value) {
            dispatch((0, actionCreators_1.updateHeaderFilterValues)(column.key, value, false));
        });
        // Add new selected values
        selectedValues.forEach(function (value) {
            dispatch((0, actionCreators_1.updateHeaderFilterValues)(column.key, value, true));
        });
    };
    var headerFilterValues;
    headerFilterValues = (column === null || column === void 0 ? void 0 : column.headerFilterListItems) ? column === null || column === void 0 ? void 0 : column.headerFilterListItems({ data: data }) : data === null || data === void 0 ? void 0 : data.map(function (item, i) {
        var value = (0, DataUtils_1.getValueByColumn)(item, column);
        var formattedValue = (format && format({ column: column, value: value, rowData: item }))
            || (value === null || value === void 0 ? void 0 : value.toString());
        return formattedValue;
    });
    headerFilterValues = Array.from(new Set(headerFilterValues));
    var headerFilterValuesData = headerFilterValues === null || headerFilterValues === void 0 ? void 0 : headerFilterValues.map(function (value, i) { return ({ value: value, isSelected: !!column.headerFilterValues && column.headerFilterValues.includes(value) }); });
    var selectedColumnKey = "".concat(column.key, "_isSelected");
    var table = (0, __1.useTable)({
        onDispatch: function (action) {
            if (action.type === __1.ActionType.UpdateFilterRowValue) {
                dispatch((0, actionCreators_1.updateHeaderFilterSearchValue)(action.columnKey, action.filterRowValue));
            }
        }
    });
    var handleSortAscending = function () {
        if (column.sortDirection === __1.SortDirection.Descend) {
            dispatch((0, actionCreators_1.updateSortDirection)(column.key));
        }
        else if (!column.sortDirection) {
            dispatch((0, actionCreators_1.updateSortDirection)(column.key));
        }
    };
    var handleSortDescending = function () {
        if (column.sortDirection === __1.SortDirection.Ascend) {
            dispatch((0, actionCreators_1.updateSortDirection)(column.key));
        }
        else if (!column.sortDirection) {
            dispatch((0, actionCreators_1.updateSortDirection)(column.key));
            dispatch((0, actionCreators_1.updateSortDirection)(column.key));
        }
    };
    return (React.createElement("div", null,
        React.createElement("div", { style: { padding: '8px', borderBottom: '1px solid #e0e0e0' } },
            React.createElement("div", { style: {
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    borderRadius: '3px',
                    backgroundColor: column.sortDirection === __1.SortDirection.Ascend ? '#e3f2fd' : 'transparent'
                }, onMouseEnter: function (e) {
                    if (column.sortDirection !== __1.SortDirection.Ascend) {
                        e.currentTarget.style.backgroundColor = '#f5f5f5';
                    }
                }, onMouseLeave: function (e) {
                    e.currentTarget.style.backgroundColor = column.sortDirection === __1.SortDirection.Ascend ? '#e3f2fd' : 'transparent';
                }, onClick: handleSortAscending },
                React.createElement("span", { style: {
                        marginRight: '8px',
                        fontSize: '14px',
                        opacity: column.sortDirection === __1.SortDirection.Ascend ? 1 : 0.7
                    } }, "\u2191"),
                React.createElement("span", { style: {
                        fontWeight: column.sortDirection === __1.SortDirection.Ascend ? 'bold' : 'normal'
                    } }, "\u6607\u9806")),
            React.createElement("div", { style: {
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    borderRadius: '3px',
                    backgroundColor: column.sortDirection === __1.SortDirection.Descend ? '#e3f2fd' : 'transparent'
                }, onMouseEnter: function (e) {
                    if (column.sortDirection !== __1.SortDirection.Descend) {
                        e.currentTarget.style.backgroundColor = '#f5f5f5';
                    }
                }, onMouseLeave: function (e) {
                    e.currentTarget.style.backgroundColor = column.sortDirection === __1.SortDirection.Descend ? '#e3f2fd' : 'transparent';
                }, onClick: handleSortDescending },
                React.createElement("span", { style: {
                        marginRight: '8px',
                        fontSize: '14px',
                        opacity: column.sortDirection === __1.SortDirection.Descend ? 1 : 0.7
                    } }, "\u2193"),
                React.createElement("span", { style: {
                        fontWeight: column.sortDirection === __1.SortDirection.Descend ? 'bold' : 'normal'
                    } }, "\u964D\u9806"))),
        column.dataType === __1.DataType.Date ? (React.createElement(DateTreeComponent_1.DateTreeFilter, { column: column, data: data || [], format: format, onFilterChange: handleDateFilterChange })) : (React.createElement(__1.Table, { table: table, columns: [
                { key: selectedColumnKey, field: 'isSelected', width: 35, isFilterable: false },
                {
                    key: column.key,
                    field: 'value',
                    style: { textAlign: 'left' },
                    filterRowValue: column.headerFilterSearchValue
                }
            ], filteringMode: column.isHeaderFilterSearchable ? __1.FilteringMode.FilterRow : undefined, data: headerFilterValuesData, selectedRows: column.headerFilterValues, filter: function () { return column.headerFilterSearch; }, rowKeyField: 'value', childComponents: {
                headRow: {
                    elementAttributes: function () { return ({ style: { display: 'none' } }); }
                },
                filterRowCell: {
                    elementAttributes: function (_a) {
                        var filterRowColumn = _a.column;
                        return ({
                            style: {
                                top: 0,
                                display: filterRowColumn.key === selectedColumnKey ? 'none' : undefined
                            },
                            colSpan: filterRowColumn.key === selectedColumnKey ? 0 : 2
                        });
                    }
                },
                filterRowCellInput: childComponents === null || childComponents === void 0 ? void 0 : childComponents.headerFilterPopupSearchInput,
                rootDiv: {
                    elementAttributes: function () { return ({
                        className: 'ka-header-filter-table'
                    }); }
                },
                dataRow: childComponents === null || childComponents === void 0 ? void 0 : childComponents.headerFilterPopupRow,
                cell: __assign(__assign({}, childComponents === null || childComponents === void 0 ? void 0 : childComponents.headerFilterPopupTextCell), { elementAttributes: function (componentProps) {
                        var _a, _b;
                        return (__assign({ onClick: function () {
                                var _a;
                                var isSelect = !((_a = column === null || column === void 0 ? void 0 : column.headerFilterValues) === null || _a === void 0 ? void 0 : _a.includes(componentProps === null || componentProps === void 0 ? void 0 : componentProps.rowKeyValue));
                                dispatch((0, actionCreators_1.updateHeaderFilterValues)(column.key, componentProps === null || componentProps === void 0 ? void 0 : componentProps.rowKeyValue, isSelect));
                            } }, (_b = (_a = childComponents === null || childComponents === void 0 ? void 0 : childComponents.headerFilterPopupTextCell) === null || _a === void 0 ? void 0 : _a.elementAttributes) === null || _b === void 0 ? void 0 : _b.call(_a, componentProps)));
                    } }),
                cellText: {
                    content: function (componentProps) {
                        switch (componentProps === null || componentProps === void 0 ? void 0 : componentProps.column.key) {
                            case selectedColumnKey: return React.createElement(CellEditorBoolean_1.default, __assign({}, componentProps));
                        }
                    },
                },
            } }))));
};
exports.default = HeaderFilterPopupContent;
