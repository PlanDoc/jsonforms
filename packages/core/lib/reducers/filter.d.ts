import { AddFilterAction, RemoveFilterAction, SetFiltersAction } from "../actions";
export interface JsonFormsFilterRegistryEntry {
    filters?: Set<string>;
}
declare type ValidFilterActions = AddFilterAction | RemoveFilterAction | SetFiltersAction;
export declare const filterReducer: (state: JsonFormsFilterRegistryEntry, action: ValidFilterActions) => JsonFormsFilterRegistryEntry;
export declare const extractFilter: (state: JsonFormsFilterRegistryEntry) => JsonFormsFilterRegistryEntry;
export {};
