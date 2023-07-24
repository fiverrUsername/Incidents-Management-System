import { ITag } from "./tagInterface";

export interface ISummary  extends Document{
    createdBy:string,
    createdAt:Date,
    currentPriority:string,
    tags: ITag[];
  }
