import { AllHTMLAttributes } from 'react';
import { DispatchFunc } from '../types';
export declare class AttributeTableData<T> {
    baseFunc: any;
    childElementAttributes: AllHTMLAttributes<HTMLElement>;
    dispatch: DispatchFunc;
    childProps: T;
}
