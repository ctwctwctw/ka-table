import { getField, getFieldParts, getLastField, getLastFieldParents } from './ColumnUtils';

import { Column } from '../Models/Column';
import { GroupedColumn } from '../Models/GroupedColumn';
import { Field } from '../types';

export const getParentValue = (rowData: any, fieldParents: Field[]) => {
    const parentValue = fieldParents.reduce((previousValue, currentValue) => {
        const result = (previousValue && previousValue[currentValue]);
        return result !== undefined ? result : undefined;
    },
    rowData);
    return parentValue ? { ...parentValue } : undefined;
};

export const createObjByFields = (fieldParents: Field[], field: Field, value: any) => {
    const parentValue: any = {};
    if (fieldParents.length) {
        fieldParents.reduce((previousValue, currentItem, currentIndex) => {
            const lastObj: any = {};
            previousValue[currentItem] = lastObj;
            if (currentIndex === (fieldParents.length - 1)) {
                lastObj[field] = value;
            }
            return lastObj;
        },
        parentValue);
    } else {
        parentValue[field] = value;
    }
    return { ...parentValue };
};

export const getValueByColumn = (rowData: any, column: Column) => {
    return getValueByField(rowData, getField(column));
};

export const getValueByField = (rowData: any, field: Field) => {
    let o = { ...rowData };
    const names = getFieldParts(field);
    for (let i = 0, n = names.length; i < n; ++i) {
        const k = names[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
};

const replaceValueForField = (rowData: any, field: Field, newValue: any, fieldParents?: Field[]): any => {
    let result = { ...rowData };
    if (fieldParents && fieldParents.length) {
        const parentValue = getParentValue(result, fieldParents) || {};
        parentValue[field] = newValue;

        const parentsOfParent = [...fieldParents];
        const parentFieldName = parentsOfParent.pop() as string;
        result = replaceValueForField(result, parentFieldName, parentValue, parentsOfParent);
    } else {
        result[field] = newValue;
    }
    return result;
};

export const replaceValue = (rowData: any, column: Column, newValue: any) => {
    const field = getField(column);
    return replaceValueForField(rowData, getLastField(field), newValue, getLastFieldParents(field));
};


export const reorderDataByIndex = (data: any[], getKey: (d: any) => any, keyValue: any, targetIndex: number) => {
    const moved = data.find(d => getKey(d) === keyValue);
    const newData = data.filter(d => getKey(d) !== keyValue);
    newData.splice(targetIndex, 0, moved);
    return newData;
};

export const insertBefore = (data: any[], getKey: (d: any) => any, keyValue: any, targetKeyValue: any) => {
    let targetIndex = data.findIndex(d => getKey(d) === targetKeyValue);
    const moved = data.findIndex(d => getKey(d) === keyValue);
    if (moved < targetIndex){
        targetIndex = targetIndex - 1;
    }
    return reorderDataByIndex(data, getKey, keyValue, targetIndex);
};

// Helper function to find the parent group of a column or group
const findParentGroup = (key: string, groupedColumns: GroupedColumn[]): GroupedColumn | null => {
    console.log(`🔍 Finding parent for key: ${key}`);
    for (const group of groupedColumns) {
        console.log(`  🔎 Checking group ${group.key} with columnsKeys:`, group.columnsKeys);
        if (group.columnsKeys.includes(key)) {
            console.log(`  ✅ Found parent: ${group.key}`);
            return group;
        }
    }
    console.log('  ❌ No parent found - returning null');
    return null; // Not in any group (ungrouped or top-level group)
};

// Helper function to check if two items are at the same root level
const isSameRoot = (sourceKey: string, targetKey: string, groupedColumns: GroupedColumn[]): boolean => {
    // Check if both are group headers (exist in groupedColumns by key)
    const sourceIsGroup = groupedColumns.some(gc => gc.key === sourceKey);
    const targetIsGroup = groupedColumns.some(gc => gc.key === targetKey);

    // Find parent groups for both items
    const sourceParent = findParentGroup(sourceKey, groupedColumns);
    const targetParent = findParentGroup(targetKey, groupedColumns);

    console.log(`🔍 isSameRoot check: ${sourceKey} → ${targetKey}`);
    console.log('📋 Source parent:', sourceParent ? { key: sourceParent.key, title: sourceParent.title } : 'null (root level)');
    console.log('📋 Target parent:', targetParent ? { key: targetParent.key, title: targetParent.title } : 'null (root level)');
    console.log('📊 Same parent?', sourceParent === targetParent);

    // Same root conditions - items can only reorder if they have the exact same parent
    // This means:
    // 1. Both have the same parent group (including both null = root level)
    // 2. Individual columns can only move within their immediate parent group
    // 3. Sub-groups can only move within their parent group
    // 4. Top-level groups and ungrouped columns are both at root and can reorder with each other

    // Must have exactly the same parent to be considered same root
    if (sourceParent === targetParent) {
        console.log('✅ Same root - allowing reorder');
        return true;
    }

    // Different parents = different root levels, not allowed
    console.log('❌ Different root - blocking reorder');
    return false;
};

// Helper function to recursively get all leaf column keys for a group
const getLeafColumnKeys = (groupKey: string, groupedColumns: GroupedColumn[]): string[] => {
    const group = groupedColumns.find(gc => gc.key === groupKey);
    if (!group) return [];

    const leafKeys: string[] = [];

    for (const columnKey of group.columnsKeys) {
        // Check if this columnKey is itself a group
        const isSubGroup = groupedColumns.some(gc => gc.key === columnKey);
        if (isSubGroup) {
            // Recursively get leaf keys from sub-group
            leafKeys.push(...getLeafColumnKeys(columnKey, groupedColumns));
        } else {
            // This is a leaf column
            leafKeys.push(columnKey);
        }
    }

    return leafKeys;
};

// Helper function to reorder entire groups of columns
const reorderGroupBlocks = (data: any[], getKey: (d: any) => any, sourceGroupKey: string, targetGroupKey: string, groupedColumns: GroupedColumn[]) => {
    // Find the source and target groups
    const sourceGroup = groupedColumns.find(gc => gc.key === sourceGroupKey);
    const targetGroup = groupedColumns.find(gc => gc.key === targetGroupKey);

    if (!sourceGroup || !targetGroup) {
        console.log(`❌ Could not find groups: source=${!!sourceGroup}, target=${!!targetGroup}`);
        return data;
    }

    console.log('📊 Reordering groups:', {
        sourceGroup: { key: sourceGroup.key, columnsKeys: sourceGroup.columnsKeys },
        targetGroup: { key: targetGroup.key, columnsKeys: targetGroup.columnsKeys }
    });

    // Get all leaf columns (actual columns) belonging to source and target groups
    const sourceLeafKeys = getLeafColumnKeys(sourceGroupKey, groupedColumns);
    const targetLeafKeys = getLeafColumnKeys(targetGroupKey, groupedColumns);

    console.log('📋 Leaf column keys:', { sourceLeafKeys, targetLeafKeys });

    const sourceColumns = data.filter(col => sourceLeafKeys.includes(getKey(col)));
    const targetColumns = data.filter(col => targetLeafKeys.includes(getKey(col)));

    if (sourceColumns.length === 0 || targetColumns.length === 0) {
        console.log(`❌ No columns found for groups: source=${sourceColumns.length}, target=${targetColumns.length}`);
        return data;
    }

    console.log('📋 Found columns:', {
        sourceColumns: sourceColumns.map(c => getKey(c)),
        targetColumns: targetColumns.map(c => getKey(c))
    });

    // Create new data array with groups reordered
    const result = [...data];

    // Find the positions of the first column in each group using leaf keys
    const sourceStartIndex = result.findIndex(col => sourceLeafKeys.includes(getKey(col)));
    const targetStartIndex = result.findIndex(col => targetLeafKeys.includes(getKey(col)));

    if (sourceStartIndex === -1 || targetStartIndex === -1) {
        console.log(`❌ Could not find group positions: source=${sourceStartIndex}, target=${targetStartIndex}`);
        return data;
    }

    // Remove source group columns from their current position
    sourceColumns.forEach(() => {
        const colIndex = result.findIndex(col => sourceLeafKeys.includes(getKey(col)));
        if (colIndex !== -1) {
            result.splice(colIndex, 1);
        }
    });

    // Find new target position (may have shifted due to removals)
    const newTargetStartIndex = result.findIndex(col => targetLeafKeys.includes(getKey(col)));

    // Insert source group columns at target position
    const insertPosition = sourceStartIndex < targetStartIndex
        ? newTargetStartIndex + targetColumns.length
        : newTargetStartIndex;

    result.splice(insertPosition, 0, ...sourceColumns);

    console.log('✅ Group reordering completed. New order:', result.map(c => getKey(c)));
    return result;
};

// Helper function to move a group before/after a column
const reorderGroupToColumn = (data: any[], getKey: (d: any) => any, sourceGroup: GroupedColumn, targetColumnKey: string, beforeTarget: boolean, groupedColumns: GroupedColumn[]) => {
    console.log(`📊 Moving group ${sourceGroup.key} to column ${targetColumnKey}`);

    // Get leaf column keys for the source group
    const sourceLeafKeys = getLeafColumnKeys(sourceGroup.key, groupedColumns);
    const sourceColumns = data.filter(col => sourceLeafKeys.includes(getKey(col)));
    const targetIndex = data.findIndex(col => getKey(col) === targetColumnKey);

    if (sourceColumns.length === 0 || targetIndex === -1) {
        console.log('❌ Could not find source columns or target position');
        console.log('  Source leaf keys:', sourceLeafKeys);
        console.log('  Source columns found:', sourceColumns.length);
        console.log('  Target column found:', targetIndex !== -1);
        return data;
    }

    // Remove source group columns
    const result = data.filter(col => !sourceLeafKeys.includes(getKey(col)));

    // Find new target index after removal
    const newTargetIndex = result.findIndex(col => getKey(col) === targetColumnKey);
    const insertPosition = beforeTarget ? newTargetIndex : newTargetIndex + 1;

    // Insert source columns at target position
    result.splice(insertPosition, 0, ...sourceColumns);

    console.log('✅ Group moved. New order:', result.map(c => getKey(c)));
    return result;
};

// Helper function to move a column before/after a group
const reorderColumnToGroup = (data: any[], getKey: (d: any) => any, sourceColumnKey: string, targetGroup: GroupedColumn, beforeTarget: boolean, groupedColumns: GroupedColumn[]) => {
    console.log(`📋 Moving column ${sourceColumnKey} to group ${targetGroup.key}`);

    const sourceColumn = data.find(col => getKey(col) === sourceColumnKey);

    // Get leaf column keys for the target group
    const targetLeafKeys = getLeafColumnKeys(targetGroup.key, groupedColumns);
    const firstTargetColumn = data.find(col => targetLeafKeys.includes(getKey(col)));

    if (!sourceColumn || !firstTargetColumn) {
        console.log('❌ Could not find source column or target group');
        console.log('  Source column found:', !!sourceColumn);
        console.log('  Target leaf keys:', targetLeafKeys);
        console.log('  First target column found:', !!firstTargetColumn);
        return data;
    }

    // Remove source column
    const result = data.filter(col => getKey(col) !== sourceColumnKey);

    // Find position of first column in target group using leaf keys
    const targetIndex = result.findIndex(col => targetLeafKeys.includes(getKey(col)));
    const insertPosition = beforeTarget ? targetIndex : targetIndex + targetLeafKeys.length;

    // Insert source column at target position
    result.splice(insertPosition, 0, sourceColumn);

    console.log('✅ Column moved. New order:', result.map(c => getKey(c)));
    return result;
};

export const reorderData = (data: any[], getKey: (d: any) => any, keyValue: any, targetKeyValue: any, groupedColumns?: GroupedColumn[]) => {
    // If no groupedColumns provided, use original behavior
    if (!groupedColumns || !groupedColumns.length) {
        const targetIdx = data.findIndex(d => getKey(d) === targetKeyValue);
        return reorderDataByIndex(data, getKey, keyValue, targetIdx);
    }

    // Check if source and target are group headers
    const sourceIsGroup = groupedColumns.some(gc => gc.key === keyValue);
    const targetIsGroup = groupedColumns.some(gc => gc.key === targetKeyValue);

    // If both are group headers, check if they're at the same root level first
    if (sourceIsGroup && targetIsGroup) {
        console.log(`🏷️ Group-to-group reordering: ${keyValue} → ${targetKeyValue}`);

        // Check if they're at the same root level
        if (!isSameRoot(keyValue, targetKeyValue, groupedColumns)) {
            console.log('❌ Group reordering blocked - different root levels');
            return data;
        }

        return reorderGroupBlocks(data, getKey, keyValue, targetKeyValue, groupedColumns);
    }

    // If one is a group header and one is an individual column, handle as root-level reordering
    if (sourceIsGroup || targetIsGroup) {
        console.log(`🔄 Mixed reordering (ungrouped ↔ group): ${keyValue} → ${targetKeyValue}`);

        // Check if they're at the same root level
        if (!isSameRoot(keyValue, targetKeyValue, groupedColumns)) {
            console.log('❌ Reordering blocked - different root levels');
            return data;
        }

        // For mixed reordering, find a representative column from the group
        if (sourceIsGroup) {
            // Source is group, target is column - move group before target column
            const sourceGroup = groupedColumns.find(gc => gc.key === keyValue)!;
            return reorderGroupToColumn(data, getKey, sourceGroup, targetKeyValue, true, groupedColumns);
        } else {
            // Source is column, target is group - move column before group
            const targetGroup = groupedColumns.find(gc => gc.key === targetKeyValue)!;
            return reorderColumnToGroup(data, getKey, keyValue, targetGroup, true, groupedColumns);
        }
    }

    // For individual columns, validate they exist in the data array
    const sourceExists = data.some(d => getKey(d) === keyValue);
    const targetExists = data.some(d => getKey(d) === targetKeyValue);

    if (!sourceExists || !targetExists) {
        console.log(`❌ Reordering blocked - keys don't exist in data array: source=${sourceExists}, target=${targetExists}`);
        return data; // Return unchanged data
    }

    // Check if source and target are at the same root level
    if (!isSameRoot(keyValue, targetKeyValue, groupedColumns)) {
        console.log(`❌ Reordering blocked - different root levels: ${keyValue} → ${targetKeyValue}`);
        return data; // Return unchanged data
    }

    console.log(`✅ Reordering allowed - same root level: ${keyValue} → ${targetKeyValue}`);
    const targetIndex = data.findIndex(d => getKey(d) === targetKeyValue);
    return reorderDataByIndex(data, getKey, keyValue, targetIndex);
};

export const checkIndexOdd = (index: number) => {
    return index % 2 !== 0;
}
