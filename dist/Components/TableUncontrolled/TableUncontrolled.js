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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableUncontrolled = exports.TableInstanceContext = void 0;
var React = __importStar(require("react"));
var utils_1 = require("./utils");
var TableControlled_1 = require("../TableControlled/TableControlled");
var UseTable_1 = require("../../hooks/UseTable");
var kaReducer_1 = require("../../Reducers/kaReducer");
exports.TableInstanceContext = React.createContext({});
var TableUncontrolled = function (props) {
    var _a;
    var _ = props.table, childComponents = props.childComponents, tablePropsControlled = __rest(props, ["table", "childComponents"]);
    var _b = React.useState(__assign(__assign({}, tablePropsControlled), (_a = props.table) === null || _a === void 0 ? void 0 : _a.props)), tableProps = _b[0], changeTableProps = _b[1];
    var dispatch = function (action) {
        changeTableProps(function (prevState) {
            var _a, _b;
            var nextStateDefault = (0, kaReducer_1.kaReducer)(prevState, action);
            var nextState = ((_a = props.table) === null || _a === void 0 ? void 0 : _a.customReducer) ? ((_b = props.table.customReducer(nextStateDefault, action, prevState)) !== null && _b !== void 0 ? _b : nextStateDefault) : nextStateDefault;
            setTimeout(function () {
                var _a, _b;
                (_b = (_a = props.table) === null || _a === void 0 ? void 0 : _a.onDispatch) === null || _b === void 0 ? void 0 : _b.call(_a, action, nextState, prevState);
            }, 0);
            return nextState;
        });
    };
    React.useEffect(function () {
        var controlledPropsKeys = (0, utils_1.getControlledPropsKeys)(props);
        var propsToOverride = (0, utils_1.getPropsToOverride)(controlledPropsKeys, props, tableProps);
        if (Object.keys(propsToOverride).length) {
            if (propsToOverride === null || propsToOverride === void 0 ? void 0 : propsToOverride.paging) {
                propsToOverride.paging = __assign(__assign({}, tableProps.paging), propsToOverride.paging);
            }
            changeTableProps(__assign(__assign({}, tableProps), propsToOverride));
        }
    }, [props]);
    var contextTable = props.table || (0, UseTable_1.getTable)();
    contextTable.props = tableProps;
    contextTable.changeProps = changeTableProps;
    contextTable.dispatch = dispatch;
    return (React.createElement(exports.TableInstanceContext.Provider, { value: contextTable },
        React.createElement(TableControlled_1.TableControlled, __assign({}, contextTable.props, { 
            // paging={ props.paging }
            childComponents: childComponents, extendedFilter: props.extendedFilter, filter: props.filter, format: props.format, dispatch: dispatch }))));
};
exports.TableUncontrolled = TableUncontrolled;
