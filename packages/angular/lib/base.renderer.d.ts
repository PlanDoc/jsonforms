import { JsonFormsState, JsonSchema, OwnPropsOfRenderer, UISchemaElement, FieldPhaseSelector } from 'jsonforms/packages/core';
import { NgRedux } from "@angular-redux/store";
export declare class JsonFormsBaseRenderer<T extends UISchemaElement> {
    uischema: T;
    schema: JsonSchema;
    path: string;
    private redux;
    filterMode: boolean;
    filterOn: boolean;
    readonly: boolean;
    selector?: (fieldName: string) => FieldPhaseSelector;
    protected getOwnProps(): OwnPropsOfRenderer;
    constructor(ngRedux: NgRedux<JsonFormsState>);
    getControlName(uischema: any): string;
    toggleFilterMode(uischema: any, changeFilter?: boolean): void;
}
