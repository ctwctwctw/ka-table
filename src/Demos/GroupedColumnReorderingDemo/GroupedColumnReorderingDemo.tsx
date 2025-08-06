import React from 'react';

import { DataType, Table } from '../../lib';
import { Column } from '../../lib/models';
import { GroupedColumn } from '../../lib/Models/GroupedColumn';
import { SortingMode, FilteringMode } from '../../lib/enums';
import { kaReducer } from '../../lib/Reducers/kaReducer';

const columns: Column[] = Array(15).fill(undefined).map(
    (_, index) => ({
        key: 'column' + index,
        width: 120,
        title: 'Column ' + index,
        type: DataType.String,
    }),
);

const dataArray = Array(20).fill(undefined).map(
    (_, index) => columns.reduce((previousValue: any, column) => ({
        ...previousValue,
        [column.key]: `${column.key} row:${index}`
    }), { id: index }),
);

const GroupedColumnReorderingDemo: React.FC = () => {
    const initialGroupedColumns = [
        // Top-level group: Business Operations
        {
            key: 'grouped.business',
            title: '🏢 Business Operations',
            columnsKeys: ['grouped.sales', 'grouped.marketing']
        },
        // Sub-groups under Business Operations
        {
            key: 'grouped.sales',
            title: '📊 Sales',
            columnsKeys: ['column0', 'column1']
        },
        {
            key: 'grouped.marketing',
            title: '📢 Marketing',
            columnsKeys: ['column2', 'column3']
        },

        // Top-level group: Technical Division
        {
            key: 'grouped.technical',
            title: '⚙️ Technical Division',
            columnsKeys: ['grouped.development', 'grouped.operations']
        },
        // Sub-groups under Technical Division
        {
            key: 'grouped.development',
            title: '💻 Development',
            columnsKeys: ['column4', 'column5', 'column6']
        },
        {
            key: 'grouped.operations',
            title: '🔧 Operations',
            columnsKeys: ['column7', 'column8']
        },

        // Top-level group: Support Services
        {
            key: 'grouped.support',
            title: '🤝 Support Services',
            columnsKeys: ['grouped.hr', 'grouped.finance']
        },
        // Sub-groups under Support Services
        {
            key: 'grouped.hr',
            title: '👥 HR',
            columnsKeys: ['column9', 'column10']
        },
        {
            key: 'grouped.finance',
            title: '💰 Finance',
            columnsKeys: ['column11', 'column12']
        }
    ];

    const [tableProps, setTableProps] = React.useState({
        columnReordering: true,
        columns,
        data: dataArray,
        groupedColumns: initialGroupedColumns
        // Leave column13 and column14 ungrouped for testing
    });

    // Log the initial table structure
    console.log('🏗️ Demo initialized with structure:');
    console.log('📋 All columns:', columns.map(c => ({ key: c.key, title: c.title })));
    console.log('📊 Grouped columns:', initialGroupedColumns);
    console.log('🔗 Ungrouped columns:', columns.filter(c =>
        !initialGroupedColumns.some(gc => gc.columnsKeys.includes(c.key))
    ).map(c => ({ key: c.key, title: c.title })));

    const [dragCount, setDragCount] = React.useState(0);

    const onDispatch = (action: any) => {
        setDragCount(prev => prev + 1);
        console.log(`\n🎬 === ACTION #${dragCount + 1} DISPATCHED ===`);
        console.log('📋 Action:', action);
        console.log('⏰ Timestamp:', new Date().toLocaleTimeString());

        // Use the table's built-in reducer
        setTableProps(prevProps => {
            console.log('📊 BEFORE reducer - columns order:',
                prevProps.columns.map((c: Column) => c?.key).filter(Boolean).join(', ')
            );

            const newProps = kaReducer(prevProps, action);

            console.log('📊 AFTER reducer - columns order:',
                newProps.columns.map((c: Column) => c?.key).filter(Boolean).join(', ')
            );

            const changed = JSON.stringify(prevProps.columns) !== JSON.stringify(newProps.columns);
            console.log(`🔄 Columns changed: ${changed}`);
            if (changed) {
                console.log('✅ SUCCESS: Columns were reordered!');
            } else {
                console.log('❌ BLOCKED: Reordering was prevented!');
            }
            console.log('🎬 === END ACTION ===\n');

            return newProps;
        });
    };

    return (
        <div>
            <h3>Grouped Column Reordering Demo</h3>
            <div style={{ background: '#f0f8ff', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                <strong>🔍 Testing Info:</strong>
                <br />
                • Actions dispatched: <strong>{dragCount}</strong> | Open browser console for detailed logs
                <br />
                • <strong>Groups:</strong> Sales Team (4 cols) | Marketing Dept (2 cols) | Operations (3 cols) | Finance (3 cols) | HR (2 cols) | IT Dept (4 cols)
                <br />
                • <strong>Ungrouped:</strong> Column 18, Column 19
            </div>
            <p>
                <strong>Instructions:</strong>
                <br />
                • <strong>Individual columns</strong> can only be reordered within their parent group
                <br />
                • <strong>Group headers</strong> can be reordered to move entire groups
                <br />
                • <strong>Ungrouped columns</strong> (Column 18, 19) can move anywhere
                <br />
                • Try dragging different column types to see the constraints in action
            </p>

            <Table
                {...tableProps}
                dispatch={onDispatch}
                rowKeyField={'id'}
                sortingMode={SortingMode.Single}
                filteringMode={FilteringMode.HeaderFilter}
                childComponents={{
                    headCellContent: {
                        content: ({column, isGrouped, hasChildren}) => {
                            const isGroupHeader = isGrouped && hasChildren;
                            const isIndividualColumn = !hasChildren && !isGrouped;
                            const isUngrouped = !isGrouped && !hasChildren && !initialGroupedColumns.some(gc => gc.columnsKeys.includes(column.key));

                            return (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <img
                                        style={{cursor: 'move', width: '12px', height: '12px', opacity: 0.7}}
                                        src='static/icons/draggable.svg'
                                        alt='draggable'
                                        title={
                                            isGroupHeader ? 'Drag to reorder entire group' :
                                                isUngrouped ? 'Drag anywhere (ungrouped)' :
                                                    'Drag within group only'
                                        }
                                    />
                                    <span style={{
                                        fontWeight: isGroupHeader ? 'bold' : 'normal',
                                        color: isGroupHeader ? '#1d4ed8' : isUngrouped ? '#dc2626' : '#16a34a',
                                        fontSize: isGroupHeader ? '13px' : '12px'
                                    }}>
                                        {column.title}
                                    </span>
                                    {isGroupHeader && (
                                        <span style={{ fontSize: '10px', color: '#6b7280', fontStyle: 'italic' }}>
                                            (Group)
                                        </span>
                                    )}
                                    {isUngrouped && (
                                        <span style={{ fontSize: '10px', color: '#dc2626', fontStyle: 'italic' }}>
                                            (Free)
                                        </span>
                                    )}
                                </div>
                            );
                        }
                    }
                }}
            />
        </div>
    );
};

export default GroupedColumnReorderingDemo;
