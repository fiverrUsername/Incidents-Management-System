import { Priority } from "../enums/enum";
import { ITag } from "./tagInterface";

export interface ISummary {
    createdBy:string,
    createdAt:string,
    currentPriority:Priority,
    tags: ITag[];
  }
