
import { Status, EncidentType, Priority } from '../../../../ims-server/src/enums/enum';
import { IIncident } from "../../../../ims-server/src/interfaces/IncidentInterface";
import { sendToSocket } from "../../socket";
import { ActionType, ObjectType } from "../../../../ims-socket/src/interfaces";
import { client } from '../../const';
import { ConversationsInfoResponse } from '@slack/web-api';
import { getSlackDataByChannelId } from '../base/getSlackDataByChannelId';
export async function createIncident(channelId: string) {
  try {
    const slackData: ConversationsInfoResponse | null = await getSlackDataByChannelId(channelId);
    if (!slackData) {
      throw new Error('Channel not found in Slack');
    }
    const newIncident: IIncident = {
      //TODO
      name: slackData?.channel?.name || "no incident name",
      status: Status.Active,
      description: "This channel created in slack",
      currentPriority: Priority.P0,
      type: EncidentType.Technical,
      durationHours: 0,
      channelId: channelId,
      slackLink: `https://slack.com/app_redirect?channel=${channelId}`,
      channelName: slackData?.channel?.name,
      currentTags: [],
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      cost: 0,
      createdBy: '',
    };
    sendToSocket(newIncident, ObjectType.Incident, ActionType.Add);
    console.log('Incident created successfully');
  } catch (error) {
    console.error('Error creating incident:', error);
  }
}





