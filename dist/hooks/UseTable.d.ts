import { CustomReducerFunc, OnDispatchFunc } from '../types';
import { ITableInstance, ITableProps } from '../Components/Table/Table';
export declare const getTable: (options?: {
    changeProps?: React.Dispatch<React.SetStateAction<ITableProps>>;
    onDispatch?: OnDispatchFunc;
    customReducer?: CustomReducerFunc;
}) => ITableInstance;
export declare const useTable: (options?: {
    onDispatch?: OnDispatchFunc;
    customReducer?: CustomReducerFunc;
}) => ITableInstance;
