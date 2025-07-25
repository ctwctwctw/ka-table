import * as React from 'react';
import { ITableInstance, ITableProps } from '../Table/Table';
import { ChildComponents } from '../../Models/ChildComponents';
export interface ITableUncontrolledPropsKeys extends ITableProps {
    childComponents?: ChildComponents;
    table?: ITableInstance;
}
export declare const TableInstanceContext: React.Context<ITableInstance>;
export declare const TableUncontrolled: React.FunctionComponent<ITableUncontrolledPropsKeys>;
