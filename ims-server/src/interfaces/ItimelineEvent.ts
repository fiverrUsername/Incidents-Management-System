import { Priority, Status } from "../enums/enum";
import { ITag } from "./tagInterface";

export interface ITimelineEvent {
  channelId: string;
  id?: string;
  incidentId: string;
  userId: string;
  description: string;
  priority: Priority;
  type: string;
  files: string[];
  createdDate: Date;
  updatedDate: Date;
  status:Status;
  tags:ITag[];
}