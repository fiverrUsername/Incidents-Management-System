import axios from 'axios';
import { EncidentType, Priority, Status } from '../../../../ims-server/src/enums/enum';
import { ITimelineEvent } from '../../../../ims-server/src/interfaces/ItimelineEvent';
import { ActionType, ObjectType } from '../../../../ims-socket/src/interfaces';
import { decodeMessageDate } from '../base/decode/decodeMessageDate';
import { decodeMessagePriority } from '../base/decode/decodeMessagePriority';
import { fileResponse } from './fileResponse';
import { sendToSocket } from '../../socket';
import { IMS_SERVER_ROUTING } from '../../constPage';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
export default async function handleMessageEvent(event: any) {
  const headers = {
    Authorization: `Bearer ${process.env.API_KEY}`
  };
  const answer = await axios.get(`${IMS_SERVER_ROUTING}incident/${event.channel}/channelId`, { headers });
  if (answer.data) {
    const timelineEvent: ITimelineEvent = {
      channelId: event.channel,
      incidentId: answer.data.id!,
      userId: '14785',
      description: event.text,
      priority: decodeMessagePriority(event.text) || Priority.P0,
      type: EncidentType.Securing,
      files: event.files && (await fileResponse(event.files, answer.data.id!)) || [],
      createdDate: new Date(),
      updatedDate: decodeMessageDate(event.text) || new Date(),
      status: Status.Active,
      tags: []
    };
    sendToSocket(timelineEvent, ObjectType.TimelineEvent, ActionType.Add);
    console.log(timelineEvent)
  }
}




