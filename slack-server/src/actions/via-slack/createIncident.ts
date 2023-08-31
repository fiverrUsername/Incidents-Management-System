import { ConversationsInfoResponse } from '@slack/web-api';
import logger from "../../loggers/log";
import { EncidentType, Priority, Status } from '../../../../ims-server/src/enums/enum';
import { IIncident } from "../../../../ims-server/src/interfaces/IncidentInterface";
import { ActionType, ObjectType } from "../../../../ims-socket/src/interfaces";
import { CHANNEL_REDIRECT, NO_INCIDENT_NAME } from '../../constPage';
import { sendToSocket } from "../../socket";
import { getSlackDataByChannelId } from '../base/getSlackDataByChannelId';
import { JoinBotToChannels } from '../base/joinBotToChannels'
import { constants, files } from '../../loggers/constants';


export async function createIncident(channelId: string) {
  try {
    await JoinBotToChannels(channelId);
    const slackData: ConversationsInfoResponse | null = await getSlackDataByChannelId(channelId);
    if (!slackData) {
      logger.fatal({ source: constants.CHANNEL_NOT_FOUND_IN_SLACK, file: files.CREATEINCIDENT });
    }
    const newIncident: IIncident = {
      //TODO
      name: slackData?.channel?.name || NO_INCIDENT_NAME,
      status: Status.Active,
      description: "This channel created in slack",
      currentPriority: Priority.P0,
      type: EncidentType.Technical,
      durationHours: 0,
      channelId: channelId,
      slackLink: `${CHANNEL_REDIRECT}${channelId}`,
      channelName: slackData?.channel?.name,
      currentTags: [],
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      cost: 0,
      createdBy: '',
    };
    console.log('----------------------------i am going to socket to create incident')
    sendToSocket(newIncident, ObjectType.Incident, ActionType.Add);
  } catch (error) {
    logger.error({ source: constants.ERROR_CREATING_INCIDENT, file: files.CREATEINCIDENT, method: constants.METHOD.POST, error: error })
  }
}





