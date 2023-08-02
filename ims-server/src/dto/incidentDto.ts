import {
  IsArray,
  IsISO8601,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  isString,
  IsString,
  ValidateNested,
} from "class-validator";
import { constants } from "../loggers/constants";
import { IIncident } from "../interfaces/IncidentInterface";
import { TagDto } from "./tagDto";
import { Priority } from "../enums/enum";

export class IncidentDto {
  constructor(init: IIncident) {
    this.id = "";
    this.name = "";
    this.status = "";
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
  @IsString({ message: `id ${constants.INVALID_MESSAGE}` })
  @IsOptional({ message: `id ${constants.EMPTY_OBJECT}` })
  id?: string;

  @IsNotEmpty({ message: `name ${constants.EMPTY_OBJECT}` })
  @IsString({ message: `name ${constants.INVALID_MESSAGE}` })
  name: string;

  @IsNotEmpty({ message: `status ${constants.EMPTY_OBJECT}` })
  @IsString({ message: `status ${constants.INVALID_MESSAGE}` })
  status: string;

  @IsNotEmpty({ message: `description ${constants.EMPTY_OBJECT}` })
  @IsString({ message: `description ${constants.INVALID_MESSAGE}` })
  description: string;

  @IsNotEmpty({ message: `currentPriority ${constants.EMPTY_OBJECT}` })
  @IsString({ message: `currentPriority ${constants.INVALID_MESSAGE}` })
  currentPriority: Priority;

  @IsNotEmpty({ message: `type ${constants.EMPTY_OBJECT}` })
  @IsString({ message: `type ${constants.INVALID_MESSAGE}` })
  type: string;

  @IsNotEmpty({ message: `durationHours ${constants.EMPTY_OBJECT}` })
  @IsNumber()
  durationHours: number;

  @IsNotEmpty({ message: `channelName ${constants.EMPTY_OBJECT}` })
  @IsString({ message: `channelName ${constants.INVALID_MESSAGE}` })
  @IsOptional({ message: `channelName ${constants.EMPTY_OBJECT}` })
  channelName?: string;


  @IsString({ message: `slackLink ${constants.INVALID_MESSAGE}` })
  @IsOptional({ message: `slackLink ${constants.EMPTY_OBJECT}` })
  slackLink?: string;



  @IsString({ message: `channelId ${constants.INVALID_MESSAGE}` })
  @IsOptional({ message: `channelId ${constants.EMPTY_OBJECT}` })
  channelId?: string;

  @IsNotEmpty({ message: `currentTags ${constants.EMPTY_OBJECT}` })
  @IsArray({ message: "is not an array" })
  @ValidateNested({ each: true })
  currentTags: TagDto[];

  @IsNotEmpty({ message: `date ${constants.EMPTY_OBJECT}` })
  @IsISO8601()
  date: string;

  @IsNotEmpty({ message: `createdAt ${constants.EMPTY_OBJECT}` })
  @IsISO8601()
  createdAt: string;

  @IsNotEmpty({ message: `updatedAt ${constants.EMPTY_OBJECT}` })
  @IsISO8601()
  updatedAt: string;

  @IsNotEmpty({ message: `cost ${constants.EMPTY_OBJECT}` })
  @IsNumber()
  cost: number;

  @IsNotEmpty({ message: `createdBy ${constants.EMPTY_OBJECT}` })
  @IsString()
  createdBy: string
}
