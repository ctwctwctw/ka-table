import { SortingMode } from '../enums';
import { Column } from '../Models/Column';
import { SortFunc } from '../types';
export declare const sortColumns: (columns: Column[]) => Column<any>[];
export declare const sortData: (columns: Column[], data: any, sort?: SortFunc) => any[];
export declare const isTripleStateSorting: (sortingMode: SortingMode) => sortingMode is SortingMode.SingleTripleState | SortingMode.SingleTripleStateRemote | SortingMode.MultipleTripleStateRemote;
export declare const isMultipleSorting: (sortingMode: SortingMode) => sortingMode is SortingMode.MultipleRemote | SortingMode.MultipleTripleStateRemote;
export declare const isRemoteSorting: (sortingMode: SortingMode) => sortingMode is SortingMode.SingleRemote | SortingMode.SingleTripleStateRemote | SortingMode.MultipleRemote | SortingMode.MultipleTripleStateRemote;
export declare const isSortingEnabled: (sortingMode: SortingMode, column?: Column) => boolean;
