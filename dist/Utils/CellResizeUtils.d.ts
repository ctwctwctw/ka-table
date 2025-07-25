import { DispatchFunc } from '../types';
export declare const isCellResizeShown: (isResizable?: boolean, columnResizing?: boolean) => boolean;
export declare const getMouseMove: (currentWidth: any, minWidth: number, startX: number, key: string, dispatch: DispatchFunc) => (event: MouseEvent) => void;
export declare const getValidatedWidth: (newWidth: number, minWidth: number) => number;
export declare const isNumberWidth: (width: any) => boolean;
export declare const getMinWidth: (style: any) => number;
