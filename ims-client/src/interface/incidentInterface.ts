import { ITag } from "./ITag";
import { Priority, Status } from "./enums";
  
export default interface IIncident {
  // id: string;
  name: string;
  status: Status;
  description: string;
  currentPriority: Priority;
  type: string;
  durationHours: number;
  channelId?:string;
  slackLink: string;
  channelName?: string;
  currentTags: ITag[];
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  cost: number;
  createdBy: string;
}


