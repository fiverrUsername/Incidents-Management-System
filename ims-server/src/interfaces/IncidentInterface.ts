import { ITag } from "./tagInterface";

 export interface IIncident {
  id: string;
  name: string;
  status: string;
  description: string;
  currentPriority: string;
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



