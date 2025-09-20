import { IFilterRowEditorProps } from '../../props';
import React, { useState, useEffect } from 'react';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { updateFilterRowValue } from '../../actionCreators';

const FilterRowString: React.FunctionComponent<IFilterRowEditorProps> = (props) => {
    const {
        column,
        dispatch,
        childComponents
    } = props;

    // Local state for IME composition handling
    const [isComposing, setIsComposing] = useState(false);
    const [localValue, setLocalValue] = useState(column.filterRowValue || '');

    // Sync local state with props when not composing
    useEffect(() => {
        if (!isComposing) {
            setLocalValue(column.filterRowValue || '');
        }
    }, [column.filterRowValue, isComposing]);

    const { elementAttributes, content } = getElementCustomization<HTMLInputElement>({
        className: defaultOptions.css.textInput,
        type: 'search',
        value: localValue,
        onChange: (event) => {
            const value = event.currentTarget.value;
            setLocalValue(value);

            // Only dispatch immediately if not composing (for IME support)
            if (!isComposing) {
                dispatch(updateFilterRowValue(column.key, value));
            }
        },
        onCompositionStart: () => {
            setIsComposing(true);
        },
        onCompositionEnd: (event) => {
            setIsComposing(false);
            const value = event.currentTarget.value;
            setLocalValue(value);
            // Dispatch the final composed value
            dispatch(updateFilterRowValue(column.key, value));
        }
    }, props, childComponents?.filterRowCellInput);
    return (
        content || (<input {...elementAttributes} />)
    );
};

export default FilterRowString;
