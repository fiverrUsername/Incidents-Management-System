import axios from "axios";
import dotenv from 'dotenv';

import { ITimelineEvent } from "../../../../ims-server/src/interfaces/ItimelineEvent";
import { IMS_SERVER_ROUTING } from "../../constPage";
import { sendMessage } from "../base/sendMessage";
import logger from "../../loggers/log";
import { constants, files } from "../../loggers/constants";

// Load environment variables from .env file
dotenv.config();
export async function sendMassageOnSpecificPriorityChannel(timeline: ITimelineEvent) {
   try {
        console.log("----------------------------i am in sendMassageOnSpecificPriorityChannel");
        const headers = {
            Authorization: `Bearer ${process.env.API_KEY}`
        };
        const answer = await axios.post(`${IMS_SERVER_ROUTING}timelineEvent/compareIncidentChanges`, timeline, { headers });
        sendMessage({ channelId: timeline.channelId, userName: "U05HQUCJMUN", files: answer.data.files, text: answer.data.description.join('') })
   } catch (error) {
        logger.error({ source: constants.AXIOS_ERROR_COMPAREINCIDENTCHANGES, file: files.SENDMESSAGEONADDTIMELINEEVENT , method: constants.METHOD.POST, error: error })
   }
    
}