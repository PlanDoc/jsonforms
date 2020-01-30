import { ControlElement, LabelDescription } from '../models/uischema';
import { JsonSchema } from "..";
export declare const createCleanLabel: (label: string) => string;
/**
 * Return a label object based on the given control element.
 * @param {ControlElement} withLabel the UI schema to obtain a label object for
 * @param jsonSchema
 * @returns {LabelDescription}
 */
export declare const createLabelDescriptionFrom: (withLabel: ControlElement, jsonSchema?: JsonSchema) => LabelDescription;
