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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentUtils_1 = require("../../Utils/ComponentUtils");
var DataRowContent_1 = __importDefault(require("../DataRowContent/DataRowContent"));
var EmptyCells_1 = __importDefault(require("../EmptyCells/EmptyCells"));
var react_1 = __importDefault(require("react"));
var defaultOptions_1 = __importDefault(require("../../defaultOptions"));
var PropsUtils_1 = require("../../Utils/PropsUtils");
var actionCreators_1 = require("../../actionCreators");
var DataRow = function (props) {
    var dispatch = props.dispatch, groupColumnsCount = props.groupColumnsCount, isSelectedRow = props.isSelectedRow, rowKeyValue = props.rowKeyValue, rowReordering = props.rowReordering, trRef = props.trRef, childComponents = props.childComponents, isOdd = props.isOdd;
    var dataRow = childComponents.dataRow;
    if (rowReordering) {
        var reorderedRowProps = (0, PropsUtils_1.getDraggableProps)({
            key: rowKeyValue,
            dispatch: dispatch,
            actionCreator: actionCreators_1.reorderRows,
            draggedClass: defaultOptions_1.default.css.draggedRow,
            dragOverClass: defaultOptions_1.default.css.dragOverRow,
            hasReordering: true
        });
        dataRow = (0, ComponentUtils_1.addElementAttributes)(reorderedRowProps, props, dataRow);
    }
    var _a = (0, ComponentUtils_1.getElementCustomization)({
        className: "".concat(defaultOptions_1.default.css.row, " ").concat(isSelectedRow ? defaultOptions_1.default.css.rowSelected : '').concat(isOdd === undefined ? '' : isOdd ? ' ka-odd' : ' ka-even')
    }, props, dataRow), elementAttributes = _a.elementAttributes, content = _a.content;
    return (react_1.default.createElement("tr", __assign({ ref: trRef }, elementAttributes), content
        ? react_1.default.createElement(react_1.default.Fragment, null, content)
        : (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(EmptyCells_1.default, { count: groupColumnsCount, childComponents: childComponents }),
            react_1.default.createElement(DataRowContent_1.default, __assign({}, props))))));
};
exports.default = DataRow;
