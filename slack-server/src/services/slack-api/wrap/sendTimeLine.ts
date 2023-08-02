import axios, { AxiosRequestConfig } from "axios";
import { sendMassageToSlack } from "../actions/postMessage";
import { sendMassageOnChangePriority } from "../actions/sendMassageOnChangePriority";
import { sendMessageFromBot } from "../actions/sendMessageFromBot";
import bufferToDataUrl from "buffer-to-data-url"

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
    sendMassageToSlack({channelId:timeline.channelId,userName:"Tammy",filesUrl:answer.data.files,text:answer.data.description.join(' ')})
}