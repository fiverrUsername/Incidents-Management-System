import { ITag } from "./ITag";

export interface ISummary {
    createdBy:string,
    createdAt:Date,
    currentPriority:string,
    tags: ITag[];
  }