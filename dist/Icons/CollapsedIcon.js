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
exports.CollapsedIcon = void 0;
var react_1 = __importDefault(require("react"));
var CollapsedIcon = function (props) {
    return (react_1.default.createElement("svg", __assign({}, props, { xmlns: 'http://www.w3.org/2000/svg', version: '1.1', id: 'Capa_1', x: '0px', y: '0px', viewBox: '0 -150 1024 1024', width: '10', height: '10' }),
        react_1.default.createElement("g", null,
            react_1.default.createElement("path", { d: 'M783.36 301.824l-440.32-441.344c-28.672-27.648-73.728-27.648-101.376 0-28.672 28.672-28.672 73.728 0 101.376l389.12 390.144-389.12 390.144c-28.672 27.648-28.672 72.704 0 101.376 27.648 27.648 72.704 27.648 101.376 0l440.32-440.32c13.312-14.336 20.48-32.768 20.48-51.2s-7.168-36.864-20.48-50.176z' }))));
};
exports.CollapsedIcon = CollapsedIcon;
