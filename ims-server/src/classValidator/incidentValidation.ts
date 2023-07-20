import {
  IsString,
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  ValidateNested,
  IsNotEmpty,
  IsISO8601,
} from "class-validator";
import { Tag } from "./tagValidation";

export class Incident {
  constructor() {
    this.id = "";
    this.name = "";
    this.status = "";
    this.description = "";
    this.priority = "";
    this.type = "";
    this.durationHours = 0;
    this.tags = [];
    this.date = "2023-07-19T10:00:00Z";
    this.createdAt = "2023-07-19T10:00:00Z";
    this.updatedAt = "2023-07-19T10:00:00Z";
    this.cost = 0;
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
  priority: string;

  @IsNotEmpty({ message: "type is empty" })
  @IsString({ message: "invalid type" })
  type: string;

  @IsNotEmpty({ message: "durationHours is empty" })
  @IsString({ message: "invalid durationHours" })
  durationHours: number;

  @IsNotEmpty({ message: "slackLink is empty" })
  @IsString({ message: "invalid slackLink" })
  @IsOptional({ message: "id is empty" })
  slackLink?: string;

  @IsNotEmpty({ message: "tags is empty" })
  @IsArray({ message: "is not an array" })
  @ValidateNested({ each: true })
  tags: Tag[];

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
