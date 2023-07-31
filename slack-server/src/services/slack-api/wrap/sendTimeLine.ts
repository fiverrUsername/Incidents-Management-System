import axios, { AxiosRequestConfig } from "axios";
import { sendMassageOnChangePriority } from "../actions/sendMassageOnChangePriority";
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
interface AttachmentData {
    key: string;
    data: Buffer;
  }
export async function addTimeLineEvent(timeline:ITimelineEvent){
    const answer = await axios.post('http://localhost:7006/timelineEvent/compareIncidentChanges', timeline);
    sendMessageFromBot(timeline.channelId,answer.data.description.join(' '))
}