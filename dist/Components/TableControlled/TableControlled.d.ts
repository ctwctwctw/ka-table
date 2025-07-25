import * as React from 'react';
import { ITableAllProps, ITableProps } from '../Table/Table';
import { ChildComponents } from '../../Models/ChildComponents';
import { DispatchFunc } from '../../types';
export interface ITableControlledProps extends ITableProps {
    childComponents?: ChildComponents;
    dispatch: DispatchFunc;
}
export declare const TablePropsContext: React.Context<ITableProps<any>>;
export declare const TableControlled: React.FunctionComponent<ITableAllProps>;
