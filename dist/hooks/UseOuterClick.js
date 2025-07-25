"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOuterClick = void 0;
var react_1 = __importDefault(require("react"));
var useOuterClick = function (callback) {
    var callbackRef = react_1.default.useRef(function (event) { });
    var innerRef = react_1.default.useRef(document.createElement('div'));
    react_1.default.useEffect(function () {
        callbackRef.current = callback;
    });
    react_1.default.useEffect(function () {
        var handleClick = function (event) {
            if (innerRef.current && callbackRef.current &&
                !innerRef.current.contains(event.target))
                callbackRef.current(event);
        };
        document.addEventListener('click', handleClick);
        return function () { return document.removeEventListener('click', handleClick); };
    }, []);
    return innerRef;
};
exports.useOuterClick = useOuterClick;
