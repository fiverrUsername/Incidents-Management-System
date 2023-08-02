export enum Priority {
    P3 = 'p3',
    P2 = 'p2',
    P1 = 'p1',
    P0 = 'p0',
}
export interface ITag {
    id: string;
    name: string;
}
export interface IIncident {
    name: string;
    status: string;
    description: string;
    currentPriority: Priority;
    type: string;
    durationHours: number;
    channelId?: string;
    slackLink: string;
    channelName?: string;
    currentTags: ITag[];
    date: string;
    createdAt: string;
    updatedAt: string;
    cost: number;
    createdBy: string;
}