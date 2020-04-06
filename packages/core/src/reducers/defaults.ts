import {SET_DEFAULTS, SetDefaultsAction} from "../actions";

export interface JsonFormsDefaultsRegistryEntry {
    defaults?: any;
}

const initState: JsonFormsDefaultsRegistryEntry = {
    defaults: {}
};

type ValidDefaultsActions =
    SetDefaultsAction
    ;

export const defaultsReducer = (
    state: JsonFormsDefaultsRegistryEntry = initState,
    action: ValidDefaultsActions
) => {
    switch (action.type) {
        case SET_DEFAULTS: {
            return {
                ...state,
                defaults: action.defaults
            };
        }
        default:
            return state;
    }
};

export const extractDefaults = (
    state: JsonFormsDefaultsRegistryEntry
): JsonFormsDefaultsRegistryEntry => state;
