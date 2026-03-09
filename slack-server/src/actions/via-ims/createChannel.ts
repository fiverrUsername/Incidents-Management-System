import { IIncident } from '../../../../ims-server/src/interfaces/IncidentInterface';
import { ActionType, ObjectType } from '../../../../ims-socket/src/interfaces';
import { CHANNEL_REDIRECT, NO_CHANNEL_NAME } from '../../constPage';
import { constants, FILES } from '../../loggers/constants';
import logger from '../../loggers/log';
import { sendToSocket } from '../../socket';
import { createChannel } from '../base/createChannel';

const userIds: string[] = ['U05HXKPD259'];

export async function IMS_CreateChannel(incidentData: IIncident) {
  try {
    const name: string = incidentData.channelName?.toLocaleLowerCase() || NO_CHANNEL_NAME;
    const channelId: string | null = await createChannel({
      currentPriority: incidentData.currentPriority,
      description: incidentData.description,
      isPrivate: false,
      name,
      userIds
    })
    incidentData.slackLink = `${CHANNEL_REDIRECT}${channelId}`;
    incidentData.channelId = channelId || ''
    sendToSocket(incidentData, ObjectType.Incident, ActionType.Update);
  } catch (error) {
    logger.error({ source: constants.ERROR_CREATING_CHANNEL, file: FILES.CREATECHANNEL, method: constants.METHOD.POST, error: error })
    return null;
  }
}