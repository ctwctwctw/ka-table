import { PagingPosition } from '../enums';
import { PagingOptions } from '../models';
export declare const centerLength = 5;
export declare const getPagesCount: (data: any[], paging?: PagingOptions) => number;
export declare const getPageData: (data: any[], paging?: PagingOptions) => any[];
export declare const getPagesForCenter: (pages: number[], isStartShown: boolean, isEndShown: boolean, pageIndex: number) => any[];
export declare const getPagesArrayBySize: (pagesCount?: number) => number[];
export declare const isPagingShown: (position: PagingPosition, paging?: PagingOptions) => boolean;
