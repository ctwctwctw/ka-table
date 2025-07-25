import { DataType, SortDirection } from './enums';
import { CssClasses } from './Models/CssClasses';
declare class DefaultOptions {
    columnDataType: DataType;
    columnSortDirection: SortDirection;
    css: CssClasses;
    fieldDelimiter: string;
}
declare const defaultOptions: DefaultOptions;
export default defaultOptions;
