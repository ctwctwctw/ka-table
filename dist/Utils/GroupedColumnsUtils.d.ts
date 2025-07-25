import { Column } from '../models';
import { GroupedColumn } from '../Models/GroupedColumn';
export interface GroupedColumnResult {
    rowSpan?: number;
    colSpan: number;
    columnChainLength: number;
    column: Column;
    columns: Column[];
}
export declare const getChain: (column: Column | GroupedColumn, groupedColumns: GroupedColumn[], currentChain?: (Column | GroupedColumn)[]) => any[];
export declare const addColumnToRows: (rows: GroupedColumnResult[][], column: Column, groupedColumns: GroupedColumn[]) => GroupedColumnResult[][];
export declare const getRowsWithGroupedColumns: (columns: Column[], groupedColumns: GroupedColumn[]) => GroupedColumnResult[][];
