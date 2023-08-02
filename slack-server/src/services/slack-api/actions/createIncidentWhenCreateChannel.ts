

import { SLACK_API_TOKEN } from "./const";
import axios from 'axios';
import { EncidentStatus, EncidentType, Priority } from '../../../../../ims-server/src/enums/enum';
import { IIncident } from "../../../../../ims-server/src/interfaces/IncidentInterface";
import { sendToSocket } from "../../socket";
import { ActionType, ObjectType } from "../../../../../ims-socket/src/interfaces";
export async function createIncident(channelId: string) {
  try {
    const slackData = await getSlackDataByChannelId(channelId);
    console.log(slackData)
    if (!slackData) {
      throw new Error('Channel not found in Slack');
    }
    const newIncident: IIncident = {
      //TODO
      name: slackData.name,
      status: EncidentStatus.Active,
      description: slackData.description,
      currentPriority: Priority.P0,
      type: EncidentType.Technical,//TODO
      durationHours: 0,
      channelId: slackData.channelId,
      slackLink: slackData.channelLink,
      channelName: slackData.name,
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
    console.error('Error creating incident:', error);
  }
}

async function getSlackDataByChannelId(channelId: string): Promise<{ name: string, description: string, channelId: string, channelLink: string } | null> {
  try {
    const response = await axios.get(`https://slack.com/api/conversations.info?channel=${channelId}`, {
      headers: {
        Authorization: `Bearer ${SLACK_API_TOKEN}`,
      },
    });
    const data = response.data;
    console.log("data", data);
    if (data.ok) {
      return {
        name: data.channel.name,
        description: "This channel created in slack",
        channelId: data.channel.id,
        channelLink: `https://slack.com/app_redirect?channel=${data.channel.id}`,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting Slack data:', error);
    return null;
  }
}


