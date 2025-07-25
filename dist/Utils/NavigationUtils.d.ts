import { ITableProps } from '../Components/Table/Table';
import { Cell } from '../Models/Cell';
export interface IMoveFocusedSettings {
    end?: boolean;
}
export declare const getRightCell: (currentCell: Cell, props: ITableProps, settings?: IMoveFocusedSettings) => Cell;
export declare const getLeftCell: (currentCell: Cell, props: ITableProps, settings?: IMoveFocusedSettings) => Cell;
export declare const getUpCell: (currentCell: Cell, props: ITableProps, settings?: IMoveFocusedSettings) => Cell;
export declare const getDownCell: (currentCell: Cell, props: ITableProps, settings?: IMoveFocusedSettings) => Cell;
