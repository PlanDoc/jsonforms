"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The different rule effects.
 */
var RuleEffect;
(function (RuleEffect) {
    /**
     * Effect that hides the associated element.
     */
    RuleEffect["HIDE"] = "HIDE";
    /**
     * Effect that shows the associated element.
     */
    RuleEffect["SHOW"] = "SHOW";
    /**
     * Effect that enables the associated element.
     */
    RuleEffect["ENABLE"] = "ENABLE";
    /**
     * Effect that disables the associated element.
     */
    RuleEffect["DISABLE"] = "DISABLE";
})(RuleEffect = exports.RuleEffect || (exports.RuleEffect = {}));
var FieldPhaseSelector;
(function (FieldPhaseSelector) {
    FieldPhaseSelector[FieldPhaseSelector["HIDDEN"] = 0] = "HIDDEN";
    FieldPhaseSelector[FieldPhaseSelector["READONLY"] = 1] = "READONLY";
    FieldPhaseSelector[FieldPhaseSelector["EDITABLE"] = 2] = "EDITABLE";
})(FieldPhaseSelector = exports.FieldPhaseSelector || (exports.FieldPhaseSelector = {}));
exports.isGroup = function (layout) {
    return layout.type === 'Group';
};
//# sourceMappingURL=uischema.js.map