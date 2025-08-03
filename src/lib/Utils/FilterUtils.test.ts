import { DataType, FilterOperatorName } from '../enums';
import {
    filterData,
    filterByHeaderFilter,
    getDefaultOperatorForType,
    getRowEditableCells,
    predefinedFilterOperators,
    searchData,
} from './FilterUtils';

import { Column } from '../Models/Column';
import { SearchFunc } from '../types';

describe('FilterUtils', () => {
    it('getRowEditableCells should return required cells from table EditableCells', () => {
        const rowEditableCells = getRowEditableCells(10, [{
            columnKey: '10',
            rowKeyValue: 10,
        }, {
            columnKey: '10',
            rowKeyValue: 2,
        }]);
        expect(rowEditableCells).toMatchSnapshot();
    });

    it('getDefaultOperatorForType', () => {
        expect(getDefaultOperatorForType(DataType.Number)).toBe('=');
        expect(getDefaultOperatorForType(DataType.Object)).toBe('=');
        expect(getDefaultOperatorForType(DataType.String)).toBe('contains');
    });

    describe('filterData', () => {
        const data: any[] = [
            { id: 1, name: 'Mike Wazowski', score: 80, passed: true, date: new Date(Date.UTC(2021, 11, 20, 9)) },
            { id: 2, name: 'Billi Bob', score: 55, passed: false, date: new Date(Date.UTC(2021, 11, 20, 13)) },
            { id: 3, name: 'Tom Williams', score: 45, passed: false, date: new Date(Date.UTC(2021, 10, 20, 13)) },
            { id: 4, name: 'Kurt Cobain', score: 75, passed: true, date: new Date(Date.UTC(2021, 11, 19, 13)) },
            { id: 5, name: 'Marshall Bruce', score: 77, passed: true, date: null },
            { id: 6, name: 'Sunny Fox', score: 33, passed: false, date: new Date(Date.UTC(2021, 11, 17, 13)) },
        ];
        it('one item', () => {
            const columns = [{
                filterRowValue: 'Billi Bob',
                key: 'name',
            }];
            const result = filterData(data, columns);
            expect(result).toMatchSnapshot();
        });

        it('by date', () => {
            const columnsDate: Column[] = [
                {
                    dataType: DataType.Date,
                    filterRowValue: new Date(Date.UTC(2021, 11, 20, 19, 18, 12)),
                    key: 'date',
                },
            ];
            const result = filterData(data, columnsDate);
            expect(result).toMatchSnapshot();
        });

        it('IsEmpty for date', () => {
            const columnsDate: Column[] = [
                {
                    dataType: DataType.Date,
                    filterRowOperator: FilterOperatorName.IsEmpty,
                    key: 'date',
                },
            ];
            const result = filterData(data, columnsDate);
            expect(result).toMatchSnapshot();
        });

        it('IsNotEmpty for date', () => {
            const columnsDate: Column[] = [
                {
                    dataType: DataType.Date,
                    filterRowOperator: FilterOperatorName.IsNotEmpty,
                    key: 'date',
                },
            ];
            const result = filterData(data, columnsDate);
            expect(result).toMatchSnapshot();
        });

        it('two item', () => {
            const columns = [{
                filterRowValue: 'Billi Bob',
                key: 'name',
            }, {
                dataType: DataType.Number,
                filterRowValue: 45,
                key: 'score',
            }];
            const result = filterData(data, columns);
            expect(result).toMatchSnapshot();
        });

        it('custom filter', () => {
            const columns = [{
                dataType: DataType.Number,
                filterRowValue: 45,
                key: 'score',
            }];
            const result = filterData(data, columns, ({ column }) => {
                if (column.key === 'score'){
                    return (value, filterValue) => value !== filterValue;
                }
            });
            expect(result).toMatchSnapshot();
        });

        it('custom filter: column with data type = "date" should not change filterRowValue', () => {
            const columns = [{
                dataType: DataType.Date,
                filterRowValue: ['date 1'],
                key: 'date',
            }];
            const result = filterData(data, columns, ({ column }) => {
                if (column.key === 'date'){
                    return (value, filterValue) => {
                        return filterValue[0] === 'date 1' && value === data[0].date
                    };
                }
            });
            expect(result).toMatchSnapshot();
        });

        it('should throw an error in case of unknown filterOperator', () => {
            const columns = [{
                filterRowOperator: 'unknownOperator',
                filterRowValue: 'Billi Bob',
                key: 'name',
            }];
            expect(() => filterData(data, columns)).toThrow('\'unknownOperator\' has not found in predefinedFilterOperators array, available operators: =, !=, >, <, >=, <=, contains, IsEmpty, IsNotEmpty');
        });

        it('custom column filter', () => {
            const columns = [{
                dataType: DataType.Number,
                filterRowValue: 45,
                key: 'score',
                filter: (value: any, filterValue: any) => value === filterValue,
            }];
            const result = filterData(data, columns);
            expect(result).toMatchSnapshot();
        });
    });

    [{
        falsy: [1, 2],
        name: '=',
        truthy: [1, 1],
    }, {
        falsy: [1, 1],
        name: '>',
        truthy: [2, 1],
    }, {
        falsy: [2, 1],
        name: '<',
        truthy: [1, 2],
    }, {
        falsy: [1, 2],
        name: '>=',
        truthy: [1, 1],
    }, {
        falsy: [2, 1],
        name: '<=',
        truthy: [1, 1],
    }, {
        falsy: ['abs', 'ss'],
        name: 'contains',
        truthy: ['hello', 'hell'],
    }, {
        falsy: [0, false],
        name: 'contains',
        truthy: [0, 0],
    }].forEach((d) => {
        it(`predefinedFilterOperators operator ${d.name} truthy: ${d.truthy} falsy: ${d.falsy}`, () => {
            const operator = predefinedFilterOperators.find((o) => o.name === d.name);
            if (!operator) {
                throw new Error(`${d.name} was not found`);
            }
            expect(operator.compare(d.truthy[0], d.truthy[1])).toBeTruthy();
            expect(operator.compare(d.falsy[0], d.falsy[1])).toBeFalsy();
        });
    });

    [{
        name: '=',
        nullShouldPass: false,
        undefinedShouldPass: false,
        value: 1,
    }, {
        name: '>',
        nullShouldPass: false,
        undefinedShouldPass: false,
        value: 1,
    }, {
        name: '<',
        nullShouldPass: true,
        undefinedShouldPass: false,
        value: 1,
    }, {
        name: '>=',
        nullShouldPass: false,
        undefinedShouldPass: false,
        value: 1,
    }, {
        name: '<=',
        nullShouldPass: true,
        undefinedShouldPass: false,
        value: 1,
    }, {
        name: 'contains',
        nullShouldPass: false,
        undefinedShouldPass: false,
        value: 1,
    }].forEach((d) => {
        it(`predefinedFilterOperators check null and undefined for ${d.name} operator`, () => {
            const operator = predefinedFilterOperators.find((o) => o.name === d.name);
            if (!operator) {
                throw new Error(`${d.name} was not found`);
            }
            expect(operator.compare(null, 1)).toEqual(d.nullShouldPass);
            expect(operator.compare(undefined, 1)).toEqual(d.undefinedShouldPass);
        });
    });

    describe('searchData', () => {
        const search: SearchFunc = ({ searchText, rowData, column }) => {
            if (column.key === 'passed')
                return (searchText === 'false' && !rowData.passed) || (searchText === 'true' && rowData.passed);
        };
        const columns: Column[] = [
            { key: 'name', title: 'Name', dataType: DataType.String },
            { key: 'score', title: 'Score', dataType: DataType.Number },
            {
                dataType: DataType.Boolean,
                key: 'passed',
                title: 'Passed',
            },
        ];
        const data: any[] = [
            { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
            { id: 2, name: 'Billi Bob', score: 55, passed: false },
            { id: 3, name: 'Tom Williams', score: 45, passed: false },
            { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
            { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
            { id: 6, name: 'Sunny Fox', score: 33, passed: false },
            { id: 7, name: 'Falsey False', score: 33, passed: false },
        ];
        it('by string', () => {
            const result = searchData(columns, data, 'Mike', search);
            expect(result).toMatchSnapshot();
        });

        it('by boolean', () => {
            const columnsBoolean: Column[] = [
                {
                    dataType: DataType.Boolean,
                    key: 'passed',
                    title: 'Passed',
                },
            ];
            const result = searchData(columnsBoolean, data, 'tru');
            expect(result).toMatchSnapshot();
        });

        it('should add item only once', () => {
            const result = searchData(columns, data, 'false', search);
            expect(result).toMatchSnapshot();
        });

        it('should not find value by search handler', () => {
            const result = searchData(columns, data, 'tru', search);
            expect(result).toMatchSnapshot();
        });

        it('should find value by search handler', () => {
            const result = searchData(columns, data, 'true', search);
            expect(result).toMatchSnapshot();
        });
    });

    describe('filterByHeaderFilter', () => {
        const testData = [
            { id: 1, name: 'John', date: '2023-12-25', score: 85 },
            { id: 2, name: 'Jane', date: '2023-11-15', score: 92 },
            { id: 3, name: 'Bob', date: null, score: 78 },
            { id: 4, name: 'Alice', date: undefined, score: 95 },
            { id: 5, name: 'Charlie', date: '', score: 88 },
            { id: 6, name: 'David', date: 'invalid-date', score: 82 },
            { id: 7, name: 'Eve', date: 'not-a-date', score: 77 },
            { id: 8, name: 'Frank', date: '2023-12-25T10:30:00Z', score: 90 },
            { id: 9, name: 'Grace', date: new Date('2023-11-15'), score: 86 }
        ];

        describe('Date filtering - Valid dates', () => {
            it('should filter by exact date string match', () => {
                const columns: Column[] = [{
                    key: 'date',
                    dataType: DataType.Date,
                    headerFilterValues: ['2023-12-25']
                }];

                const result = filterByHeaderFilter(testData, columns);
                expect(result).toHaveLength(1);
                expect(result[0].id).toBe(1);
                expect(result[0].name).toBe('John');
                expect(result[0].date).toBe('2023-12-25');
            });

            it('should filter by ISO datetime string', () => {
                const columns: Column[] = [{
                    key: 'date',
                    dataType: DataType.Date,
                    headerFilterValues: ['2023-12-25T10:30:00Z']
                }];

                const result = filterByHeaderFilter(testData, columns);
                expect(result).toHaveLength(1);
                expect(result[0].id).toBe(8);
                expect(result[0].name).toBe('Frank');
            });

            it('should filter by Date object', () => {
                const columns: Column[] = [{
                    key: 'date',
                    dataType: DataType.Date,
                    headerFilterValues: [new Date('2023-11-15').toString()]
                }];

                const result = filterByHeaderFilter(testData, columns);
                expect(result).toHaveLength(1);
                expect(result[0].id).toBe(9);
                expect(result[0].name).toBe('Grace');
            });

            it('should filter by multiple valid dates', () => {
                const columns: Column[] = [{
                    key: 'date',
                    dataType: DataType.Date,
                    headerFilterValues: ['2023-12-25', '2023-11-15']
                }];

                const result = filterByHeaderFilter(testData, columns);
                expect(result).toHaveLength(2);
                expect(result.map(r => r.id).sort()).toEqual([1, 2]);
                expect(result.map(r => r.name).sort()).toEqual(['Jane', 'John']);
            });
        });

        describe('Date filtering - Unset dates detailed', () => {
            it('should filter null dates specifically', () => {
                const nullOnlyData = [
                    { id: 1, date: null },
                    { id: 2, date: undefined },
                    { id: 3, date: '' },
                    { id: 4, date: '2023-12-25' }
                ];

                const columns: Column[] = [{
                    key: 'date',
                    dataType: DataType.Date,
                    headerFilterValues: ['unset']
                }];

                const result = filterByHeaderFilter(nullOnlyData, columns);
                expect(result).toHaveLength(3);
                expect(result.map(r => r.id).sort()).toEqual([1, 2, 3]);
                expect(result.every(r => r.date == null || r.date === '')).toBe(true);
            });

            it('should filter undefined dates specifically', () => {
                const columns: Column[] = [{
                    key: 'date',
                    dataType: DataType.Date,
                    headerFilterValues: ['unset']
                }];

                const result = filterByHeaderFilter([testData[3]], columns); // Alice with undefined
                expect(result).toHaveLength(1);
                expect(result[0].date).toBeUndefined();
                expect(result[0].name).toBe('Alice');
            });

            it('should filter empty string dates specifically', () => {
                const columns: Column[] = [{
                    key: 'date',
                    dataType: DataType.Date,
                    headerFilterValues: ['unset']
                }];

                const result = filterByHeaderFilter([testData[4]], columns); // Charlie with ''
                expect(result).toHaveLength(1);
                expect(result[0].date).toBe('');
                expect(result[0].name).toBe('Charlie');
            });

            it('should filter invalid date strings specifically', () => {
                const columns: Column[] = [{
                    key: 'date',
                    dataType: DataType.Date,
                    headerFilterValues: ['unset']
                }];

                const invalidDateData = [testData[5], testData[6]]; // David and Eve with invalid dates
                const result = filterByHeaderFilter(invalidDateData, columns);
                expect(result).toHaveLength(2);
                expect(result.map(r => r.name).sort()).toEqual(['David', 'Eve']);
                expect(result.every(r => isNaN(new Date(r.date).getTime()))).toBe(true);
            });

            it('should handle all unset types together', () => {
                const columns: Column[] = [{
                    key: 'date',
                    dataType: DataType.Date,
                    headerFilterValues: ['unset']
                }];

                const result = filterByHeaderFilter(testData, columns);
                expect(result).toHaveLength(5); // Bob(null), Alice(undefined), Charlie(''), David('invalid-date'), Eve('not-a-date')
                expect(result.map(r => r.id).sort()).toEqual([3, 4, 5, 6, 7]);

                // Verify each unset type is included
                const nullItem = result.find(r => r.date === null);
                const undefinedItem = result.find(r => r.date === undefined);
                const emptyItem = result.find(r => r.date === '');
                const invalidItems = result.filter(r => typeof r.date === 'string' && r.date !== '' && isNaN(new Date(r.date).getTime()));

                expect(nullItem).toBeDefined();
                expect(undefinedItem).toBeDefined();
                expect(emptyItem).toBeDefined();
                expect(invalidItems).toHaveLength(2);
            });
        });

        describe('Date filtering - Mixed scenarios', () => {
            it('should filter by both valid dates and unset dates with detailed verification', () => {
                const columns: Column[] = [{
                    key: 'date',
                    dataType: DataType.Date,
                    headerFilterValues: ['2023-12-25', 'unset']
                }];

                const result = filterByHeaderFilter(testData, columns);
                expect(result).toHaveLength(6); // John + 5 unset items

                // Check valid date item
                const validDateItem = result.find(r => r.date === '2023-12-25');
                expect(validDateItem).toBeDefined();
                expect(validDateItem?.name).toBe('John');

                // Check unset items
                const unsetItems = result.filter(r => r.date !== '2023-12-25');
                expect(unsetItems).toHaveLength(5);
                expect(unsetItems.map(r => r.id).sort()).toEqual([3, 4, 5, 6, 7]);
            });

            it('should prioritize exact date match over format function', () => {
                const mockFormat = jest.fn((props) => {
                    if (props.value === '2023-12-25') return '2023-12-25'; // Return exact match
                    return 'formatted-' + props.value;
                });

                const columns: Column[] = [{
                    key: 'date',
                    dataType: DataType.Date,
                    headerFilterValues: ['2023-12-25']
                }];

                const result = filterByHeaderFilter(testData, columns, mockFormat);
                expect(result).toHaveLength(1);
                expect(result[0].date).toBe('2023-12-25');
                expect(mockFormat).toHaveBeenCalled();
            });

            it('should work with custom format function for dates with detailed assertions', () => {
                const mockFormat = jest.fn((props) => {
                    if (props.value === '2023-12-25') return 'Christmas';
                    if (props.value === '2023-11-15') return 'Mid November';
                    if (props.value == null) return 'No Date';
                    return props.value?.toString();
                });

                const columns: Column[] = [{
                    key: 'date',
                    dataType: DataType.Date,
                    headerFilterValues: ['Christmas', 'Mid November']
                }];

                const result = filterByHeaderFilter(testData, columns, mockFormat);
                expect(result).toHaveLength(2);
                expect(result.map(r => r.name).sort()).toEqual(['Jane', 'John']);
                expect(mockFormat).toHaveBeenCalledTimes(testData.length);

                // Verify format function was called with correct parameters
                const formatCalls = mockFormat.mock.calls;
                expect(formatCalls.some(call => call[0].value === '2023-12-25')).toBe(true);
                expect(formatCalls.some(call => call[0].value === '2023-11-15')).toBe(true);
            });

            it('should handle custom filter function for dates with parameter verification', () => {
                const customFilter = jest.fn((value, headerFilterValues, item) => {
                    return item.score >= 90; // Changed to >= to include Frank with score 90
                });

                const columns: Column[] = [{
                    key: 'date',
                    dataType: DataType.Date,
                    headerFilterValues: ['any-value'],
                    filter: customFilter
                }];

                const result = filterByHeaderFilter(testData, columns);
                expect(result).toHaveLength(3); // Jane(92), Alice(95), Frank(90)
                expect(result.map(r => r.name).sort()).toEqual(['Alice', 'Frank', 'Jane']);
                expect(customFilter).toHaveBeenCalledTimes(testData.length);

                // Verify custom filter was called with correct parameters
                const filterCalls = customFilter.mock.calls;
                expect(filterCalls[0]).toEqual([testData[0].date, ['any-value'], testData[0]]);
                expect(filterCalls[1]).toEqual([testData[1].date, ['any-value'], testData[1]]);
            });
        });

        describe('Non-date filtering - Detailed', () => {
            it('should filter string columns by exact match', () => {
                const columns: Column[] = [{
                    key: 'name',
                    dataType: DataType.String,
                    headerFilterValues: ['John', 'Jane']
                }];

                const result = filterByHeaderFilter(testData, columns);
                expect(result).toHaveLength(2);
                expect(result.map(r => r.name).sort()).toEqual(['Jane', 'John']);
                expect(result.map(r => r.id).sort()).toEqual([1, 2]);
            });

            it('should filter number columns by exact match', () => {
                const columns: Column[] = [{
                    key: 'score',
                    dataType: DataType.Number,
                    headerFilterValues: ['85', '92']
                }];

                const result = filterByHeaderFilter(testData, columns);
                expect(result).toHaveLength(2);
                expect(result.map(r => r.score).sort()).toEqual([85, 92]);
                expect(result.map(r => r.name).sort()).toEqual(['Jane', 'John']);
            });

            it('should handle single value filtering', () => {
                const columns: Column[] = [{
                    key: 'name',
                    dataType: DataType.String,
                    headerFilterValues: ['Bob']
                }];

                const result = filterByHeaderFilter(testData, columns);
                expect(result).toHaveLength(1);
                expect(result[0].name).toBe('Bob');
                expect(result[0].id).toBe(3);
                expect(result[0].date).toBeNull();
            });

            it('should handle case sensitivity for strings', () => {
                const columns: Column[] = [{
                    key: 'name',
                    dataType: DataType.String,
                    headerFilterValues: ['john', 'JANE'] // different case
                }];

                const result = filterByHeaderFilter(testData, columns);
                expect(result).toHaveLength(0); // Should not match different case
            });

            it('should work with format function for non-date columns', () => {
                const mockFormat = jest.fn((props) => {
                    return props.value?.toString().toUpperCase();
                });

                const columns: Column[] = [{
                    key: 'name',
                    dataType: DataType.String,
                    headerFilterValues: ['JOHN', 'JANE']
                }];

                const result = filterByHeaderFilter(testData, columns, mockFormat);
                expect(result).toHaveLength(2);
                expect(result.map(r => r.name).sort()).toEqual(['Jane', 'John']);
                expect(mockFormat).toHaveBeenCalledTimes(testData.length);

                // Verify format function parameters
                const formatCalls = mockFormat.mock.calls;
                expect(formatCalls[0][0]).toEqual({
                    column: columns[0],
                    value: 'John',
                    rowData: testData[0]
                });
            });

            it('should work with custom filter for non-date columns with detailed verification', () => {
                const customFilter = jest.fn((value, headerFilterValues, item) => {
                    return headerFilterValues.includes(value) && item.score > 85;
                });

                const columns: Column[] = [{
                    key: 'name',
                    dataType: DataType.String,
                    headerFilterValues: ['John', 'Jane', 'Alice'],
                    filter: customFilter
                }];

                const result = filterByHeaderFilter(testData, columns);
                expect(result).toHaveLength(2); // Jane(92) and Alice(95), not John(85)
                expect(result.map(r => r.name).sort()).toEqual(['Alice', 'Jane']);
                expect(customFilter).toHaveBeenCalledTimes(testData.length);

                // Verify custom filter parameters
                const filterCalls = customFilter.mock.calls;
                expect(filterCalls[0]).toEqual(['John', ['John', 'Jane', 'Alice'], testData[0]]);
                expect(filterCalls[1]).toEqual(['Jane', ['John', 'Jane', 'Alice'], testData[1]]);
            });

            it('should handle null/undefined values in non-date columns', () => {
                const dataWithNulls = [
                    { id: 1, name: null, score: 85 },
                    { id: 2, name: undefined, score: 92 },
                    { id: 3, name: 'John', score: 78 },
                    { id: 4, name: '', score: 95 }
                ];

                const columns: Column[] = [{
                    key: 'name',
                    dataType: DataType.String,
                    headerFilterValues: ['John']
                }];

                const result = filterByHeaderFilter(dataWithNulls, columns);
                expect(result).toHaveLength(1);
                expect(result[0].name).toBe('John');
                expect(result[0].id).toBe(3);
            });
        });

        describe('GroupedColumn handling - Detailed', () => {
            it('should skip GroupedColumn without headerFilterValues property', () => {
                const groupedColumn = {
                    key: 'grouped',
                    title: 'Grouped Column',
                    columnsKeys: ['name', 'date']
                } as any; // GroupedColumn-like object

                const regularColumn: Column = {
                    key: 'name',
                    dataType: DataType.String,
                    headerFilterValues: ['John']
                };

                const columns = [groupedColumn, regularColumn];
                const result = filterByHeaderFilter(testData, columns);

                // Should only filter by the regular column, ignore the grouped column
                expect(result).toHaveLength(1);
                expect(result[0].name).toBe('John');
                expect(result[0].id).toBe(1);

                // Verify the grouped column didn't interfere
                expect(result).toEqual([testData[0]]);
            });

            it('should handle GroupedColumn with undefined headerFilterValues', () => {
                const groupedColumnWithUndefined = {
                    key: 'grouped',
                    title: 'Grouped Column',
                    columnsKeys: ['name', 'date'],
                    headerFilterValues: undefined
                } as any;

                const regularColumn: Column = {
                    key: 'score',
                    dataType: DataType.Number,
                    headerFilterValues: ['85', '92']
                };

                const columns = [groupedColumnWithUndefined, regularColumn];
                const result = filterByHeaderFilter(testData, columns);

                // Should filter by score only, ignoring grouped column
                expect(result).toHaveLength(2);
                expect(result.map(r => r.score).sort()).toEqual([85, 92]);
                expect(result.map(r => r.name).sort()).toEqual(['Jane', 'John']);
            });

            it('should handle multiple GroupedColumns mixed with regular columns', () => {
                const groupedColumn1 = {
                    key: 'grouped1',
                    title: 'First Group',
                    columnsKeys: ['name', 'score']
                } as any;

                const groupedColumn2 = {
                    key: 'grouped2',
                    title: 'Second Group',
                    columnsKeys: ['date']
                } as any;

                const dateColumn: Column = {
                    key: 'date',
                    dataType: DataType.Date,
                    headerFilterValues: ['unset']
                };

                const nameColumn: Column = {
                    key: 'name',
                    dataType: DataType.String,
                    headerFilterValues: ['Bob', 'Alice']
                };

                const columns = [groupedColumn1, dateColumn, groupedColumn2, nameColumn];
                const result = filterByHeaderFilter(testData, columns);

                // Should find items matching both regular columns (date=unset AND name in ['Bob', 'Alice'])
                // Bob has null date and name 'Bob' - matches both
                // Alice has undefined date and name 'Alice' - matches both
                expect(result).toHaveLength(2); // Bob and Alice match both filters
                expect(result.map(r => r.name).sort()).toEqual(['Alice', 'Bob']);
                expect(result.map(r => r.id).sort()).toEqual([3, 4]);
            });

            it('should handle mixed Column and GroupedColumn objects with detailed verification', () => {
                const groupedColumn = {
                    key: 'grouped',
                    title: 'Grouped'
                } as any;

                const dateColumn: Column = {
                    key: 'date',
                    dataType: DataType.Date,
                    headerFilterValues: ['unset']
                };

                const nameColumn: Column = {
                    key: 'name',
                    dataType: DataType.String,
                    headerFilterValues: ['Bob']
                };

                const columns = [groupedColumn, dateColumn, nameColumn];
                const result = filterByHeaderFilter(testData, columns);

                // Should find Bob (who has null date - matches both filters)
                expect(result).toHaveLength(1);
                expect(result[0].name).toBe('Bob');
                expect(result[0].date).toBeNull();
                expect(result[0].id).toBe(3);
                expect(result[0].score).toBe(78);
                expect(result).toEqual([testData[2]]);
            });

            it('should verify hasOwnProperty check works correctly', () => {
                // Test object that has headerFilterValues in prototype but not own property
                const prototypeObject = { headerFilterValues: ['test'] };
                const groupedColumnWithInheritance = Object.create(prototypeObject);
                groupedColumnWithInheritance.key = 'inherited';
                groupedColumnWithInheritance.title = 'Inherited';

                const regularColumn: Column = {
                    key: 'name',
                    dataType: DataType.String,
                    headerFilterValues: ['John', 'Jane']
                };

                const columns = [groupedColumnWithInheritance, regularColumn];
                const result = filterByHeaderFilter(testData, columns);

                // Should only filter by regular column since inherited object doesn't have own headerFilterValues
                expect(result).toHaveLength(2);
                expect(result.map(r => r.name).sort()).toEqual(['Jane', 'John']);
            });

            it('should handle empty columns array with GroupedColumns', () => {
                const groupedColumn = {
                    key: 'grouped',
                    title: 'Grouped Column'
                } as any;

                const columns = [groupedColumn];
                const result = filterByHeaderFilter(testData, columns);

                // Should return all data since no valid filtering columns
                expect(result).toHaveLength(testData.length);
                expect(result).toEqual(testData);
            });

            it('should preserve filtering order with GroupedColumns', () => {
                const groupedColumn = {
                    key: 'grouped',
                    title: 'Grouped Column'
                } as any;

                const firstFilter: Column = {
                    key: 'score',
                    dataType: DataType.Number,
                    headerFilterValues: ['85', '92', '95']
                };

                const secondFilter: Column = {
                    key: 'name',
                    dataType: DataType.String,
                    headerFilterValues: ['John', 'Jane', 'Alice']
                };

                const columns = [groupedColumn, firstFilter, secondFilter];
                const result = filterByHeaderFilter(testData, columns);

                // Should apply filters in order: first score, then name
                expect(result).toHaveLength(3); // John(85), Jane(92), Alice(95)
                expect(result.map(r => r.name).sort()).toEqual(['Alice', 'Jane', 'John']);
                expect(result.map(r => r.score).sort()).toEqual([85, 92, 95]);
            });
        });

        describe('Empty cases - Detailed', () => {
            it('should return all data when no columns have headerFilterValues', () => {
                const columns: Column[] = [{
                    key: 'name',
                    dataType: DataType.String
                }, {
                    key: 'score',
                    dataType: DataType.Number
                }];

                const result = filterByHeaderFilter(testData, columns);
                expect(result).toHaveLength(testData.length);
                expect(result).toEqual(testData);
                expect(result.map(r => r.id)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            });

            it('should return all data when headerFilterValues is empty array', () => {
                const columns: Column[] = [{
                    key: 'name',
                    dataType: DataType.String,
                    headerFilterValues: []
                }, {
                    key: 'score',
                    dataType: DataType.Number,
                    headerFilterValues: []
                }];

                const result = filterByHeaderFilter(testData, columns);
                expect(result).toHaveLength(testData.length);
                expect(result).toEqual(testData);
            });

            it('should return all data when headerFilterValues is null', () => {
                const columns: Column[] = [{
                    key: 'name',
                    dataType: DataType.String,
                    headerFilterValues: null as any
                }];

                const result = filterByHeaderFilter(testData, columns);
                expect(result).toHaveLength(testData.length);
                expect(result).toEqual(testData);
            });

            it('should return all data when headerFilterValues is undefined', () => {
                const columns: Column[] = [{
                    key: 'name',
                    dataType: DataType.String,
                    headerFilterValues: undefined as any
                }];

                const result = filterByHeaderFilter(testData, columns);
                expect(result).toHaveLength(testData.length);
                expect(result).toEqual(testData);
            });

            it('should return empty array when no data matches single filter', () => {
                const columns: Column[] = [{
                    key: 'name',
                    dataType: DataType.String,
                    headerFilterValues: ['NonExistentName']
                }];

                const result = filterByHeaderFilter(testData, columns);
                expect(result).toHaveLength(0);
                expect(result).toEqual([]);
            });

            it('should return empty array when no data matches multiple filters', () => {
                const columns: Column[] = [{
                    key: 'name',
                    dataType: DataType.String,
                    headerFilterValues: ['John', 'Jane']
                }, {
                    key: 'score',
                    dataType: DataType.Number,
                    headerFilterValues: ['999'] // Non-existent score
                }];

                const result = filterByHeaderFilter(testData, columns);
                expect(result).toHaveLength(0);
                expect(result).toEqual([]);
            });

            it('should handle empty data array', () => {
                const columns: Column[] = [{
                    key: 'name',
                    dataType: DataType.String,
                    headerFilterValues: ['John']
                }];

                const result = filterByHeaderFilter([], columns);
                expect(result).toHaveLength(0);
                expect(result).toEqual([]);
            });

            it('should handle empty columns array', () => {
                const result = filterByHeaderFilter(testData, []);
                expect(result).toHaveLength(testData.length);
                expect(result).toEqual(testData);
            });
        });

        describe('Multiple columns - Detailed', () => {
            it('should filter by multiple string columns (AND logic)', () => {
                const columns: Column[] = [{
                    key: 'name',
                    dataType: DataType.String,
                    headerFilterValues: ['John', 'Jane', 'Bob']
                }, {
                    key: 'name', // Same column with different values (should use AND)
                    dataType: DataType.String,
                    headerFilterValues: ['John'] // Narrower filter
                }];

                const result = filterByHeaderFilter(testData, columns);
                expect(result).toHaveLength(1);
                expect(result[0].name).toBe('John');
                expect(result[0].id).toBe(1);
            });

            it('should filter by string and number columns (AND logic)', () => {
                const columns: Column[] = [{
                    key: 'name',
                    dataType: DataType.String,
                    headerFilterValues: ['John', 'Jane', 'Alice']
                }, {
                    key: 'score',
                    dataType: DataType.Number,
                    headerFilterValues: ['92', '95'] // Only Jane and Alice
                }];

                const result = filterByHeaderFilter(testData, columns);
                expect(result).toHaveLength(2);
                expect(result.map(r => r.name).sort()).toEqual(['Alice', 'Jane']);
                expect(result.map(r => r.score).sort()).toEqual([92, 95]);
            });

            it('should filter by date and string columns (AND logic)', () => {
                const columns: Column[] = [{
                    key: 'name',
                    dataType: DataType.String,
                    headerFilterValues: ['John', 'Jane']
                }, {
                    key: 'date',
                    dataType: DataType.Date,
                    headerFilterValues: ['2023-12-25']
                }];

                const result = filterByHeaderFilter(testData, columns);
                expect(result).toHaveLength(1); // Only John matches both conditions
                expect(result[0].name).toBe('John');
                expect(result[0].date).toBe('2023-12-25');
                expect(result[0].id).toBe(1);
            });

            it('should filter by unset dates and specific names', () => {
                const columns: Column[] = [{
                    key: 'date',
                    dataType: DataType.Date,
                    headerFilterValues: ['unset']
                }, {
                    key: 'name',
                    dataType: DataType.String,
                    headerFilterValues: ['Bob', 'Alice', 'Charlie']
                }];

                const result = filterByHeaderFilter(testData, columns);
                expect(result).toHaveLength(3); // Bob(null), Alice(undefined), Charlie('')
                expect(result.map(r => r.name).sort()).toEqual(['Alice', 'Bob', 'Charlie']);
                expect(result.map(r => r.id).sort()).toEqual([3, 4, 5]);

                // Verify all have unset dates
                expect(result.every(r => r.date == null || r.date === '')).toBe(true);
            });

            it('should handle complex multi-column filtering with custom format', () => {
                const mockFormat = jest.fn((props) => {
                    if (props.column.key === 'score') {
                        return props.value > 90 ? 'high' : 'low';
                    }
                    return props.value?.toString();
                });

                const columns: Column[] = [{
                    key: 'name',
                    dataType: DataType.String,
                    headerFilterValues: ['Jane', 'Alice', 'Frank']
                }, {
                    key: 'score',
                    dataType: DataType.Number,
                    headerFilterValues: ['high'] // Using format function
                }];

                const result = filterByHeaderFilter(testData, columns, mockFormat);
                expect(result).toHaveLength(2); // Jane(92), Alice(95) - both have score > 90
                expect(result.map(r => r.name).sort()).toEqual(['Alice', 'Jane']);
                expect(result.every(r => r.score > 90)).toBe(true);
                expect(mockFormat).toHaveBeenCalled();
            });

            it('should verify filter application order matters', () => {
                // First filter reduces to 3 items, second filter further reduces
                const columns: Column[] = [{
                    key: 'score',
                    dataType: DataType.Number,
                    headerFilterValues: ['85', '92', '95'] // John, Jane, Alice
                }, {
                    key: 'name',
                    dataType: DataType.String,
                    headerFilterValues: ['Jane', 'Alice'] // Excludes John
                }];

                const result = filterByHeaderFilter(testData, columns);
                expect(result).toHaveLength(2); // Jane and Alice
                expect(result.map(r => r.name).sort()).toEqual(['Alice', 'Jane']);
                expect(result.map(r => r.score).sort()).toEqual([92, 95]);
            });
        });
    });
});
