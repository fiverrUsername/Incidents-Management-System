import axios from 'axios';
import dotenv from 'dotenv';
import { EncidentType, Priority, Status } from '../../../../ims-server/src/enums/enum';
import { ITimelineEvent } from '../../../../ims-server/src/interfaces/ItimelineEvent';
import { ActionType, ObjectType } from '../../../../ims-socket/src/interfaces';
import { IMS_SERVER_ROUTING } from '../../constPage';
import { sendToSocket } from '../../socket';
import { decodeMessageDate } from '../base/decode/decodeMessageDate';
import { decodeMessagePriority } from '../base/decode/decodeMessagePriority';
import { decodeMessageStatus } from '../base/decode/decodeMessageStatus';
import { fileResponse } from './fileResponse';
import logger from '../../loggers/log';
import { constants, files } from '../../loggers/constants';


export const date:Date=new Date();
// Load environment variables from .env file
dotenv.config();
export default async function handleMessageEvent(event: any) {
  const headers = {
    Authorization: `Bearer ${process.env.API_KEY}`
  };
  try {
      const answer = await axios.get(`${IMS_SERVER_ROUTING}incident/${event.channel}/channelId`, { headers });
      if (answer.data) {
        console.log("---------event", event.files)
        const timelineEvent: ITimelineEvent = {
          channelId: event.channel,
          incidentId: answer.data.id!,
          userId: '14785',
          description: event.text,
          priority: decodeMessagePriority(event.text) || Priority.P0,
          type: EncidentType.Securing,
          files: event.files && (await fileResponse(event.files, answer.data.id!)) || [],
          createdDate: date,
          updatedDate: decodeMessageDate(event.text) || date,
          status: decodeMessageStatus(event.text) || Status.Active,
          tags: []
        };
        try {
          sendToSocket(timelineEvent, ObjectType.TimelineEvent, ActionType.Add);
        } catch (error) {
          logger.error({ source: constants.AXIOS_ERROR_GET_INCIDENT_BY_CHANNELID, file: files.CREATETIMELINE, method: constants.METHOD.POST, error: error })
        }
      }
  } catch (error) {
    logger.error({ source: constants.ERROR_CREATING_TIMELINEEVENT, file: files.CREATETIMELINE, method: constants.METHOD.GET, error: error })
    
  } 
  
}




