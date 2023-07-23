import { ITag } from "./tagInterface";

export interface IIncident extends Document {
  _id: string;
  id: string;
  name: string;
  status: string;
  description: string;
  priority: string;
  type: string;
  durationHours: number;
  slackLink?: string;
  tags: ITag[];
  date: string;
  createdAt: string;
  updatedAt: string;
  cost: number;
  createdBy: string;
}
