import axios from "axios";
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

export async function addTimeLineEvent(timeline:ITimelineEvent){
    const answer = await axios.post('http://localhost:7006/timelineEvent/compareIncidentChanges', timeline);
    console.log(answer.data+" slack answer")
    
    sendMessageFromBot(timeline.channelId,answer.data.join(' '))
}