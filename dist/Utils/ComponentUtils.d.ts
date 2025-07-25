import React, { AllHTMLAttributes } from 'react';
import { ChildComponent } from '../Models/ChildComponent';
import { ChildAttributesItem } from '../types';
declare class ElementCustomization<T = HTMLElement> {
    content?: any;
    elementAttributes: React.AllHTMLAttributes<T>;
}
export declare function getElementCustomization<T = HTMLElement>(childElementAttributes: AllHTMLAttributes<T>, props: any, childComponent?: ChildComponent<any>): ElementCustomization<T>;
export declare const addElementAttributes: (elementAttributes: ChildAttributesItem<any>, props: any, childComponent?: ChildComponent<any>) => ChildComponent<any>;
export {};
