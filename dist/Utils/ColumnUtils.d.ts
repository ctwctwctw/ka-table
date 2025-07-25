import { Column } from '../models';
import { Field } from '../types';
export declare const getColumn: (columns: Column[], columnKey: string) => Column<any>;
export declare const getField: (column: Column) => Field;
export declare const getLastField: (field: Field) => Field;
export declare const getFieldParts: (field: Field) => Field[];
export declare const getLastFieldParents: (field: Field) => Field[];
export declare const replaceColumnValue: ({ columns, columnKey, replacedOption, replacedValue }: {
    columns: Column[];
    columnKey: any;
    replacedOption: string;
    replacedValue: any;
}) => any[];
