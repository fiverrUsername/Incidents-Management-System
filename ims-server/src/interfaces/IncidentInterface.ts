
export interface IIncident  extends Document{
    _id: string;
    id: string;
    name: string;
    status: string;
    description: string;
    currentPriority: string;
    type: string;
    durationHours: number;
    slackLink: string;
    currentTags: { id: string, name: string }[];
    date: Date;
    createdAt: Date;
    updatedAt: Date;
    cost: number;
    createdBy:string;
  }
