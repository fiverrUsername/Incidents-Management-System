import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { getUserById } from "../controllers/userControler";
import {Request,Response} from 'express'

@ValidatorConstraint({ async: true })
export class IsValidUserId implements ValidatorConstraintInterface {
    async validate(userId: string) {
        const req={
            params: {
                id: userId,
            },
        } as unknown as Request
        const res={
            status: (code: number) => {
                return {
                    json: (data: any) => {
                        return data;
                    },
                };
            },
        } as Response  
        const user:any =await getUserById(req,res);
        if (user.message =="Failed to get user by id") {
            throw new Error("user ID not found");
        }
        return true;
    }
}

export function IsExistingUserId(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "IsExistingUserId",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: IsValidUserId,
        });
    };
}