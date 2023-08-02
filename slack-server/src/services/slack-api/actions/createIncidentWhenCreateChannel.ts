
// // const SLACK_API_TOKEN = 'xoxe-1-My0xLTU2MDk1MTEzNDIxNjMtNTU5NTYwNzQ4MjAwNy01NjMzNTg4NjkzNjcwLWEwOTFiNDFiYjRiMTY1MTgwOGU0YWRlMDY1MTUzYzhkODQwYmI4Y2RhY2M1MmFmNjYzZDcxMWJiZjZkYWUxZGY';
// import { SLACK_API_TOKEN } from "./const";
// import axios from 'axios';
// import addIncident from '../../../../../ims-server/src/controllers/IncidentController';
// import { IIncident } from '../../../../../ims-server/src/interfaces/IncidentInterface';
// import {EncidentStatus,EncidentType} from '../../../../../ims-server/src/enums/enum';

// export async function createIncident(channelId: string) {
//     try {
//         const slackData = await getSlackDataByChannelId(channelId);
//         console.log(slackData)
//         if (!slackData) {
//             throw new Error('Channel not found in Slack');
//         }

//         const newIncident: IIncident = {
//             //TODO
//             //Remove the id
//             id: '1',
//             name: slackData.name,
//             status: EncidentStatus.Active,
//             description: slackData.description,
//             currentPriority: 'p0',
//             type: EncidentType.Technical,//TODO
//             durationHours: 0,
//             channelId: slackData.channelId,
//             slackLink: slackData.channelLink,
//             channelName: slackData.name,
//             currentTags: [],//TODO
//             date: new Date().toISOString(),
//             createdAt: new Date().toISOString(),
//             updatedAt: new Date().toISOString(),
//             cost: 0,
//             createdBy: '', //TODO
//         };

//         //TODO
//         //Socket- call to updatedIncident in ims-server
//         // await addIncident(newIncident)


//         console.log('Incident created successfully');
//     } catch (error) {
//         console.error('Error creating incident:', error);
//     }
// }

// // דוגמה לפונקציה שמקבלת את ה-channelId ומחזירה את הנתונים המתאימים מה-Slack
// async function getSlackDataByChannelId(channelId: string): Promise<{ name: string, description: string, channelId: string, channelLink: string } | null> {
//     try {
//         const response = await axios.get(`https://slack.com/api/channels.info?channel=${channelId}`, {
//             headers: {
//                 Authorization: `Bearer ${SLACK_API_TOKEN}`,
//             },
//         });

//         const data = response.data;
//         if (data.ok) {
//             return {
//                 name: data.channel.name,
//                 description: data.channel.description,
//                 channelId: data.channel.id,
//                 channelLink: `https://slack.com/app_redirect?channel=${data.channel.id}`,
//             };
//         } else {
//             return null;
//         }
//     } catch (error) {
//         console.error('Error getting Slack data:', error);
//         return null;
//     }
// }

// // const channelId = 'YOUR_CHANNEL_ID';
// // createIncident(channelId);
//+++++++++++++++++++++++++++++++++++++++++++++++

import { Priority } from '../interfaces/priority-enum'
import { SLACK_API_TOKEN } from "./const";
import axios from 'axios';
import addIncident from '../../../../../ims-server/src/controllers/IncidentController';
import { IIncident } from '../../../../../ims-server/src/interfaces/IncidentInterface';
//  import { IIncident } from "./interfaces";
import { EncidentStatus, EncidentType } from '../../../../../ims-server/src/enums/enum';
import { ActionType, ObjectType } from '../../../../../ims-socket/src/interfaces';
import { sendToSocket } from '../../socket';

interface ITag {
  id: string;
  name: string;
}


// interface IIncident {

//   name: string;
//   status: string;
//   description: string;
//   currentPriority: Priority;
//   type: string;
//   durationHours: number;
//   channelId?: string;
//   slackLink: string;
//   channelName?: string;
//   currentTags: ITag[];
//   date: string;
//   createdAt: string;
//   updatedAt: string;
//   cost: number;
//   createdBy: string;
// }

export async function createIncident(channelId: string) {
  try {
    const slackData = await getSlackDataByChannelId(channelId);
    console.log(slackData)
    if (!slackData) {
      throw new Error('Channel not found in Slack');
    }
    const newIncident: IIncident = {
      //TODO
      name: slackData.name,
      status: EncidentStatus.Active,
      description: slackData.description,
      currentPriority: Priority.P0,
      type: EncidentType.Technical,//TODO
      durationHours: 0,
      channelId: slackData.channelId,
      slackLink: slackData.channelLink,
      channelName: slackData.name,
      currentTags: [],//TODO
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      cost: 0,
      createdBy: '', //TODO
    };
    console.log(newIncident)

    sendToSocket(newIncident, ObjectType.Incident, ActionType.Add);
    console.log('Incident created successfully');

  } catch (error) {
    console.error('Error creating incident:', error);
  }
}

async function getSlackDataByChannelId(channelId: string): Promise<{ name: string, description: string, channelId: string, channelLink: string } | null> {
  try {
    const response = await axios.get(`https://slack.com/api/conversations.info?channel=${channelId}`, {
      headers: {
        Authorization: `Bearer ${SLACK_API_TOKEN}`,
      },
    });
    const data = response.data;
    console.log("data", data);
    if (data.ok) {
      return {
        name: data.channel.name,
        description: data.channel.purpose.value,
        channelId: data.channel.id,
        channelLink: `https://slack.com/app_redirect?channel=${data.channel.id}`,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting Slack data:', error);
    return null;
  }
}

const channelId = 'C05JZP6D47R';
// createIncident(channelId);

