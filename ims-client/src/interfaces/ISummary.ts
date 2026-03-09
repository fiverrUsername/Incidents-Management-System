import { Priority } from "./enums";
import { ITag } from "./ITag";

export interface ISummary {
  createdBy: string,
  createdAt: Date,
  currentPriority: Priority,
  tags: ITag[];
}