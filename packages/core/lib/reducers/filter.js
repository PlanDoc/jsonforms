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
    filters: []
};
exports.filterReducer = function (state, action) {
    if (state === void 0) { state = initState; }
    switch (action.type) {
        case actions_1.ADD_FILTER: {
            return __assign({}, state, { filters: state.filters.concat([action.filterName]) });
        }
        case actions_1.REMOVE_FILTER: {
            return __assign({}, state, { filters: state.filters.filter(function (filter) { return filter != action.filterName; }) });
        }
        default:
            return state;
    }
};
exports.extractFilter = function (state) { return state; };
//# sourceMappingURL=filter.js.map