export declare const treeGroupMark: {};
export declare const treeDataMark: {};
export declare const getExpandedParents: (treeData: any[], rowKeyField: any) => any[][];
export declare const getTreeGroupChain: (keyValue: any, dataMap: any, treeGroupKeyField: any, treeGroupKeyValues: any[], groupChain?: any) => any[];
export declare const restoreFilteredData: ({ data, originalData, rowKeyField, treeGroupKeyField, treeGroupsExpanded }: {
    data: any[];
    originalData: any[];
    rowKeyField: any;
    treeGroupKeyField: any;
    treeGroupsExpanded?: any[][];
}) => any[];
export declare const getTreeData: ({ data, originalData, rowKeyField, treeGroupKeyField, treeGroupsExpanded }: {
    data: any[];
    originalData: any[];
    rowKeyField: any;
    treeGroupKeyField: any;
    treeGroupsExpanded?: any[][];
}) => any[];
