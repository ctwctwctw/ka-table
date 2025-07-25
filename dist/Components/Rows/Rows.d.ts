import React, { RefObject } from 'react';
import { ITableBodyProps } from '../../props';
export interface IRowsProps extends ITableBodyProps {
    onFirstRowRendered: (firstRowRef: RefObject<HTMLElement | null>) => any;
    treeGroupsExpanded?: any[];
    isFirstRowOdd?: boolean;
}
declare const Rows: React.FunctionComponent<IRowsProps>;
export default Rows;
