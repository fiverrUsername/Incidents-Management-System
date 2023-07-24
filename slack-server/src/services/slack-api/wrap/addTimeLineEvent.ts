import { sendMessageFromBot } from "../actions/sendMessageFromBot";

export interface ITimelineEvent{
    _id?: string,
    incidentId:string,
    channelId:string,
    userId:string,
    description:string,
    priority:string,
    type:string,
    files?:string[],
    createdDate:Date,
    updatedDate:Date,
}

export function addTimeLineEvent(timeline:ITimelineEvent){
    
    sendMessageFromBot(timeline.channelId,timeline.description)
}