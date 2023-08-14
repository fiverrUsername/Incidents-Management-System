import { IIncident } from '../../../../ims-server/src/interfaces/IncidentInterface';
import { ActionType, ObjectType } from '../../../../ims-socket/src/interfaces';
import { CHANNEL_REDIRECT, ERROR_CREATING_CHANNEL, NO_CHANNEL_NAME } from '../../constPage';
import { sendToSocket } from '../../socket';
import { createChannel } from '../base/createChannel';

const userIds = ['U05HXKPD259'];
export async function IMS_CreateChannel(incidentData: IIncident) {
  try {
    const name = incidentData.channelName?.toLocaleLowerCase() || NO_CHANNEL_NAME;
    const channelId = await createChannel({
      currentPriority: incidentData.currentPriority,
      description: incidentData.description,
      isPrivate: false,
      name,
      userIds
    })
    incidentData.slackLink = `${CHANNEL_REDIRECT}${channelId}`;
    sendToSocket(incidentData, ObjectType.Incident, ActionType.Update);
  } catch (error) {
    console.error(ERROR_CREATING_CHANNEL, error);
    return null;
  }
}
