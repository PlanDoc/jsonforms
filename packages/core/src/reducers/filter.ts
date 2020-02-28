import {
    ADD_FILTER,
    AddFilterAction,
    REMOVE_FILTER,
    RemoveFilterAction,
    SET_FILTERS,
    SetFiltersAction
} from "../actions";

export interface JsonFormsFilterRegistryEntry {
    filters?: Set<string>;
}

const initState: JsonFormsFilterRegistryEntry = {
    filters: new Set<string>()
};

type ValidFilterActions =
    | AddFilterAction
    | RemoveFilterAction
    | SetFiltersAction
    ;

export const filterReducer = (
    state: JsonFormsFilterRegistryEntry = initState,
    action: ValidFilterActions
) => {
    switch (action.type) {
        case ADD_FILTER: {
            let newState = {
                ...state,
                filters: new Set(state.filters)
            };
            newState.filters = newState.filters.add(action.filterName);
            return newState;
        }
        case REMOVE_FILTER: {
            let newState = {
                ...state,
                filters: new Set(state.filters)
            };
            newState.filters.delete(action.filterName);
            return newState;
        }
        case SET_FILTERS: {
            return {
                ...state,
                filters: new Set(action.filterNames)
            };
        }
        default:
            return state;
    }
};

export const extractFilter = (
    state: JsonFormsFilterRegistryEntry
): JsonFormsFilterRegistryEntry => state;
