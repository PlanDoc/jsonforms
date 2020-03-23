import { NgModule } from '@angular/core';
import { NgReduxModule } from '@angular-redux/store';
import { JsonFormsOutlet } from './jsonforms.component';
import { UnknownRenderer } from './unknown.component';
var JsonFormsModule = /** @class */ (function () {
    function JsonFormsModule() {
    }
    JsonFormsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [JsonFormsOutlet, UnknownRenderer],
                    entryComponents: [UnknownRenderer],
                    imports: [NgReduxModule],
                    exports: [JsonFormsOutlet, NgReduxModule],
                    providers: []
                },] },
    ];
    return JsonFormsModule;
}());
export { JsonFormsModule };
//# sourceMappingURL=jsonforms.module.js.map