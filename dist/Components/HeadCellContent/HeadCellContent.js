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
var enums_1 = require("../../enums");
var HeaderFilterButton_1 = __importDefault(require("../HeaderFilterButton/HeaderFilterButton"));
var SortIcon_1 = __importDefault(require("../SortIcon/SortIcon"));
var CellUtils_1 = require("../../Utils/CellUtils");
var defaultOptions_1 = __importDefault(require("../../defaultOptions"));
var ComponentUtils_1 = require("../../Utils/ComponentUtils");
var SortUtils_1 = require("../../Utils/SortUtils");
var actionCreators_1 = require("../../actionCreators");
var useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;
var HeadCellContent = function (props) {
    var column = props.column, dispatch = props.dispatch, sortingMode = props.sortingMode, filteringMode = props.filteringMode, childComponents = props.childComponents;
    var sortingEnabled = (0, SortUtils_1.isSortingEnabled)(sortingMode, column);
    var onClick = sortingEnabled ? function () {
        dispatch((0, actionCreators_1.updateSortDirection)(column.key));
    } : undefined;
    var _a = (0, ComponentUtils_1.getElementCustomization)({
        className: "".concat(defaultOptions_1.default.css.theadCellContent, " ").concat(sortingEnabled ? 'ka-pointer' : ''),
        onClick: onClick
    }, props, childComponents.headCellContent), elementAttributes = _a.elementAttributes, content = _a.content;
    var refToElement = React.useRef(null);
    useIsomorphicLayoutEffect(function () {
        (0, CellUtils_1.checkPopupPosition)(column, refToElement, dispatch);
    }, [column, dispatch]);
    return (React.createElement("div", __assign({}, elementAttributes, { ref: refToElement }),
        content || React.createElement("span", null, column.title),
        column.sortDirection && sortingEnabled && (React.createElement(SortIcon_1.default, { column: column, dispatch: dispatch, childComponents: childComponents })),
        (filteringMode === enums_1.FilteringMode.HeaderFilter || filteringMode === enums_1.FilteringMode.FilterRowAndHeaderFilter) && column.isFilterable !== false && (React.createElement(HeaderFilterButton_1.default, { column: column, dispatch: dispatch, childComponents: childComponents }))));
};
exports.default = HeadCellContent;
