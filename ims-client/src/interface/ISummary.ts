import { ITag } from "./ITag";
import { Priority } from "./enum-priority";

export interface ISummary {
    createdBy:string,
    createdAt:Date,
    currentPriority:Priority,
    tags: ITag[];
  }