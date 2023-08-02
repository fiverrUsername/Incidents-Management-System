import axios from 'axios'
import FormData from 'form-data';
import { Priority } from '../../../../../ims-server/src/enums/enum';
import { ITimelineEvent } from '../../../../../ims-server/src/interfaces/ItimelineEvent';
import { SLACK_TOKEN } from '../actions/const';
import moment from 'moment';
import { sendToSocket } from '../../socket';
import { ActionType, ObjectType } from '../../../../../ims-socket/src/interfaces';

export default async function handleMessageEvent(event: any) {
  const answer = await axios.get(`http://localhost:7000/incident/${event.channel}/channelId`);
  if (answer.data) {
    const timelineEvent: ITimelineEvent = {
      channelId: event.channel,
      incidentId: answer.data.id!,
      userId: '14785',
      description: event.text,
      priority: decodeMessagePriority(event.text) || Priority.P0,
      type: 'security',
      files: event.files && (await fileResponse(event.files, answer.data.id!)) || [],
      createdDate: new Date(),
      updatedDate: decodeMessageDate(event.text) || new Date(),
    };
    sendToSocket(timelineEvent, ObjectType.TimelineEvent, ActionType.Add);
   console.log(timelineEvent)
  }
}



export function decodeMessageDate(message: string): Date | null {
  const regex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/;
  const matches = message.match(regex);
  if (matches && matches.length > 0) {
    const dateString = matches[0];
    const formattedDate = moment(dateString, 'DD/MM/YYYY').toDate();
    return formattedDate;
  }
  return null;
}
export function decodeMessagePriority(message: string): Priority | null {
  const regex = /\b[Pp][0-3]\b/;
  const match = message.match(regex);
  if (match && match.length > 0) {
    const matchedValue = match[0].toUpperCase();
    switch (matchedValue) {
      case "P0" || "p0":
        return Priority.P0;
      case "P1" || "p1":
        return Priority.P1;
      case "P2" || "p2":
        return Priority.P2;
      case "P3" || "p3":
        return Priority.P3;
      default:
        return null;
    }
  } else {
    return null;
  }
}

async function fileResponse(files: any[], incidentId: string): Promise<string[]> {
  const filesKeys: string[] = [];
  const formData = new FormData();
  try {
    await Promise.all(files.map(async (file) => {
      const response = await axios.get(file.url_private_download, {
        headers: {
          Authorization: `Bearer ${SLACK_TOKEN}`,
        },
        responseType: 'blob',
      });
      const newName = `incidence_${incidentId}_${Date.now()}${file.name}`;
      filesKeys.push(newName);
      formData.append('files', response.data, { filename: newName });
    }));
    await axios.post('http://localhost:7000/attachment', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });
    return filesKeys;
  } catch (error: any) {
    console.error('Error extracting files:', error.message);
    return [];
  }
}
