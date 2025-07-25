import { Column } from '../models';
import { ValidationFunc } from '../types';
export declare const getValidationValue: (value: any, rowData: any, column: Column, validation?: ValidationFunc) => string | void;
