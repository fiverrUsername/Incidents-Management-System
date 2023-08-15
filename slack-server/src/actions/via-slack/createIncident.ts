
import { Status, EncidentType, Priority } from '../../../../ims-server/src/enums/enum';
import { IIncident } from "../../../../ims-server/src/interfaces/IncidentInterface";
import { sendToSocket } from "../../socket";
import { ActionType, ObjectType } from "../../../../ims-socket/src/interfaces";
import { ConversationsInfoResponse } from '@slack/web-api';
import { getSlackDataByChannelId } from '../base/getSlackDataByChannelId';
import { CHANNEL_REDIRECT, ERROR_CREATING_INCIDENT, NO_INCIDENT_NAME } from '../../constPage';
import axios from 'axios';
import { IMS_SERVER_ROUTING } from '../../constPage';

export async function createIncident(channelId: string) {
  try {
    const slackData: ConversationsInfoResponse | null = await getSlackDataByChannelId(channelId);
    if (!slackData) {
      throw new Error('Channel not found in Slack');
    }
    const headers = {
      Authorization: `Bearer ${process.env.API_KEY}`
    };
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
    const answer = await axios.get(`${IMS_SERVER_ROUTING}incident/${newIncident.channelId}/channelId`, { headers });
    sendToSocket(newIncident, ObjectType.Incident, ActionType.Add);
    console.log('Incident created successfully');
  } catch (error) {
    console.error(ERROR_CREATING_INCIDENT, error);
  }
}
