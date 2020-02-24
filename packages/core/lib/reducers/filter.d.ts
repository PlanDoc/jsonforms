import { AddFilterAction, RemoveFilterAction } from "../actions";
export interface JsonFormsFilterRegistryEntry {
    filters?: string[];
}
declare type ValidFilterActions = AddFilterAction | RemoveFilterAction;
export declare const filterReducer: (state: JsonFormsFilterRegistryEntry, action: ValidFilterActions) => JsonFormsFilterRegistryEntry;
export declare const extractFilter: (state: JsonFormsFilterRegistryEntry) => JsonFormsFilterRegistryEntry;
export {};
