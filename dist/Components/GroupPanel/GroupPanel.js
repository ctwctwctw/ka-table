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
exports.GroupPanel = void 0;
var React = __importStar(require("react"));
var GroupPanelCell_1 = require("../GroupPanelCell/GroupPanelCell");
var defaultOptions_1 = __importDefault(require("../../defaultOptions"));
var ComponentUtils_1 = require("../../Utils/ComponentUtils");
var PropsUtils_1 = require("../../Utils/PropsUtils");
var GroupUtils_1 = require("../../Utils/GroupUtils");
var GroupPanel = function (props) {
    var columns = props.columns, groups = props.groups, groupPanel = props.groupPanel, dispatch = props.dispatch, _a = props.childComponents, childComponents = _a === void 0 ? {} : _a;
    var _b = (0, ComponentUtils_1.getElementCustomization)({
        className: defaultOptions_1.default.css.groupPanel,
        onDrop: !(0, GroupUtils_1.isMaxDeep)(groupPanel, columns, groups) ? function (e) { return (0, PropsUtils_1.groupPanelOnDrop)(e, dispatch); } : undefined,
        onDragOver: function (event) {
            event.preventDefault();
        }
    }, props, childComponents.groupPanel), elementAttributes = _b.elementAttributes, content = _b.content;
    return (React.createElement("div", __assign({}, elementAttributes), content || (groups === null || groups === void 0 ? void 0 : groups.map(function (group) {
        var column = columns.find(function (c) { return c.key === group.columnKey; });
        return column && React.createElement(GroupPanelCell_1.GroupPanelCell, __assign({ key: column.key }, props, { column: column }));
    })) || React.createElement("div", { className: defaultOptions_1.default.css.groupPanelText }, groupPanel.text)));
};
exports.GroupPanel = GroupPanel;
