"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
var initState = {
    offFilters: []
};
exports.offFilterReducer = function (state, action) {
    if (state === void 0) { state = initState; }
    switch (action.type) {
        case actions_1.ADD_OFF_FILTER: {
            return __assign({}, state, { offFilters: state.offFilters.concat([action.filterName]) });
        }
        case actions_1.REMOVE_OFF_FILTER: {
            return __assign({}, state, { offFilters: state.offFilters.filter(function (offFilter) { return offFilter != action.filterName; }) });
        }
        default:
            return state;
    }
};
exports.extractOffFilter = function (state) { return state; };
//# sourceMappingURL=off-filter.js.map