import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import incidentService from "../services/incidentService";

@ValidatorConstraint({ async: true })
export class IsValidIncidentId implements ValidatorConstraintInterface {
    async validate(id:string) {
        const incident =await incidentService.getIncidentByField(id,"id");
        if (incident instanceof Error || incident === null) {
            throw new Error("Incident ID not found");
        }
        return true;
    }
}

export function IsExistingIncidentId(validationOptions?:ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "isExistingIncidentId",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: IsValidIncidentId,
        });
    };
}