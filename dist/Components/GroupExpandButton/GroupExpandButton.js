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
var CollapsedIcon_1 = require("../../Icons/CollapsedIcon");
var ExpandedIcon_1 = require("../../Icons/ExpandedIcon");
var react_1 = __importDefault(require("react"));
var defaultOptions_1 = __importDefault(require("../../defaultOptions"));
var ComponentUtils_1 = require("../../Utils/ComponentUtils");
var actionCreators_1 = require("../../actionCreators");
var GroupExpandButton = function (props) {
    var childComponents = props.childComponents, dispatch = props.dispatch, groupKey = props.groupKey, isExpanded = props.isExpanded;
    var _a = (0, ComponentUtils_1.getElementCustomization)({
        className: 'ka-icon-group-arrow',
        onClick: function () {
            dispatch((0, actionCreators_1.updateGroupsExpanded)(groupKey));
        }
    }, props, childComponents.groupExpandButton), elementAttributes = _a.elementAttributes, content = _a.content;
    return (content || react_1.default.createElement("div", __assign({}, elementAttributes), (isExpanded
        ? react_1.default.createElement(ExpandedIcon_1.ExpandedIcon, { className: defaultOptions_1.default.css.iconGroupArrowExpanded })
        : react_1.default.createElement(CollapsedIcon_1.CollapsedIcon, { className: defaultOptions_1.default.css.iconGroupArrowCollapsed }))));
};
exports.default = GroupExpandButton;
