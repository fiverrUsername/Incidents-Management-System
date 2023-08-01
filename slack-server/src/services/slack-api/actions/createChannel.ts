import { SLACK_API_TOKEN } from './const';

 interface ITag {
  id: string;
  name: string;
}


  interface IIncident {
  name: string;
  status: string;
  description: string;
  currentPriority: string;
  type: string;
  durationHours: number;
  channelId?: string;
  slackLink: string;
  channelName?: string;
  currentTags: ITag[];
  date: string;
  createdAt: string;
  updatedAt: string;
  cost: number;
  createdBy: string;
}




//TODO- change the userIds
const userIds = ['U05HXKPD259'];
export async function createNewChannel(incidentData: IIncident) {
  try {
    console.log("i am in create channel")
    const response = await axios.post('https://slack.com/api/conversations.create', {
      name: incidentData.channelName,
      user_ids: userIds,
      is_private: false,
    }, {
      headers: {
        'Authorization': `Bearer ${SLACK_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    const data = response.data;
    if (data.ok) {
      console.log('New public channel created:', data.channel.name);
      const channelId = data.channel.id;
      //TODO
      // try {
      //   await updateChannelDescription(channelId, incidentData.description);
      //   console.log('Channel description updated successfully.');
      // } catch (error) {
      //   console.error('Error updating channel description:', error);
      // }


      //TODO
      //- send to the function in ims-server
      incidentData.channelId = channelId;
      incidentData.description = "y3";    
      incidentData.slackLink = `https://slack.com/app_redirect?channel=${channelId}`;
      console.log("slack link", incidentData.slackLink )



      
      // await IncidentController.updateIncident(incidentData);

      await sendJoinMessageToUser(channelId, userIds, incidentData.name);
      return channelId;
    } else {
      console.error('Failed to create channel:', data.error);
      return null;
    }

  } catch (error) {
    console.error('Error creating channel:', error);
    return null;
  }


}
const webhookUrl = 'https://hooks.slack.com/services/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';
const axios = require('axios');
async function sendJoinMessageToUser(channelId: string, userId: string[], channelName:string) {
  try {
    await axios.post(webhookUrl, {
      text: `You have been invited to join the channel ${channelName}. Click the link to join: https://slack.com/app_redirect?channel=${channelId}`,
      channel: userId
    });
  } catch (error) {
    console.error(`Error sending join invitation to user ${userId}:`, error);
  }

}





async function sendMessageToChannel(channelId: string, message: string) {
  try {
    const response = await axios.post('https://slack.com/api/chat.postMessage', {
      channel: channelId,
      text: message
    }, {
      headers: {
        'Authorization': `Bearer ${SLACK_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    const data = response.data;
    if (data.ok) {
      console.log('Message sent to Slack successfully!');
      return data.ts;
    } else {
      console.error('Error sending message to Slack:', data.error);
      return null;
    }
  } catch (error) {
    console.error('Error sending message to Slack:', error);
    return null;
  }
}




async function getSlackUsers() {
  try {
    const response = await axios.get('https://slack.com/api/users.list', {
      headers: {
        Authorization: `Bearer ${SLACK_API_TOKEN}`,
      },
    });

    const data = response.data;
    if (data.ok) {
      return data.members;

    } else {
      console.error(`Failed to fetch users: ${data.error}`);
      return [];
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}


// getSlackUsers()




function updateChannelDescription(channelId: any, description: string) {
  throw new Error('Function not implemented.');
}


const theIncident:IIncident={
"name": "ddd",
"status": "Active",
"description": "d",
"currentPriority": "p1",
"type": "technical",
"durationHours": 0,
"channelId": "",
"channelName": "try3",
"slackLink": "",
"date": "2023-07-25T13:46:53.690Z",
"createdAt": "2023-07-25T13:46:53.690Z",
"updatedAt":"2023-07-25T13:46:53.690Z",
"cost": 0,
"createdBy": "?",
"currentTags": [],
}

createNewChannel(theIncident)