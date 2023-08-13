import axios from "axios";
import { ITimelineEvent } from "../../../../ims-server/src/interfaces/ItimelineEvent";
import { sendMessage } from "../base/sendMessage";

export async function sendMessageOnAddTimelineEvent(timeline:ITimelineEvent){
    const answer = await axios.post('http://localhost:7000/timelineEvent/compareIncidentChanges', timeline);    
    sendMessage({channelId:timeline.channelId,userName:"U05HQUCJMUN>",filesUrl:answer.data.files,text:answer.data.description.join(' ')})
}