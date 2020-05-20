"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("jsonforms/packages/core");
var JsonFormsBaseRenderer = /** @class */ (function () {
    function JsonFormsBaseRenderer(ngRedux) {
        this.filterMode = false;
        this.filterOn = false;
        this.readonly = false;
        this.selector = null;
        this.redux = ngRedux;
        if (ngRedux && ngRedux.getState) {
            var state = ngRedux.getState();
            this.filterMode = state && state.jsonforms && state.jsonforms.core && state.jsonforms.core.uischema &&
                state.jsonforms.core.uischema.filterMode;
            this.readonly = state && state.jsonforms && state.jsonforms.core && state.jsonforms.core.uischema &&
                state.jsonforms.core.uischema.readonly;
            this.selector = state && state.jsonforms && state.jsonforms.core && state.jsonforms.core.uischema &&
                state.jsonforms.core.uischema.selector;
        }
    }
    JsonFormsBaseRenderer.prototype.getOwnProps = function () {
        return {
            uischema: this.uischema,
            schema: this.schema,
            path: this.path
        };
    };
    JsonFormsBaseRenderer.prototype.getControlName = function (uischema) {
        var filterPath = null;
        if (uischema) {
            var absPath = this.path || "";
            var scopedPath = core_2.toDataPath(uischema.scope) || "";
            filterPath = absPath + (absPath && scopedPath ? "." : "") + scopedPath;
        }
        return filterPath;
    };
    JsonFormsBaseRenderer.prototype.toggleFilterMode = function (uischema, changeFilter) {
        if (changeFilter === void 0) { changeFilter = true; }
        if (this.filterMode) {
            if (changeFilter)
                this.filterOn = !this.filterOn;
            if (uischema) {
                var filterPath = this.getControlName(uischema);
                if (uischema.scope) {
                    if (this.filterOn) {
                        this.redux.dispatch(core_2.addFilter(filterPath));
                    }
                    else {
                        this.redux.dispatch(core_2.removeFilter(filterPath));
                    }
                }
                else if (uischema.elements) {
                    for (var i = 0; i < uischema.elements.length; i++) {
                        this.toggleFilterMode(uischema.elements[i], false);
                    }
                }
            }
        }
    };
    JsonFormsBaseRenderer.propDecorators = {
        "uischema": [{ type: core_1.Input },],
        "schema": [{ type: core_1.Input },],
        "path": [{ type: core_1.Input },],
    };
    return JsonFormsBaseRenderer;
}());
exports.JsonFormsBaseRenderer = JsonFormsBaseRenderer;
//# sourceMappingURL=base.renderer.js.map