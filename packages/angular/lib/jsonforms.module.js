"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("@angular-redux/store");
var jsonforms_component_1 = require("./jsonforms.component");
var unknown_component_1 = require("./unknown.component");
var JsonFormsModule = /** @class */ (function () {
    function JsonFormsModule() {
    }
    JsonFormsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [jsonforms_component_1.JsonFormsOutlet, unknown_component_1.UnknownRenderer],
                    entryComponents: [unknown_component_1.UnknownRenderer],
                    imports: [store_1.NgReduxModule],
                    exports: [jsonforms_component_1.JsonFormsOutlet],
                    providers: []
                },] },
    ];
    return JsonFormsModule;
}());
exports.JsonFormsModule = JsonFormsModule;
//# sourceMappingURL=jsonforms.module.js.map