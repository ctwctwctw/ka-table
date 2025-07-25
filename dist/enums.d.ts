export declare enum PagingPosition {
    Bottom = "bottom",
    Top = "top",
    TopAndBottom = "topAndBottom"
}
export declare enum DataType {
    Boolean = "boolean",
    Date = "date",
    Number = "number",
    Object = "object",
    String = "string"
}
export declare enum EditingMode {
    None = "none",
    Cell = "cell"
}
export declare enum ActionType {
    ClearAllFilters = "ClearAllFilters",
    ClearFocused = "ClearFocused",
    ClearSingleAction = "ClearSingleAction",
    CloseEditor = "CloseEditor",
    CloseRowEditors = "CloseRowEditors",
    ComponentDidMount = "ComponentDidMount",
    DeleteRow = "DeleteRow",
    DeselectAllFilteredRows = "DeselectAllFilteredRows",
    DeselectAllRows = "DeselectAllRows",
    DeselectAllVisibleRows = "DeselectAllVisibleRows",
    DeselectRow = "DeselectRow",
    DeselectRows = "DeselectRows",
    GroupColumn = "GroupColumn",
    HideColumn = "HideColumn",
    HideDetailsRow = "HideDetailsRow",
    HideLoading = "HideLoading",
    HideNewRow = "HideNewRow",
    InsertRow = "InsertRow",
    LoadData = "LoadData",
    InsertColumn = "InsertColumn",
    MoveColumnBefore = "MoveColumnBefore",
    MoveColumnToIndex = "MoveColumnToIndex",
    MoveFocusedDown = "MoveFocusedDown",
    MoveFocusedLeft = "MoveFocusedLeft",
    MoveFocusedRight = "MoveFocusedRight",
    MoveFocusedUp = "MoveFocusedUp",
    OpenAllEditors = "OpenAllEditors",
    OpenEditor = "OpenEditor",
    OpenRowEditors = "OpenRowEditors",
    ReorderColumns = "ReorderColumns",
    ReorderRows = "ReorderRows",
    ResizeColumn = "ResizeColumn",
    SaveAllEditors = "SaveAllEditors",
    SaveNewRow = "SaveNewRow",
    SaveRowEditors = "SaveRowEditors",
    ScrollTable = "ScrollTable",
    Search = "Search",
    SelectAllFilteredRows = "SelectAllFilteredRows",
    SelectAllRows = "SelectAllRows",
    SelectAllVisibleRows = "SelectAllVisibleRows",
    SelectRow = "SelectRow",
    SelectRows = "SelectRows",
    SelectRowsRange = "SelectRowsRange",
    SelectSingleRow = "SelectSingleRow",
    SetFocused = "SetFocused",
    SetSingleAction = "SetSingleAction",
    ShowColumn = "ShowColumn",
    ShowDetailsRow = "ShowDetailsRow",
    ShowLoading = "ShowLoading",
    ShowNewRow = "ShowNewRow",
    UngroupColumn = "UngroupColumn",
    UpdateCellValue = "UpdateCellValue",
    UpdateData = "UpdateData",
    UpdateEditorValue = "UpdateEditorValue",
    UpdateFilterRowOperator = "UpdateFilterRowOperator",
    UpdateFilterRowValue = "UpdateFilterRowValue",
    UpdateGroupsExpanded = "UpdateGroupsExpanded",
    UpdateHeaderFilterSearchValue = "UpdateHeaderFilterSearchValue",
    UpdateHeaderFilterValues = "UpdateHeaderFilterValues",
    UpdateHeaderFilterPopupState = "UpdateHeaderFilterPopupState",
    UpdatePopupPosition = "UpdatePopupPosition",
    UpdatePageIndex = "UpdatePageIndex",
    UpdatePageSize = "UpdatePageSize",
    UpdatePagesCount = "UpdatePagesCount",
    UpdateRow = "UpdateRow",
    UpdateSortDirection = "UpdateSortDirection",
    UpdateTreeGroupsExpanded = "UpdateTreeGroupsExpanded",
    UpdateVirtualScrolling = "UpdateVirtualScrolling",
    Validate = "Validate"
}
export declare enum KeyboardEnum {
    Esc = 27,
    Enter = 13
}
export declare enum SortDirection {
    Ascend = "ascend",
    Descend = "descend"
}
export declare enum SortingMode {
    None = "none",
    Single = "single",
    SingleTripleState = "singleTripleState",
    SingleRemote = "singleRemote",
    SingleTripleStateRemote = "singleTripleStateRemote",
    MultipleRemote = "multipleRemote",
    MultipleTripleStateRemote = "multipleTripleStateRemote"
}
export declare enum FilteringMode {
    None = "none",
    FilterRow = "filterRow",
    HeaderFilter = "headerFilter",
    FilterRowAndHeaderFilter = "filterRowAndHeaderFilter"
}
export declare enum FilterOperatorName {
    Equal = "=",
    IsNotEqual = "!=",
    MoreThan = ">",
    LessThan = "<",
    MoreThanOrEqual = ">=",
    LessThanOrEqual = "<=",
    Contains = "contains",
    IsEmpty = "IsEmpty",
    IsNotEmpty = "IsNotEmpty"
}
export declare enum InsertRowPosition {
    before = "before",
    after = "after"
}
