import { AddOffFilterAction, RemoveOffFilterAction } from "../actions";
export interface JsonFormsOffFilterRegistryEntry {
    offFilters?: string[];
}
declare type ValidOffFilterActions = AddOffFilterAction | RemoveOffFilterAction;
export declare const offFilterReducer: (state: JsonFormsOffFilterRegistryEntry, action: ValidOffFilterActions) => JsonFormsOffFilterRegistryEntry;
export declare const extractOffFilter: (state: JsonFormsOffFilterRegistryEntry) => JsonFormsOffFilterRegistryEntry;
export {};
