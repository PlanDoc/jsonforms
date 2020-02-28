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
    filters: new Set()
};
exports.filterReducer = function (state, action) {
    if (state === void 0) { state = initState; }
    switch (action.type) {
        case actions_1.ADD_FILTER: {
            var newState = __assign({}, state, { filters: new Set(state.filters) });
            newState.filters = newState.filters.add(action.filterName);
            return newState;
        }
        case actions_1.REMOVE_FILTER: {
            var newState = __assign({}, state, { filters: new Set(state.filters) });
            newState.filters.delete(action.filterName);
            return newState;
        }
        case actions_1.SET_FILTERS: {
            return __assign({}, state, { filters: new Set(action.filterNames) });
        }
        default:
            return state;
    }
};
exports.extractFilter = function (state) { return state; };
//# sourceMappingURL=filter.js.map