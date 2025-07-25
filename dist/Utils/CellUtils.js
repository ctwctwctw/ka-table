"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPopupPosition = exports.removeItemFromEditableCells = exports.getCellEditorDispatchHandler = exports.addItemToEditableCells = exports.getEditableCell = exports.isEditableCell = exports.getNewRowDataFromEditableCells = exports.getNewRowEditableCells = void 0;
var enums_1 = require("../enums");
var actionCreators_1 = require("../actionCreators");
var ColumnUtils_1 = require("./ColumnUtils");
var ArrayUtils_1 = require("./ArrayUtils");
var const_1 = require("../const");
var DataUtils_1 = require("./DataUtils");
var getNewRowEditableCells = function (editableCells) {
    return editableCells && editableCells.filter(function (c) { return c.rowKeyValue === const_1.newRowId; });
};
exports.getNewRowEditableCells = getNewRowEditableCells;
var getNewRowDataFromEditableCells = function (editableCells, columns) {
    return editableCells.reduce(function (acc, item) {
        if (!item.hasOwnProperty('editorValue'))
            return acc;
        var column = (0, ColumnUtils_1.getColumn)(columns, item.columnKey);
        acc = (0, DataUtils_1.replaceValue)(acc, column, item.editorValue);
        return acc;
    }, {});
};
exports.getNewRowDataFromEditableCells = getNewRowDataFromEditableCells;
var isEditableCell = function (editingMode, column, rowEditableCells) {
    if (column.isEditable !== undefined) {
        return column.isEditable;
    }
    return !!rowEditableCells.find(function (c) { return c.columnKey === column.key; });
};
exports.isEditableCell = isEditableCell;
var getEditableCell = function (column, rowEditableCells) {
    if (column.isEditable === false) {
        return undefined;
    }
    return rowEditableCells.find(function (c) { return c.columnKey === column.key; });
};
exports.getEditableCell = getEditableCell;
var addItemToEditableCells = function (item, editableCells) {
    return (0, ArrayUtils_1.getCopyOfArrayAndAddItem)(item, editableCells);
};
exports.addItemToEditableCells = addItemToEditableCells;
var getCellEditorDispatchHandler = function (dispatch) {
    return function (action) {
        if (action.type === enums_1.ActionType.UpdateEditorValue) {
            dispatch((0, actionCreators_1.updateCellValue)(action.rowKeyValue, action.columnKey, action.value));
        }
        else {
            dispatch(action);
        }
    };
};
exports.getCellEditorDispatchHandler = getCellEditorDispatchHandler;
var removeItemFromEditableCells = function (item, editableCells) {
    return editableCells.filter(function (c) { return c.columnKey !== item.columnKey || c.rowKeyValue !== item.rowKeyValue; });
};
exports.removeItemFromEditableCells = removeItemFromEditableCells;
var checkPopupPosition = function (column, refToElement, dispatch) {
    var _a, _b;
    var element = refToElement.current;
    if (element && column.isHeaderFilterPopupShown) {
        var parent_1 = element.offsetParent;
        var table = parent_1.closest('table');
        var kaWrapper = parent_1.closest('.ka-table-wrapper');
        var newPopupPosition = {
            x: element.offsetLeft + (parent_1 === null || parent_1 === void 0 ? void 0 : parent_1.offsetLeft) - (kaWrapper === null || kaWrapper === void 0 ? void 0 : kaWrapper.scrollLeft),
            y: element.offsetTop + (table === null || table === void 0 ? void 0 : table.offsetTop) + element.offsetHeight
        };
        if (newPopupPosition.x !== ((_a = column.headerFilterPopupPosition) === null || _a === void 0 ? void 0 : _a.x) || newPopupPosition.y !== ((_b = column.headerFilterPopupPosition) === null || _b === void 0 ? void 0 : _b.y)) {
            dispatch((0, actionCreators_1.updatePopupPosition)(newPopupPosition));
        }
    }
};
exports.checkPopupPosition = checkPopupPosition;
