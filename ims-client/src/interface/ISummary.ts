import { Priority } from "./enum-priority";
import { ITag } from "./ITag";

export interface ISummary {
  createdBy: string,
  createdAt: Date,
  currentPriority: Priority,
  tags: ITag[];
}