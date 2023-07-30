import { ITag } from "./tagInterface";

export interface IIncident {
  id: string;
  name: string;
  status: string;
  description: string;
  currentPriority: string;
  type: string;
  durationHours: number;
  slackLink?: string;
  currentTags: ITag[];
  date: string;
  createdAt: string;
  updatedAt: string;
  cost: number;
  createdBy: string;
}
