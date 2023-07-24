import {
  IsArray,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { constants } from "../loggers/constants";
import { IIncident } from "../interfaces/IncidentInterface";
import { TagDto } from "./tagDto";

export class IncidentDto {
  constructor(init: IIncident) {
    this.id = "";
    this.name = "";
    this.status = "";
    this.description = "";
    this.currentPriority = "";
    this.type = "";
    this.durationHours = 0;
    this.currentTags = [];
    this.date = "";
    this.createdAt = "";
    this.updatedAt = "";
    this.cost = 0;
    Object.assign(this, init);
  }
  
  @IsNotEmpty({ message: `id ${constants.EMPTY_OBJECT}` }) 
  @IsString({ message: `id ${constants.INVALID_MESSAGE}` })
  id: string;

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
  currentPriority: string;

  @IsNotEmpty({ message: `type ${constants.EMPTY_OBJECT}` })
  @IsString({ message: `type ${constants.INVALID_MESSAGE}` })
  type: string;

  @IsNotEmpty({ message: `durationHours ${constants.EMPTY_OBJECT}` })
  @IsNumber()
  durationHours: number;

  @IsNotEmpty({ message: `slackLink ${constants.EMPTY_OBJECT}` })
  @IsString({ message: `slackLink ${constants.INVALID_MESSAGE}` })
  @IsOptional({ message: `slackLink ${constants.EMPTY_OBJECT}` })
  slackLink?: string;

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
}
