import { ITag } from "./tagInterface";

export interface ISummary {
    createdBy:string,
    createdAt:string,
    currentPriority:string,
    tags: ITag[];
  }
