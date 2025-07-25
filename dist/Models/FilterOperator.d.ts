import { DataType } from '../enums';
export declare class FilterOperator {
    compare: (fieldValue: any, conditionValue: any, rowData?: any) => boolean;
    defaultForTypes?: DataType[];
    name: string;
}
