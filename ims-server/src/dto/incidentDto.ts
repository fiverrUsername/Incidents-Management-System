import {
  IsArray,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from "class-validator";
import { Priority, Status } from "../enums/enum";
import { IIncident } from "../interfaces/IncidentInterface";
import { CONSTANTS } from "../loggers/constants";
import { TagDto } from "./tagDto";

export class IncidentDto {
  constructor(init: IIncident) {
    this.id = "";
    this.name = "";
    this.status = Status.Active;
    this.description = "";
    this.currentPriority = Priority.P0;
    this.type = "";
    this.channelId ="";
    this.durationHours = 0;
    this.currentTags = [];
    this.date = "";
    this.createdAt = "";
    this.updatedAt = "";
    this.cost = 0;
    this.createdBy = '';
    Object.assign(this, init);
  }
//TODO
  @IsString({ message: `id ${CONSTANTS.INVALID_MESSAGE}` })
  @IsOptional({ message: `id ${CONSTANTS.EMPTY_OBJECT}` })
  id?: string;

  @IsNotEmpty({ message: `name ${CONSTANTS.EMPTY_OBJECT}` })
  @IsString({ message: `name ${CONSTANTS.INVALID_MESSAGE}` })
  name: string;

  @IsNotEmpty({ message: `status ${CONSTANTS.EMPTY_OBJECT}` })
  @IsString({ message: `status ${CONSTANTS.INVALID_MESSAGE}` })
  status: Status;

  @IsNotEmpty({ message: `description ${CONSTANTS.EMPTY_OBJECT}` })
  @IsString({ message: `description ${CONSTANTS.INVALID_MESSAGE}` })
  description: string;

  @IsNotEmpty({ message: `currentPriority ${CONSTANTS.EMPTY_OBJECT}` })
  @IsString({ message: `currentPriority ${CONSTANTS.INVALID_MESSAGE}` })
  currentPriority: Priority;

  @IsNotEmpty({ message: `type ${CONSTANTS.EMPTY_OBJECT}` })
  @IsString({ message: `type ${CONSTANTS.INVALID_MESSAGE}` })
  type: string;

  @IsNotEmpty({ message: `durationHours ${CONSTANTS.EMPTY_OBJECT}` })
  @IsNumber()
  durationHours: number;

  @IsNotEmpty({ message: `channelName ${CONSTANTS.EMPTY_OBJECT}` })
  @IsString({ message: `channelName ${CONSTANTS.INVALID_MESSAGE}` })
  @IsOptional({ message: `channelName ${CONSTANTS.EMPTY_OBJECT}` })
  channelName?: string;

  @IsString({ message: `slackLink ${CONSTANTS.INVALID_MESSAGE}` })
  @IsOptional({ message: `slackLink ${CONSTANTS.EMPTY_OBJECT}` })
  slackLink?: string;

  @IsString({ message: `channelId ${CONSTANTS.INVALID_MESSAGE}` })
  @IsOptional({ message: `channelId ${CONSTANTS.EMPTY_OBJECT}` })
  channelId?: string;

  @IsNotEmpty({ message: `currentTags ${CONSTANTS.EMPTY_OBJECT}` })
  @IsArray({ message: "is not an array" })
  @ValidateNested({ each: true })
  currentTags: TagDto[];

  @IsNotEmpty({ message: `date ${CONSTANTS.EMPTY_OBJECT}` })
  @IsISO8601()
  date: string;

  @IsNotEmpty({ message: `createdAt ${CONSTANTS.EMPTY_OBJECT}` })
  @IsISO8601()
  createdAt: string;

  @IsNotEmpty({ message: `updatedAt ${CONSTANTS.EMPTY_OBJECT}` })
  @IsISO8601()
  updatedAt: string;

  @IsNotEmpty({ message: `cost ${CONSTANTS.EMPTY_OBJECT}` })
  @IsNumber()
  cost: number;

  @IsNotEmpty({ message: `createdBy ${CONSTANTS.EMPTY_OBJECT}` })
  @IsString()
  createdBy: string
}