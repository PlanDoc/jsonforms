/*
  The MIT License
  
  Copyright (c) 2018 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import { Input } from '@angular/core';
import {
  JsonFormsState,
  JsonSchema,
  OwnPropsOfRenderer, toDataPath,
  UISchemaElement,
  addFilter, removeFilter, FieldPhaseSelector
} from 'jsonforms/packages/core';
import {NgRedux} from "@angular-redux/store";

export class JsonFormsBaseRenderer<T extends UISchemaElement> {
  @Input() uischema: T;
  @Input() schema: JsonSchema;
  @Input() path: string;

  private redux: NgRedux<JsonFormsState>;
  filterMode: boolean = false;
  filterOn: boolean = false;
  readonly: boolean = false;

  selector?: (fieldName: string) => FieldPhaseSelector = null;

  protected getOwnProps(): OwnPropsOfRenderer {
    return {
      uischema: this.uischema,
      schema: this.schema,
      path: this.path
    };
  }

  constructor(ngRedux: NgRedux<JsonFormsState>) {
    this.redux = ngRedux;
    if(ngRedux && ngRedux.getState) {
      let state = ngRedux.getState();
      this.filterMode = (state && state.jsonforms && state.jsonforms.core && state.jsonforms.core.uischema &&
          state.jsonforms.core.uischema.filterMode) || (this.uischema && this.uischema.filterMode);
      this.readonly = (state && state.jsonforms && state.jsonforms.core && state.jsonforms.core.uischema &&
          state.jsonforms.core.uischema.readonly) || (this.uischema && this.uischema.readonly);
      this.selector = (state && state.jsonforms && state.jsonforms.core && state.jsonforms.core.uischema &&
          state.jsonforms.core.uischema.selector) || (this.uischema && this.uischema.selector);
    }
  }

  getControlName(uischema: any): string {
    let filterPath = null;
    if(uischema) {
      let absPath = this.path || "";
      let scopedPath = toDataPath(uischema.scope) || "";
      filterPath = absPath + (absPath && scopedPath ? "." : "") + scopedPath;
    }
    return filterPath;
  }

  toggleFilterMode(uischema: any, changeFilter: boolean = true) {
    if(this.filterMode) {
      if(changeFilter) this.filterOn = !this.filterOn;

      if(uischema) {
        let filterPath = this.getControlName(uischema);

        if(uischema.scope) {
          if(this.filterOn) {
            this.redux.dispatch(addFilter(filterPath));
          } else {
            this.redux.dispatch(removeFilter(filterPath));
          }
        } else if(uischema.elements) {
          for(let i = 0; i < uischema.elements.length; i++) {
            this.toggleFilterMode(uischema.elements[i], false);
          }
        }
      }
    }
  }

}
