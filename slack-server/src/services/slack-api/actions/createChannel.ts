import { IIncident } from '../../../../../ims-server/src/interfaces/IncidentInterface';


const slackApiToken = 'xoxb-5609511342163-5604717800598-XAxj3F4jbNGLav6i5DkQZkJw';
//TODO- change the userIds
const userIds = ['U05HXKPD259'];
// const userIds = ['C05JMDNMH1Q'];
export async function createNewChannel(incidentData: IIncident) {
  try {
    const response = await axios.post('https://slack.com/api/conversations.create', {
      name: incidentData.channelName,
      user_ids: userIds,
      is_private: false,
    }, {
      headers: {
        'Authorization': `Bearer ${slackApiToken}`,
        'Content-Type': 'application/json'
      }
    });
    const data = response.data;
    if (data.ok) {
      console.log('New public channel created:', data.channel.name);
      const channelId = data.channel.id;
      await sendJoinMessageToUser(channelId, userIds);
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
async function sendJoinMessageToUser(channelId: string, userId: string[]) {
  try {
    await axios.post(webhookUrl, {
      text: `You have been invited to join the channel. Click the link to join: https://slack.com/app_redirect?channel=${channelId}`,
      channel: userId
    });
  } catch (error) {
    console.error(`Error sending join invitation to user ${userId}:`, error);
  }
  //TODO- send to the function in ims-server
  // IncidentController.updateIncident
}





async function sendMessageToChannel(channelId: string, message: string) {
  try {
    const response = await axios.post('https://slack.com/api/chat.postMessage', {
      channel: channelId,
      text: message
    }, {
      headers: {
        'Authorization': `Bearer ${slackApiToken}`,
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





// const theIncident:IIncident={
// "_id": "1111",
// "id": "1",
// "name": "ddd",
// "status": "Active",
// "description": "d",
// "currentPriority": "p1",
// "type": "technical",
// "durationHours": 0,
// "channelId": "",
// "channelName": "ddd",
// "slackLink": "",
// "date": "2023-07-25T13:46:53.690Z",
// "createdAt": "2023-07-25T13:46:53.690Z",
// "updatedAt":"2023-07-25T13:46:53.690Z",
// "cost": 0,
// "createdBy": "?",
// "currentTags": [],
// }

// createNewChannel(theIncident)