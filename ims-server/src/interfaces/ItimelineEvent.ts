
export interface ITimelineEvent{
    _id: string,
    incidentId:string,
    channelId?:string,
    userId:string,
    description:string,
    priority:string,
    type:string,
    files:string[],
    createdDate:Date,
    updatedDate:Date,
}