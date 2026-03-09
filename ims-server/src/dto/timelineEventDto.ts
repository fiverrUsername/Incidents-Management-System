import { IsArray, IsISO8601, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CONSTANTS } from "../loggers/constants";
import { ITimelineEvent } from "../interfaces/ItimelineEvent";
import { Priority, Status } from "../enums/enum";
import { TagDto } from "./tagDto";

export interface ITimelineEventDto {
    incidentId: string;
    userId: string;
    description: string;
    priority: Priority;
    type: string;
    files: string[];
    createdDate: string;
    updatedDate: string;
    status:Status;
}

export class ITimelineEventDto {

    constructor(init: ITimelineEvent) {
        this.incidentId = "";
        this.userId = "";
        this.description = "";
        this.status=Status.Active;
        this.priority = Priority.P0;
        this.type = "";
        this.files = [];
        this.createdDate = Date.now().toString();
        this.updatedDate = Date.now().toString();
        this.tags=[];
        Object.assign(this, init);
    }

    @IsNotEmpty({ message: `incidentId ${CONSTANTS.EMPTY_OBJECT}` })
    @IsString({ message: `incidentId ${CONSTANTS.INVALID_MESSAGE}` })
   // @IsExistingIncidentId({ message: `incidentId must be a valid existing incident ID` })
    incidentId: string;

    @IsNotEmpty({ message: `userId ${CONSTANTS.EMPTY_OBJECT}` })
    @IsString({ message: `userId ${CONSTANTS.INVALID_MESSAGE}` })
    // @IsExistingUserId({message: `userId must be valid existing user Id`})
    userId: string;

    // @IsNotEmpty({ message: `description ${CONSTANTS.EMPTY_OBJECT}` })
    @IsString({ message: `description ${CONSTANTS.INVALID_MESSAGE}` })
    description: string;

    @IsNotEmpty({ message: `priority ${CONSTANTS.EMPTY_OBJECT}` })
    @IsString({ message: `priority ${CONSTANTS.INVALID_MESSAGE}` })
    priority: Priority;

    @IsNotEmpty({ message: `status ${CONSTANTS.EMPTY_OBJECT}` })
    @IsString({ message: `status ${CONSTANTS.INVALID_MESSAGE}` })
    status: Status;

    @IsNotEmpty({ message: `type ${CONSTANTS.EMPTY_OBJECT}` })
    @IsString({ message: `type ${CONSTANTS.INVALID_MESSAGE}` })
    type: string;

    @IsNotEmpty({ message: `files ${CONSTANTS.EMPTY_OBJECT}` })
    @IsArray({ message: "is not an array" })
    files: string[];

    @IsNotEmpty({ message: `createdDate ${CONSTANTS.EMPTY_OBJECT}` })
    @IsISO8601()
    createdDate: string;

    @IsNotEmpty({ message: `updatedDate ${CONSTANTS.EMPTY_OBJECT}` })
    @IsISO8601()
    updatedDate: string;

    @IsNotEmpty({ message: `currentTags ${CONSTANTS.EMPTY_OBJECT}` })
    @IsArray({ message: "is not an array" })
    @ValidateNested({ each: true })
    tags: TagDto[];
}