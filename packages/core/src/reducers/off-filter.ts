import {ADD_OFF_FILTER, AddOffFilterAction, REMOVE_OFF_FILTER, RemoveOffFilterAction} from "../actions";

export interface JsonFormsOffFilterRegistryEntry {
    offFilters?: string[];
}

const initState: JsonFormsOffFilterRegistryEntry = {
    offFilters: []
};

type ValidOffFilterActions =
    | AddOffFilterAction
    | RemoveOffFilterAction;

export const offFilterReducer = (
    state: JsonFormsOffFilterRegistryEntry = initState,
    action: ValidOffFilterActions
) => {
    switch (action.type) {
        case ADD_OFF_FILTER: {
            return {
                ...state,
                offFilters: [...state.offFilters, action.filterName]
            }
        }
        case REMOVE_OFF_FILTER: {
            return {
                ...state,
                offFilters: state.offFilters.filter(offFilter => offFilter != action.filterName)
            }
        }
        default:
            return state;
    }
};

export const extractOffFilter = (
    state: JsonFormsOffFilterRegistryEntry
): JsonFormsOffFilterRegistryEntry => state;
