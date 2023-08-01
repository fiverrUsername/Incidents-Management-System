import { Priority } from "../enums/enum";

export interface ITimelineEvent {
  channelId: string;
  id: string;
  incidentId: string;
  userId: string;
  description: string;
  priority: Priority;
  type: string;
  files: string[];
  createdDate: Date;
  updatedDate: Date;
}