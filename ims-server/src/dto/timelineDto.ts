import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsISO8601,
  ValidateNested,
} from "class-validator";
import { ITimelineEvent } from "../interfaces/ItimelineEvent";
import { constants } from "../loggers/constants";
import { Priority, Status } from "../enums/enum";
import { TagDto } from "./tagDto";

export class TimelineEventDto {
  constructor(init: ITimelineEvent) {
    this._id = "";
    this.incidentId = "";
    this.userId = "";
    this.description = "";
    this.status=Status.Active;
    this.priority = Priority.P0;
    this.type = "";
    this.files = [];
    this.createdDate = "";
    this.updatedDate = "";
    this.tags = [];
    Object.assign(this, init);
  }
  @IsNotEmpty({ message: `status ${constants.EMPTY_OBJECT}` })
  @IsString({ message: `status ${constants.INVALID_MESSAGE}` })
  status: Status;

  @IsNotEmpty({ message: `id ${constants.EMPTY_OBJECT}` })
  @IsString({ message: `id ${constants.INVALID_MESSAGE}` })
  _id: string;

  @IsNotEmpty({ message: `incidentId ${constants.EMPTY_OBJECT}` })
  @IsString({ message: `incidentId ${constants.INVALID_MESSAGE}` })
  incidentId: string;

  @IsNotEmpty({ message: `userId ${constants.EMPTY_OBJECT}` })
  @IsString({ message: `userId ${constants.INVALID_MESSAGE}` })
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
  @ValidateNested({ each: true })
  files: string[];

  @IsNotEmpty({ message: `createdDate ${constants.EMPTY_OBJECT}` })
  @IsISO8601()
  createdDate: string;

  @IsNotEmpty({ message: `updatedDate ${constants.EMPTY_OBJECT}` })
  @IsISO8601()
  updatedDate: string;

  @IsNotEmpty({ message: `currentTags ${constants.EMPTY_OBJECT}` })
  @IsArray({ message: "is not an array" })
  @ValidateNested({ each: true })
  tags: TagDto[];
}
