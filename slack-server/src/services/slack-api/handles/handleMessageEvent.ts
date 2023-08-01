import axios from 'axios'
import { Priority } from '../../../../../ims-server/src/enums/enum';
import { IIncident } from '../../../../../ims-server/src/interfaces/IncidentInterface';
import { ITimelineEvent } from '../../../../../ims-server/src/interfaces/ItimelineEvent';
import { SLACK_TOKEN } from '../actions/const';
import moment from 'moment';

export default async function handleMessageEvent(event: any) {
  console.log(event);
  console.log("---------------------------------------------");

  const answer: IIncident = await axios.get(`http://localhost:7000/incident/${event.channel}/channelId`);
  const timelineEvent: ITimelineEvent = {
    channelId: event.channel,
    incidentId: answer.id,
    userId: '',
    description: event.text,
    priority: decodeMessage(event.text) || Priority.P0,
    type: '',
    files: ["jdjsfhjdksjfhsdj", "fdsug"],
    createdDate: new Date(),
    updatedDate: findDateTimeInString(event.text) || new Date(),
    id: ''
  };


}

export function findDateTimeInString(inputString: string): Date | null {
  const datePattern = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/;
  const matches = inputString.match(datePattern);
  if (matches && matches.length > 0) {
    const dateString = matches[0];
    const formattedDate = moment(dateString, 'DD/MM/YYYY').toDate();
    return formattedDate;
  }
  return null;
}

export function decodeMessage(message: string): Priority | null {
  const regex = /\b[Pp][0-2]\b/;
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
      default:
        return null;
    }
  } else {
    return null;
  }
}



async function fileResponse(files: any[]): Promise<Buffer[]> {
  try {
    const fetchPromises = files.map(async (file) => {
      const response = await axios.get(file.url_private_download, {
        headers: {
          Authorization: `Bearer ${SLACK_TOKEN}`,
        },
        responseType: 'arraybuffer', // This will ensure the response is treated as a buffer
      });

      return Buffer.from(response.data, 'binary');
    });

    return Promise.all(fetchPromises);
  } catch (error: any) {
    console.error('Error extracting files:', error.message);
    return [];
  }
}


