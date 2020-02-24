import {ADD_FILTER, AddFilterAction, REMOVE_FILTER, RemoveFilterAction} from "../actions";

export interface JsonFormsFilterRegistryEntry {
    filters?: string[];
}

const initState: JsonFormsFilterRegistryEntry = {
    filters: []
};

type ValidFilterActions =
    | AddFilterAction
    | RemoveFilterAction;

export const filterReducer = (
    state: JsonFormsFilterRegistryEntry = initState,
    action: ValidFilterActions
) => {
    switch (action.type) {
        case ADD_FILTER: {
            return {
                ...state,
                filters: [...state.filters, action.filterName]
            }
        }
        case REMOVE_FILTER: {
            return {
                ...state,
                filters: state.filters.filter(filter => filter != action.filterName)
            }
        }
        default:
            return state;
    }
};

export const extractFilter = (
    state: JsonFormsFilterRegistryEntry
): JsonFormsFilterRegistryEntry => state;
