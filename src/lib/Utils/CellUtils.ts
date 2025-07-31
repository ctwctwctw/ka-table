import { ActionType, EditingMode } from '../enums';
import { Column, EditableCell } from '../models';
import { updateCellValue, updatePopupPosition } from '../actionCreators';

import { DispatchFunc } from '../types';
import { PopupPosition } from '../Models/PopupPosition';
import { getColumn } from './ColumnUtils';
import { getCopyOfArrayAndAddItem } from './ArrayUtils';
import { newRowId } from '../const';
import { replaceValue } from './DataUtils';

export const getNewRowEditableCells = (editableCells: EditableCell[]) => {
    return editableCells && editableCells.filter(c => c.rowKeyValue === newRowId)
};

export const getNewRowDataFromEditableCells = (editableCells: EditableCell[], columns: Column[]) => {
    return editableCells.reduce((acc, item) => {
        if (!item.hasOwnProperty('editorValue')) return acc;
        const column = getColumn(columns, item.columnKey);
        acc = replaceValue(acc, column!, item.editorValue);
        return acc;
    }, {});
};

export const isEditableCell = (editingMode: EditingMode, column: Column, rowEditableCells: EditableCell[]): boolean => {
    if (column.isEditable !== undefined) {
        return column.isEditable;
    }
    return !!rowEditableCells.find((c) => c.columnKey === column.key);
};

export const getEditableCell = (column: Column, rowEditableCells: EditableCell[]): EditableCell | undefined => {
    if (column.isEditable === false) {
        return undefined;
    }
    return rowEditableCells.find((c) => c.columnKey === column.key);
};

export const addItemToEditableCells = (
    item: EditableCell, editableCells: EditableCell[]): EditableCell[] => {
    return getCopyOfArrayAndAddItem(item, editableCells);
};

export const getCellEditorDispatchHandler = (dispatch: DispatchFunc) => {
    return (action: any) => {
        if (action.type === ActionType.UpdateEditorValue) {
            dispatch(updateCellValue(action.rowKeyValue, action.columnKey, action.value));
        } else {
            dispatch(action);
        }
    }
};

export const removeItemFromEditableCells = (
    item: EditableCell, editableCells: EditableCell[]): EditableCell[] => {
    return editableCells.filter((c) => c.columnKey !== item.columnKey || c.rowKeyValue !== item.rowKeyValue);
};

export const checkPopupPosition = (
    column: Column,
    refToElement: React.MutableRefObject<HTMLDivElement | null>,
    dispatch: DispatchFunc,
) => {
    const element = refToElement.current;
    if (element && column.isHeaderFilterPopupShown) {
        // Find the .ka container as our reference point (now has position: relative)
        const kaContainer = element.closest('.ka') as HTMLElement;
        const kaWrapper = element.closest('.ka-table-wrapper') as HTMLElement;

        // Find the filter button to position the popup below it
        const filterButton = element.querySelector('.ka-header-filter-button') as HTMLElement;

        if (filterButton && kaContainer) {
            // Calculate position relative to .ka container
            let xOffset = 0;
            let yOffset = 0;

            // Walk up the DOM tree to calculate offset relative to .ka container
            let currentElement: HTMLElement | null = element;
            while (currentElement && currentElement !== kaContainer) {
                xOffset += currentElement.offsetLeft;
                yOffset += currentElement.offsetTop;
                currentElement = currentElement.offsetParent as HTMLElement | null;
            }

            // Add the filter button's height to position popup below it
            const buttonHeight = filterButton.offsetHeight;

            const newPopupPosition: PopupPosition = {
                x: xOffset - (kaWrapper?.scrollLeft || 0),
                y: yOffset + buttonHeight
            }

            if (newPopupPosition.x !== column.headerFilterPopupPosition?.x || newPopupPosition.y !== column.headerFilterPopupPosition?.y) {
                dispatch(updatePopupPosition(newPopupPosition));
            }
        }
    }
}
