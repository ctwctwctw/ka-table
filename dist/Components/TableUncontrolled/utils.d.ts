import { ControlledPropsKeys } from '../../types';
import { ITableProps } from '../Table/Table';
export declare const getDefaultControlledPropsKeys: (settings?: {
    loadingEnabled?: boolean;
}) => ControlledPropsKeys;
export declare const getControlledPropsKeys: (props: ITableProps) => ControlledPropsKeys;
export declare const getPropsToOverride: (controlledPropsKeys: ControlledPropsKeys, props: ITableProps, tableProps: ITableProps) => any;
