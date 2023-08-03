import { InvitePeopleToChannel } from './InvitePeopleToChannel';
import { IIncident } from '../../../../../ims-server/src/interfaces/IncidentInterface';
import { ActionType, ObjectType } from '../../../../../ims-socket/src/interfaces';
import { sendToSocket } from '../../socket';
import { updateChannelDescription } from './updateChannelDescription'
import { sendMassageOnChangePriority } from './sendMassageOnChangePriority';
import { client } from './const';
//TODO- change the userIds
const userIds = ['U05HXKPD259'];
export async function createNewChannel(incidentData: IIncident) {
  try {
    const name = incidentData.channelName || 'No channel name';
      const response = await client.conversations.create({
      name,
      user_ids: userIds,
      is_private: false,
    });
    const data:any = response.data;
    if (response.ok) {
      console.log('New public channel created:', response.channel?.name);
      const channelId = response.channel?.id||"no channel id";
      incidentData.channelId = channelId;
      await InvitePeopleToChannel(channelId, userIds);
      incidentData.description = await updateChannelDescription(channelId, incidentData.description) || "no description";
      incidentData.slackLink = `https://slack.com/app_redirect?channel=${channelId}`;
      sendToSocket(incidentData, ObjectType.Incident, ActionType.Update);
      await sendMassageOnChangePriority(channelId, incidentData.currentPriority)
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


