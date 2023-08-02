import { InvitePeopleToChannel } from './InvitePeopleToChannel';
import { IIncident } from '../../../../../ims-server/src/interfaces/IncidentInterface';
import { ActionType, ObjectType } from '../../../../../ims-socket/src/interfaces';
import { sendToSocket } from '../../socket';
import { updateChannelDescription } from './updateChannelDescription'
import { SLACK_API_TOKEN } from './const';
//TODO- change the userIds
const userIds = ['U05HXKPD259'];
export async function createNewChannel(incidentData: IIncident) {
  try {
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
      incidentData.channelId = channelId;
      await InvitePeopleToChannel(channelId, userIds);
       incidentData.description  = await updateChannelDescription(channelId, incidentData.description)||"no description";
      incidentData.slackLink = `https://slack.com/app_redirect?channel=${channelId}`;
      sendToSocket(incidentData, ObjectType.Incident, ActionType.Update);
      console.log("slack link", incidentData.slackLink)
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
async function sendJoinMessageToUser(channelId: string, userId: string[], channelName: string) {
  try {
    await axios.post(webhookUrl, {
      text: `You have been invited to join the channel ${channelName}. Click the link to join: https://slack.com/app_redirect?channel=${channelId}`,
      channel: userId
    });
  } catch (error) {
    console.error(`Error sending join invitation to user ${userId}:`, error);
  }
}

