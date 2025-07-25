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
var enums_1 = require("../../enums");
var react_1 = __importStar(require("react"));
var actionCreators_1 = require("../../actionCreators");
var CellEditorValidation_1 = __importDefault(require("../CellEditorValidation/CellEditorValidation"));
var EffectUtils_1 = require("../../Utils/EffectUtils");
var Validation_1 = require("../../Utils/Validation");
var const_1 = require("../../const");
var DataUtils_1 = require("../../Utils/DataUtils");
var CellEditorState = function (props) {
    var column = props.column, dispatch = props.dispatch, editingMode = props.editingMode, rowData = props.rowData, rowKeyValue = props.rowKeyValue, validation = props.validation, value = props.value;
    var validationMessage = props.validationMessage;
    var _a = (0, react_1.useState)(rowData), rowDataState = _a[0], changeRowData = _a[1];
    var _b = (0, react_1.useState)(value), editorValueState = _b[0], changeEditorValue = _b[1];
    var isCellEditingMode = editingMode === enums_1.EditingMode.Cell;
    validationMessage = rowKeyValue === const_1.newRowId || isCellEditingMode || validationMessage
        ? (0, Validation_1.getValidationValue)(editorValueState, rowDataState, column, validation) || ''
        : validationMessage;
    var onValueStateChange = function (action) {
        var newRowValue = (0, DataUtils_1.replaceValue)(rowData, column, action.value);
        changeRowData(newRowValue);
        changeEditorValue(action.value);
    };
    var close = (0, react_1.useCallback)(function () {
        dispatch((0, actionCreators_1.closeEditor)(rowKeyValue, column.key));
    }, [dispatch, column, rowKeyValue]);
    var closeHandler = (0, react_1.useCallback)(function () {
        if (!isCellEditingMode || !validationMessage) {
            if (editorValueState !== value) {
                dispatch((0, actionCreators_1.updateEditorValue)(rowKeyValue, column.key, editorValueState));
            }
            if (isCellEditingMode) {
                close();
            }
        }
    }, [validationMessage, dispatch, close, column, editorValueState, rowKeyValue, value, isCellEditingMode]);
    (0, react_1.useEffect)(function () {
        return (0, EffectUtils_1.addEscEnterKeyEffect)(close, closeHandler);
    }, [close, closeHandler]);
    var dispatchHandler = function (action) {
        if (action.type === enums_1.ActionType.CloseEditor) {
            closeHandler();
        }
        else if (action.type === enums_1.ActionType.UpdateCellValue) {
            onValueStateChange(action);
        }
        else {
            dispatch(action);
        }
    };
    var stateProps = __assign(__assign({}, props), {
        dispatch: dispatchHandler,
        value: editorValueState,
        editorValue: editorValueState,
        rowData: rowDataState,
        validationMessage: validationMessage || undefined
    });
    return (react_1.default.createElement(CellEditorValidation_1.default, __assign({}, stateProps)));
};
exports.default = CellEditorState;
