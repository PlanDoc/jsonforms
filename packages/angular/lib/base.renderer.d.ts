import { JsonFormsState, JsonSchema, OwnPropsOfRenderer, UISchemaElement } from 'jsonforms/packages/core';
import { NgRedux } from "@angular-redux/store";
export declare class JsonFormsBaseRenderer<T extends UISchemaElement> {
    uischema: T;
    schema: JsonSchema;
    path: string;
    private redux;
    filterMode: boolean;
    filterOn: boolean;
    protected getOwnProps(): OwnPropsOfRenderer;
    constructor(ngRedux: NgRedux<JsonFormsState>);
    toggleFilterMode(uischema: any, changeFilter?: boolean): void;
}
