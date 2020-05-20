import {
  Actions,
  composeWithUi,
  computeLabel,
  ControlElement,
  ControlProps,
  FieldPhaseSelector,
  isPlainLabel,
  JsonFormsState,
  JsonSchema,
  mapDispatchToControlProps,
  mapStateToControlProps,
  OwnPropsOfControl,
  Resolve,
  toDataPath
} from 'jsonforms/packages/core';
import {Input, OnDestroy, OnInit} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Subscription} from 'rxjs';

import {JsonFormsBaseRenderer} from './base.renderer';

export class JsonFormsControl extends JsonFormsBaseRenderer<ControlElement>
  implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() disabled: boolean;
  @Input() visible: boolean;

  form: FormControl;
  subscription: Subscription;
  data: any;
  label: string;
  description: string;
  error: string | null;
  scopedSchema: JsonSchema;
  enabled: boolean;
  hidden: boolean;
  required: boolean;

  constructor(protected ngRedux: NgRedux<JsonFormsState>) {
    super(ngRedux);
    this.form = new FormControl(
      {
        value: '',
        disabled: true
      },
      {
        updateOn: 'change',
        validators: this.validator.bind(this)
      }
    );
  }

  getEventValue = (event: any) => event.value;

  onChange(ev: any) {
    const path = composeWithUi(this.uischema, this.path);
    this.ngRedux.dispatch(Actions.update(path, () => this.getEventValue(ev)));
    this.triggerValidation();
  }

  ngOnInit() {
    this.subscription = this.ngRedux
      .select()
      .subscribe((state: JsonFormsState) => {
        const props = this.mapToProps(state);
        const {
          data,
          enabled,
          errors,
          label,
          required,
          schema,
          uischema,
          visible
        } = props;
        this.label = computeLabel(
          isPlainLabel(label) ? label : label.default,
          required
        );
        this.required = required;
        this.data = data;
        const path = composeWithUi(this.uischema, this.path);
        if(!this.data && state && state.jsonforms && state.jsonforms.defaults && state.jsonforms.defaults.defaults
            && this.uischema && this.uischema.scope && this.parentDataPathExist(state.jsonforms.core.data, path)) {
          this.data = state.jsonforms.defaults.defaults[toDataPath(this.uischema.scope)];
          if(this.data) {
            this.ngRedux.dispatch(Actions.update(path, () => this.data));
          }
        }
        this.error = errors && errors.length>0 ? errors[errors.length - 1] : null;
        this.enabled = enabled;
        this.hidden = !visible;

        if(this.uischema && this.uischema.selector) {
          let selectorVal = this.uischema.selector(this.uischema.scope);
          if(selectorVal != null) {
            this.visible = selectorVal != FieldPhaseSelector.HIDDEN;
            this.hidden = selectorVal == FieldPhaseSelector.HIDDEN;
            this.enabled = selectorVal == FieldPhaseSelector.EDITABLE;
            this.disabled = selectorVal == FieldPhaseSelector.READONLY;
            this.readonly = selectorVal == FieldPhaseSelector.READONLY;
          }
        }
        this.enabled ? this.form.enable() : this.form.disable();

        this.scopedSchema = Resolve.schema(schema, uischema.scope);
        this.description =
          this.scopedSchema !== undefined ? this.scopedSchema.description : '';
        this.id = props.id;
        this.form.setValue(this.data);
        this.mapAdditionalProps(props);

        if(this.filterMode) {
          this.filterOn = state.jsonforms.filter && state.jsonforms.filter.filters &&
              state.jsonforms.filter.filters.size > 0 &&
              state.jsonforms.filter.filters.has(this.getControlName(this.uischema));
        }
      });
    this.triggerValidation();
  }

  private parentDataPathExist(cleanData: any, dataPath: string) {
    let dataPathArr = dataPath.split(".");
    let elem = cleanData;
    for(let i = 0; i < dataPathArr.length-1; i++) {
      let dataPathElem = dataPathArr[i];
      if(elem && elem.constructor === Object && elem.hasOwnProperty(dataPathElem)) {
        elem = elem[dataPathElem];
      } else if(elem && Array.isArray(elem) && !isNaN(Number(dataPathElem)) && elem.length>Number(dataPathElem)) {
        elem = elem[Number(dataPathElem)];
      } else {
        return false;
      }
    }
    return true;
  }

  validator: ValidatorFn = (_c: AbstractControl): ValidationErrors | null => {
    return this.error ? { error: this.error } : null;
  };

  // @ts-ignore
  mapAdditionalProps(props: ControlProps) {
    // do nothing by default
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  protected getOwnProps(): OwnPropsOfControl {
    const props: OwnPropsOfControl = {
      uischema: this.uischema,
      schema: this.schema,
      path: this.path,
      id: this.id
    };
    if (this.disabled !== undefined) {
      props.enabled = !this.disabled;
    }
    if (this.visible !== undefined) {
      props.visible = this.visible;
    }
    return props;
  }

  protected mapToProps(state: JsonFormsState): ControlProps {
    const props = mapStateToControlProps(state, this.getOwnProps());
    const dispatch = mapDispatchToControlProps(this.ngRedux.dispatch);
    return { ...props, ...dispatch };
  }

  protected triggerValidation() {
    // these cause the correct update of the error underline, seems to be
    // related to ionic-team/ionic#11640
    this.form.markAsTouched();
    this.form.updateValueAndValidity();
  }
}
