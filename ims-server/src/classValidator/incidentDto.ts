import {
  IsArray,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
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
  @IsNotEmpty({ message: "id is empty" })
  @IsString({ message: "invalid id" })
  id: string;

  @IsNotEmpty({ message: "name is empty" })
  @IsString({ message: "invalid name" })
  name: string;

  @IsNotEmpty({ message: "status is empty" })
  @IsString({ message: "invalid status" })
  status: string;

  @IsNotEmpty({ message: "description is empty" })
  @IsString({ message: "invalid description" })
  description: string;

  @IsNotEmpty({ message: "priority is empty" })
  @IsString({ message: "invalid priority" })
  currentPriority: string;

  @IsNotEmpty({ message: "type is empty" })
  @IsString({ message: "invalid type" })
  type: string;

  @IsNotEmpty({ message: "durationHours is empty" })
  @IsNumber()
  durationHours: number;

  @IsNotEmpty({ message: "slackLink is empty" })
  @IsString({ message: "invalid slackLink" })
  @IsOptional({ message: "id is empty" })
  slackLink?: string;

  @IsNotEmpty({ message: "tags is empty" })
  @IsArray({ message: "is not an array" })
  @ValidateNested({ each: true })
  currentTags: TagDto[];

  @IsNotEmpty({ message: "date is empty" })
  @IsISO8601()
  date: string;

  @IsNotEmpty({ message: "createdAt is empty" })
  @IsISO8601()
  createdAt: string;

  @IsNotEmpty({ message: "updatedAt is empty" })
  @IsISO8601()
  updatedAt: string;

  @IsNotEmpty({ message: "cost is empty" })
  @IsNumber()
  cost: number;
}
