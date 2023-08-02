import { IsArray, IsISO8601, IsNotEmpty, IsString } from "class-validator";
import { constants } from "../loggers/constants";
import { ITimelineEvent } from "../interfaces/ItimelineEvent";
import { Priority } from "../enums/enum";

export interface ITimelineEventDto {
    incidentId: string;
    userId: string;
    description: string;
    priority: Priority;
    type: string;
    files: string[];
    createdDate: string;
    updatedDate: string;
}

export class ITimelineEventDto {

    constructor(init: ITimelineEvent) {
        this.incidentId = "";
        this.userId = "";
        this.description = "";
        this.priority = Priority.P0;
        this.type = "";
        this.files = [];
        this.createdDate = Date.now().toString();
        this.updatedDate = Date.now().toString();
        Object.assign(this, init);
    }

    @IsNotEmpty({ message: `incidentId ${constants.EMPTY_OBJECT}` })
    @IsString({ message: `incidentId ${constants.INVALID_MESSAGE}` })
   // @IsExistingIncidentId({ message: `incidentId must be a valid existing incident ID` })
    incidentId: string;

    @IsNotEmpty({ message: `userId ${constants.EMPTY_OBJECT}` })
    @IsString({ message: `userId ${constants.INVALID_MESSAGE}` })
    // @IsExistingUserId({message: `userId must be valid existing user Id`})
    userId: string;

    @IsNotEmpty({ message: `description ${constants.EMPTY_OBJECT}` })
    @IsString({ message: `description ${constants.INVALID_MESSAGE}` })
    description: string;

    @IsNotEmpty({ message: `priority ${constants.EMPTY_OBJECT}` })
    @IsString({ message: `priority ${constants.INVALID_MESSAGE}` })
    priority: Priority;

    @IsNotEmpty({ message: `type ${constants.EMPTY_OBJECT}` })
    @IsString({ message: `type ${constants.INVALID_MESSAGE}` })
    type: string;

    @IsNotEmpty({ message: `files ${constants.EMPTY_OBJECT}` })
    @IsArray({ message: "is not an array" })
    files: string[];

    @IsNotEmpty({ message: `createdDate ${constants.EMPTY_OBJECT}` })
    @IsISO8601()
    createdDate: string;

    @IsNotEmpty({ message: `updatedDate ${constants.EMPTY_OBJECT}` })
    @IsISO8601()
    updatedDate: string;

}