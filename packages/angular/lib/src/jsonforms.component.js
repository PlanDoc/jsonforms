var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import maxBy from 'lodash/maxBy';
import { ComponentFactoryResolver, Directive, Input, ViewContainerRef } from '@angular/core';
import { createId, isControl, mapStateToJsonFormsRendererProps } from 'jsonforms/packages/core';
import { NgRedux } from '@angular-redux/store';
import 'rxjs/add/operator/map';
import { UnknownRenderer } from './unknown.component';
import { JsonFormsBaseRenderer } from './base.renderer';
import { JsonFormsControl } from './control';
var JsonFormsOutlet = /** @class */ (function (_super) {
    __extends(JsonFormsOutlet, _super);
    function JsonFormsOutlet(viewContainerRef, componentFactoryResolver, ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.viewContainerRef = viewContainerRef;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.ngRedux = ngRedux;
        return _this;
    }
    Object.defineProperty(JsonFormsOutlet.prototype, "renderProps", {
        set: function (renderProps) {
            this.path = renderProps.path;
            this.schema = renderProps.schema;
            this.uischema = renderProps.uischema;
            this.update(this.ngRedux.getState());
        },
        enumerable: true,
        configurable: true
    });
    JsonFormsOutlet.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.ngRedux
            .select()
            .subscribe(function (state) { return _this.update(state); });
    };
    JsonFormsOutlet.prototype.update = function (state) {
        var props = mapStateToJsonFormsRendererProps(state, {
            schema: this.schema,
            uischema: this.uischema,
            path: this.path
        });
        var renderers = props.renderers;
        var schema = this.schema || props.schema;
        var uischema = this.uischema || props.uischema;
        var renderer = maxBy(renderers, function (r) { return r.tester(uischema, schema); });
        var bestComponent = UnknownRenderer;
        if (renderer !== undefined && renderer.tester(uischema, schema) !== -1) {
            bestComponent = renderer.renderer;
        }
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(bestComponent);
        if (this.currentComponentRef === undefined) {
            this.currentComponentRef = this.viewContainerRef.createComponent(componentFactory);
        }
        else if (this.currentComponentRef.componentType !== componentFactory.componentType) {
            this.viewContainerRef.clear();
            this.currentComponentRef = this.viewContainerRef.createComponent(componentFactory);
        }
        if (this.currentComponentRef.instance instanceof JsonFormsBaseRenderer) {
            var instance = this.currentComponentRef
                .instance;
            instance.uischema = uischema;
            instance.schema = schema;
            instance.path = this.path;
            if (instance instanceof JsonFormsControl) {
                var controlInstance = instance;
                if (controlInstance.id === undefined) {
                    var id = isControl(props.uischema)
                        ? createId(props.uischema.scope)
                        : undefined;
                    instance.id = id;
                }
            }
        }
    };
    JsonFormsOutlet.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    JsonFormsOutlet.decorators = [
        { type: Directive, args: [{
                    selector: 'jsonforms-outlet'
                },] },
    ];
    /** @nocollapse */
    JsonFormsOutlet.ctorParameters = function () { return [
        { type: ViewContainerRef, },
        { type: ComponentFactoryResolver, },
        { type: NgRedux, },
    ]; };
    JsonFormsOutlet.propDecorators = {
        "renderProps": [{ type: Input },],
    };
    return JsonFormsOutlet;
}(JsonFormsBaseRenderer));
export { JsonFormsOutlet };
//# sourceMappingURL=jsonforms.component.js.map