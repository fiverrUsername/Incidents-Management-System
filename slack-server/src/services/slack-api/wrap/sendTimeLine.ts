import axios from "axios";
import { sendMessageFromBot } from "../actions/sendMessageFromBot";
import { ITimelineEvent } from "../../../../../ims-server/src/interfaces/ItimelineEvent";


export async function addTimeLineEvent(timeline:ITimelineEvent){
    const answer = await axios.post('http://localhost:7006/timelineEvent/compareIncidentChanges', timeline);
    console.log(answer.data+" slack answer")
    
    sendMessageFromBot(timeline.channelId!,answer.data.join(' '))
}