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
exports.ExpandedIcon = void 0;
var react_1 = __importDefault(require("react"));
var ExpandedIcon = function (props) {
    return (react_1.default.createElement("svg", __assign({ style: { transform: 'rotate(180deg)' } }, props, { xmlns: 'http://www.w3.org/2000/svg', version: '1.1', id: 'Capa_1', x: '0px', y: '0px', viewBox: '0 -150 1024 1024', width: '10', height: '10' }),
        react_1.default.createElement("g", null,
            react_1.default.createElement("path", { d: 'M461.824 81.664l-440.32 440.32c-28.672 27.648-28.672 72.704 0 101.376 27.648 27.648 72.704 27.648 101.376 0l389.12-390.144 390.144 390.144c27.648 27.648 72.704 27.648 101.376 0 27.648-28.672 27.648-73.728 0-101.376l-440.32-440.32c-14.336-14.336-32.768-21.504-51.2-21.504s-36.864 7.168-50.176 21.504z' }))));
};
exports.ExpandedIcon = ExpandedIcon;
