import { DataType, SortDirection } from '../enums';
import { Field } from '../types';
import { PopupPosition } from './PopupPosition';
export declare class Column<TData = any> {
    colGroup?: React.ColHTMLAttributes<HTMLElement>;
    dataType?: DataType;
    field?: Field;
    filter?: (value: any, filterValue: any, rowData?: any) => boolean;
    filterRowOperator?: any;
    filterRowValue?: any;
    headerFilterListItems?: (props: {
        data?: TData[];
    }) => string[];
    headerFilterPopupPosition?: PopupPosition;
    headerFilterSearch?: (value: any, searchValue: any, rowData?: any) => boolean;
    headerFilterSearchValue?: any;
    headerFilterValues?: string[];
    isDraggable?: boolean;
    isEditable?: boolean;
    isFilterable?: boolean;
    isHeaderFilterPopupShown?: boolean;
    isHeaderFilterSearchable?: boolean;
    isResizable?: boolean;
    isSortable?: boolean;
    key: string;
    sortDirection?: SortDirection;
    sortIndex?: number;
    style?: React.CSSProperties;
    title?: string;
    visible?: boolean;
    width?: number | string;
}
