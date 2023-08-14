import { IIncident } from '../../../../ims-server/src/interfaces/IncidentInterface';
import { ActionType, ObjectType } from '../../../../ims-socket/src/interfaces';
import { sendToSocket } from '../../socket';
import { createChannel } from '../base/createChannel';

const userIds = ['U05HXKPD259'];
export async function IMS_CreateChannel(incidentData: IIncident) {
  try {
    const name = incidentData.channelName?.toLocaleLowerCase() || 'No channel name';
    const channelId = await createChannel({
      currentPriority: incidentData.currentPriority,
      description: incidentData.description,
      isPrivate: false,
      name,
      userIds
    })
    incidentData.slackLink = `https://slack.com/app_redirect?channel=${channelId}`;
    incidentData.channelId = channelId || ''
    sendToSocket(incidentData, ObjectType.Incident, ActionType.Update);

  } catch (error) {
    console.error('Error creating channel:', error);
    return null;
  }
}
