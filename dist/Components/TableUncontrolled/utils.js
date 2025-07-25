"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPropsToOverride = exports.getControlledPropsKeys = exports.getDefaultControlledPropsKeys = void 0;
var getDefaultControlledPropsKeys = function (settings) {
    return (settings === null || settings === void 0 ? void 0 : settings.loadingEnabled)
        ? ['searchText', 'loading']
        : ['searchText', 'loading', 'data', 'columns', 'paging', 'selectedRows'];
};
exports.getDefaultControlledPropsKeys = getDefaultControlledPropsKeys;
var getControlledPropsKeys = function (props) {
    var _a;
    var controlledPropsKeys = props.controlledPropsKeys ?
        props.controlledPropsKeys
        : (0, exports.getDefaultControlledPropsKeys)({ loadingEnabled: (_a = props.loading) === null || _a === void 0 ? void 0 : _a.enabled });
    return controlledPropsKeys;
};
exports.getControlledPropsKeys = getControlledPropsKeys;
var getPropsToOverride = function (controlledPropsKeys, props, tableProps) {
    return controlledPropsKeys.reduce(function (acc, item) {
        if (props[item] !== tableProps[item]) {
            acc[item] = props[item];
        }
        return acc;
    }, {});
};
exports.getPropsToOverride = getPropsToOverride;
