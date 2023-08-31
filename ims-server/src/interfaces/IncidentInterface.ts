import { Priority, Status } from "../enums/enum";
import { ITag } from "./tagInterface";

 export interface IIncident {
  id?: string;
  name: string;
  status: Status;
  description: string;
  currentPriority: Priority;
  type: string;
  durationHours: number;
  channelId: string;
  slackLink: string;
  channelName?: string;
  currentTags: ITag[];
  date: string;
  createdAt: string;
  updatedAt: string;
  cost: number;
  createdBy: string;
}



