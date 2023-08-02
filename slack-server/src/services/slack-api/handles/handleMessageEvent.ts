import axios from 'axios'
import { Priority } from '../../../../../ims-server/src/enums/enum';
import { IIncident } from '../../../../../ims-server/src/interfaces/IncidentInterface';
import { ITimelineEvent } from '../../../../../ims-server/src/interfaces/ItimelineEvent';
import { SLACK_TOKEN } from '../actions/const';

    export default async function handleMessageEvent(event: any) {
      console.log(event);
    
      const answer:IIncident = await axios.post(`http://localhost:7000/incidect/${event.channel}/channelId`);
      const timelineEvent: ITimelineEvent = {
          channelId: event.channel,
          incidentId: answer.id,
          userId: '',
          description: event.text,
          priority:Priority.P0,
          type: '',
          files: ["jdjsfhjdksjfhsdj","fdsug"],
          createdDate: new Date(),
          updatedDate: new Date(),
          id: ''
      };
      console.log("---------------------------------------------");
    //   console.log(answer);
    }
    
    function decodeMessage(message: string): string | null {
        const regex = /\b[Pp][0-2]\b/; 
        const match = message.match(regex);
      
        if (match && match.length > 0) {
          return match[0].toUpperCase();
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