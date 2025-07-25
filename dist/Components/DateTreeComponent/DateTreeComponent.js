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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTreeFilter = exports.DateTreeComponent = void 0;
var React = __importStar(require("react"));
var enums_1 = require("../../enums");
var DataUtils_1 = require("../../Utils/DataUtils");
var DateTreeComponent = function (_a) {
    var nodes = _a.nodes, onToggleExpand = _a.onToggleExpand, onToggleSelect = _a.onToggleSelect, level = _a.level;
    return (React.createElement("div", null, nodes.map(function (node) { return (React.createElement("div", { key: node.value, className: "ka-custom-date-tree-item", style: { marginLeft: "".concat(level * 16, "px") } },
        React.createElement("div", { className: "ka-custom-date-tree-content" },
            node.children && node.children.length > 0 && (React.createElement("span", { className: "ka-custom-date-tree-expand-icon", onClick: function () { return onToggleExpand(node.value); } }, node.isExpanded ? '▼' : '▶')),
            (!node.children || node.children.length === 0) && (React.createElement("span", { className: "ka-custom-date-tree-expand-spacer" })),
            React.createElement("div", { className: "ka-custom-date-tree-checkbox ".concat(node.isSelected ? 'ka-custom-date-tree-checkbox--selected' :
                    node.isIndeterminate ? 'ka-custom-date-tree-checkbox--indeterminate' :
                        'ka-custom-date-tree-checkbox--unselected'), onClick: function (e) {
                    e.stopPropagation();
                    onToggleSelect(node.value, !node.isSelected);
                } },
                node.isSelected && !node.isIndeterminate && (React.createElement("span", { className: "ka-custom-date-tree-checkmark" }, "\u2713")),
                node.isIndeterminate && (React.createElement("div", { className: "ka-custom-date-tree-indeterminate-fill" }))),
            React.createElement("span", { className: "ka-custom-date-tree-label", onClick: function () { return node.children && node.children.length > 0 && onToggleExpand(node.value); } }, node.label)),
        node.isExpanded && node.children && (React.createElement(exports.DateTreeComponent, { nodes: node.children, onToggleExpand: onToggleExpand, onToggleSelect: onToggleSelect, level: level + 1 })))); })));
};
exports.DateTreeComponent = DateTreeComponent;
var DateTreeFilter = function (_a) {
    var column = _a.column, data = _a.data, format = _a.format, onFilterChange = _a.onFilterChange;
    var _b = React.useState([]), dateTreeNodes = _b[0], setDateTreeNodes = _b[1];
    var buildDateTree = React.useCallback(function () {
        if (column.dataType !== enums_1.DataType.Date || !data)
            return [];
        var dateValues = data.map(function (item) { return (0, DataUtils_1.getValueByColumn)(item, column); }).filter(function (value) { return value != null; });
        var dateMap = new Map();
        // Store original date values with their formatted counterparts
        dateValues.forEach(function (value) {
            var date = new Date(value);
            var year = date.getFullYear().toString();
            var month = (date.getMonth() + 1).toString().padStart(2, '0');
            var day = date.getDate().toString().padStart(2, '0');
            if (!dateMap.has(year)) {
                dateMap.set(year, new Map());
            }
            if (!dateMap.get(year).has(month)) {
                dateMap.get(year).set(month, new Map());
            }
            if (!dateMap.get(year).get(month).has(day)) {
                dateMap.get(year).get(month).set(day, []);
            }
            // Store the original value (formatted as it would appear in filter)
            var formattedValue = format ? format({ column: column, value: value, rowData: null }) : value === null || value === void 0 ? void 0 : value.toString();
            dateMap.get(year).get(month).get(day).push(formattedValue || (value === null || value === void 0 ? void 0 : value.toString()));
        });
        var selectedValues = new Set(column.headerFilterValues || []);
        var tree = [];
        Array.from(dateMap.keys()).sort().forEach(function (year) {
            var monthMap = dateMap.get(year);
            var yearChildren = [];
            var yearOriginalValues = [];
            Array.from(monthMap.keys()).sort().forEach(function (month) {
                var dayMap = monthMap.get(month);
                var monthChildren = [];
                var monthOriginalValues = [];
                Array.from(dayMap.keys()).sort().forEach(function (day) {
                    var originalValues = dayMap.get(day);
                    monthOriginalValues.push.apply(monthOriginalValues, originalValues);
                    yearOriginalValues.push.apply(yearOriginalValues, originalValues);
                    var daySelected = originalValues.some(function (val) { return selectedValues.has(val); });
                    monthChildren.push({
                        label: day,
                        value: "".concat(year, "-").concat(month, "-").concat(day),
                        isSelected: daySelected,
                        isExpanded: false,
                        level: 'day',
                        originalValues: originalValues
                    });
                });
                var monthKey = "".concat(year, "-").concat(month);
                var monthSelectedCount = monthChildren.filter(function (child) { return child.isSelected; }).length;
                var monthAllSelected = monthSelectedCount === monthChildren.length;
                var monthSomeSelected = monthSelectedCount > 0 && monthSelectedCount < monthChildren.length;
                yearChildren.push({
                    label: month,
                    value: monthKey,
                    isSelected: monthAllSelected,
                    isIndeterminate: monthSomeSelected,
                    isExpanded: false,
                    level: 'month',
                    children: monthChildren,
                    originalValues: monthOriginalValues
                });
            });
            var yearSelectedCount = yearChildren.filter(function (child) { return child.isSelected; }).length;
            var yearAllSelected = yearSelectedCount === yearChildren.length && yearChildren.every(function (child) { return !child.isIndeterminate; });
            var yearSomeSelected = (yearSelectedCount > 0 && yearSelectedCount < yearChildren.length) || yearChildren.some(function (child) { return child.isIndeterminate; });
            tree.push({
                label: year,
                value: year,
                isSelected: yearAllSelected,
                isIndeterminate: yearSomeSelected,
                isExpanded: false,
                level: 'year',
                children: yearChildren,
                originalValues: yearOriginalValues
            });
        });
        return tree;
    }, [column, data, format]);
    React.useEffect(function () {
        if (column.dataType === enums_1.DataType.Date) {
            setDateTreeNodes(buildDateTree());
        }
    }, [column.dataType, buildDateTree]);
    var handleToggleExpand = function (nodeValue) {
        setDateTreeNodes(function (prevNodes) {
            var updateNode = function (nodes) {
                return nodes.map(function (node) {
                    if (node.value === nodeValue) {
                        return __assign(__assign({}, node), { isExpanded: !node.isExpanded });
                    }
                    if (node.children) {
                        return __assign(__assign({}, node), { children: updateNode(node.children) });
                    }
                    return node;
                });
            };
            return updateNode(prevNodes);
        });
    };
    var handleToggleSelect = function (nodeValue, isSelected) {
        var updateSelectionInTree = function (nodes) {
            return nodes.map(function (node) {
                if (node.value === nodeValue) {
                    if (node.children) {
                        // Recursively update all children
                        var updatedChildren = node.children.map(function (child) {
                            return updateChildrenSelection(child, isSelected);
                        });
                        return __assign(__assign({}, node), { isSelected: isSelected, isIndeterminate: false, children: updatedChildren });
                    }
                    return __assign(__assign({}, node), { isSelected: isSelected, isIndeterminate: false });
                }
                if (node.children) {
                    var updatedChildren = updateSelectionInTree(node.children);
                    var selectedCount = updatedChildren.filter(function (child) { return child.isSelected; }).length;
                    var allSelected = selectedCount === updatedChildren.length && updatedChildren.every(function (child) { return !child.isIndeterminate; });
                    var someSelected = selectedCount > 0 || updatedChildren.some(function (child) { return child.isIndeterminate; });
                    return __assign(__assign({}, node), { isSelected: allSelected, isIndeterminate: someSelected && !allSelected, children: updatedChildren });
                }
                return node;
            });
        };
        var updateChildrenSelection = function (node, selected) {
            if (node.children) {
                var updatedChildren = node.children.map(function (child) { return updateChildrenSelection(child, selected); });
                return __assign(__assign({}, node), { isSelected: selected, isIndeterminate: false, children: updatedChildren });
            }
            return __assign(__assign({}, node), { isSelected: selected, isIndeterminate: false });
        };
        var updatedNodes = updateSelectionInTree(dateTreeNodes);
        setDateTreeNodes(updatedNodes);
        // Collect all selected original values from day-level nodes
        var getSelectedOriginalValues = function (nodes) {
            var selected = [];
            nodes.forEach(function (node) {
                if (node.level === 'day' && node.isSelected && node.originalValues) {
                    selected.push.apply(selected, node.originalValues);
                }
                if (node.children) {
                    selected.push.apply(selected, getSelectedOriginalValues(node.children));
                }
            });
            return Array.from(new Set(selected)); // Remove duplicates
        };
        var selectedOriginalValues = getSelectedOriginalValues(updatedNodes);
        onFilterChange(selectedOriginalValues);
    };
    return (React.createElement("div", { className: "ka-custom-date-tree-container" },
        React.createElement(exports.DateTreeComponent, { nodes: dateTreeNodes, onToggleExpand: handleToggleExpand, onToggleSelect: handleToggleSelect, level: 0 })));
};
exports.DateTreeFilter = DateTreeFilter;
