import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsISO8601,
  ValidateNested,
} from "class-validator";
import { ITimelineEvent } from "../interfaces/ItimelineEvent";

export class TimelineEventDto {
  constructor(init: ITimelineEvent) {
    this._id = "";
    this.incidentId = "";
    this.userId = "";
    this.description = "";
    this.priority = "";
    this.type = "";
    this.files = [];
    this.createdDate = "";
    this.updatedDate = "";
    Object.assign(this, init);
  }
  @IsNotEmpty({ message: "id is empty" })
  @IsString({ message: "invalid id" }) 
  _id: string;

  @IsNotEmpty({ message: "incidentId is empty" })
  @IsString({ message: "invalid incidentId" })
  incidentId: string;

  @IsNotEmpty({ message: "userId is empty" })
  @IsString({ message: "invalid userId" })
  userId: string;

  @IsNotEmpty({ message: "description is empty" })
  @IsString({ message: "invalid description" })
  description: string;

  @IsNotEmpty({ message: "priority is empty" })
  @IsString({ message: "invalid priority" })
  priority: string;

  @IsNotEmpty({ message: "type is empty" })
  @IsString({ message: "invalid type" })
  type: string;

  @IsNotEmpty({ message: "files are empty" })
  @IsArray({ message: "is not an array" })
  @ValidateNested({ each: true })
  files: string[];

  @IsNotEmpty({ message: "createdDate is empty" })
  @IsISO8601()
  createdDate: string;

  @IsNotEmpty({ message: "updatedDate is empty" })
  @IsISO8601()
  updatedDate: string;
}
