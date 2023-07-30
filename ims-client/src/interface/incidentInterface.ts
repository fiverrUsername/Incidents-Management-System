import { ITag } from "./ITag";

export default interface IIncident  {
    id: string;
    name: string;
    status: string;
    description: string;
    priority: string;
    type: string;
    durationHours: number;
    channelId: string;
    slackLink:string,
    channelName: string;
    tags: ITag[];
    date: Date;
    createdAt: Date;
    updatedAt: Date;
    cost: number;
    createdBy:string;
  }