import { Input } from '@angular/core';
import { toDataPath, addFilter, removeFilter } from 'jsonforms/packages/core';
var JsonFormsBaseRenderer = /** @class */ (function () {
    function JsonFormsBaseRenderer(ngRedux) {
        this.filterMode = false;
        this.filterOn = false;
        this.redux = ngRedux;
        if (ngRedux && ngRedux.getState) {
            var state = ngRedux.getState();
            this.filterMode = state && state.jsonforms && state.jsonforms.core && state.jsonforms.core.uischema &&
                state.jsonforms.core.uischema.filterMode;
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
            var scopedPath = toDataPath(uischema.scope) || "";
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
                        this.redux.dispatch(addFilter(filterPath));
                    }
                    else {
                        this.redux.dispatch(removeFilter(filterPath));
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
        "uischema": [{ type: Input },],
        "schema": [{ type: Input },],
        "path": [{ type: Input },],
    };
    return JsonFormsBaseRenderer;
}());
export { JsonFormsBaseRenderer };
//# sourceMappingURL=base.renderer.js.map