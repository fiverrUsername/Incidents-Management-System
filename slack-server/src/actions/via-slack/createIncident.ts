
import { EncidentStatus, EncidentType, Priority } from '../../../../ims-server/src/enums/enum';
import { IIncident } from "../../../../ims-server/src/interfaces/IncidentInterface";
import { sendToSocket } from "../../socket";
import { ActionType, ObjectType } from "../../../../ims-socket/src/interfaces";

import { ConversationsInfoResponse } from '@slack/web-api';
import { getSlackDataByChannelId } from '../base/getSlackDataByChannelId';
import { CHANNEL_REDIRECT, ERROR_CREATING_INCIDENT, NO_INCIDENT_NAME } from '../../constPage';
export async function createIncident(channelId: string) {
  try {
    const slackData:ConversationsInfoResponse|null = await getSlackDataByChannelId(channelId);
    const newIncident: IIncident = {
      //TODO
      name: slackData?.channel?.name || NO_INCIDENT_NAME,
      status: EncidentStatus.Active,
      description: "This channel created in slack",
      currentPriority: Priority.P0,
      type: EncidentType.Technical,//TODO
      durationHours: 0,
      channelId: channelId,
      slackLink: `${CHANNEL_REDIRECT}${channelId}`,
      channelName: slackData?.channel?.name,
      currentTags: [],//TODO
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      cost: 0,
      createdBy: '', //TODO
    };
    sendToSocket(newIncident, ObjectType.Incident, ActionType.Add);
    console.log('Incident created successfully');
  } catch (error) {
    console.error(ERROR_CREATING_INCIDENT, error);
  }
}


