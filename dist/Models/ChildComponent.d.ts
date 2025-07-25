import { PropsWithChildren } from 'react';
import { ChildAttributesItem } from '../types';
export declare class ChildComponent<TProps> {
    elementAttributes?: (props: PropsWithChildren<TProps>) => (ChildAttributesItem<TProps> | void);
    content?: (props: PropsWithChildren<TProps>) => any;
}
