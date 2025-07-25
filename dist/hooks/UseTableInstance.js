"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTableInstance = void 0;
var TableUncontrolled_1 = require("../Components/TableUncontrolled/TableUncontrolled");
var react_1 = require("react");
var useTableInstance = function () {
    var context = (0, react_1.useContext)(TableUncontrolled_1.TableInstanceContext);
    if (!(context === null || context === void 0 ? void 0 : context.changeProps)) {
        // eslint-disable-next-line
        console.warn('useTableInstance warning: ka-table is not initialized, instanse is empty because: table is not rendered yet OR controlled mode is used');
    }
    return context;
};
exports.useTableInstance = useTableInstance;
