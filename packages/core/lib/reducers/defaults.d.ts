import { SetDefaultsAction } from "../actions";
export interface JsonFormsDefaultsRegistryEntry {
    defaults?: any;
}
export declare const defaultsReducer: (state: JsonFormsDefaultsRegistryEntry, action: SetDefaultsAction) => JsonFormsDefaultsRegistryEntry;
export declare const extractDefaults: (state: JsonFormsDefaultsRegistryEntry) => JsonFormsDefaultsRegistryEntry;
