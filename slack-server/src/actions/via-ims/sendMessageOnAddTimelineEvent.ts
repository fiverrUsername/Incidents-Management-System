import axios from "axios";
import dotenv from 'dotenv';

import { ITimelineEvent } from "../../../../ims-server/src/interfaces/ItimelineEvent";
import { IMS_SERVER_ROUTING } from "../../constPage";
import { sendMessage } from "../base/sendMessage";

// Load environment variables from .env file
dotenv.config();
export async function sendMessageOnAddTimelineEvent(timeline: ITimelineEvent) {
   
    const headers = {
        Authorization: `Bearer ${process.env.API_KEY}`
    };
    const answer = await axios.post(`${IMS_SERVER_ROUTING}timelineEvent/compareIncidentChanges`, timeline, { headers });
    sendMessage({ channelId: timeline.channelId, userName: "U05HQUCJMUN", files: answer.data.files, text: answer.data.description.join('') })
}