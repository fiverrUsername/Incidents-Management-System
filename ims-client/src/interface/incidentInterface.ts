import { ITag } from "./ITag";

export default interface IIncident  {
    id: string;
    name: string;
    status: string;
    description: string;
    priority: string;
    type: string;
    durationHours: number;
    slackLink: string;
    tags: ITag[];
    date: Date;
    createdAt: Date;
    updatedAt: Date;
    cost: number;
    createdBy:string;
  }