import axios, { AxiosRequestConfig } from "axios";
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
    
    
    const requestConfig: AxiosRequestConfig = {};
  requestConfig.data = { files: timeline.files };
  console.log(timeline.files+" slack no")
    const answer = await axios.post('http://localhost:7006/timelineEvent/compareIncidentChanges', timeline);
    await axios.get('http://localhost:7006/aws', requestConfig.data.files).then((response) => {
        console.log(response.data);
        console.log("sd");
        var f:AttachmentData=response.data
        console.log(f.key);
      }, (error) => {
        console.log(error);
      });

    //console.log(files.data+" slack answer")
    
   // sendMessageFromBot(timeline.channelId,answer.data.join(' '))
}