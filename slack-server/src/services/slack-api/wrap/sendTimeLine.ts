import axios, { AxiosRequestConfig } from "axios";
import { sendMassageToSlack } from "../actions/postMessage";
export interface ITimelineEvent{
    _id?: string,
    incidentId?:string,
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

    const answer = await axios.post('http://localhost:7000/timelineEvent/compareIncidentChanges', timeline);
    sendMassageToSlack({channelId:timeline.channelId,userName:"Tammy",filesUrl:answer.data.files,text:answer.data.description.join(' ')})
}