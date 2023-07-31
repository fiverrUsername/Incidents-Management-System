import { WebSocket } from 'ws'
import { IMessage, ObjectType, ActionType } from '../../../ims-socket/src/interfaces'
import { Im } from '@slack/web-api/dist/response/RtmStartResponse';
import { createNewChannel } from './slack-api/actions/createChannel';
import { IIncident } from '../../../ims-server/src/interfaces/IncidentInterface';
import {  addTimeLineEvent } from './slack-api/wrap/sendTimeLine';
import { ITimelineEvent } from '../../../ims-server/src/interfaces/ItimelineEvent';
import { sendMassageOnChangePriority } from './slack-api/actions/sendMassageOnChangePriority';
const ws = new WebSocket('ws://localhost:7071');

ws.on('open', () => {
  console.log('WebSocket connection is open in slack-server.');
});

ws.onmessage = (webSocketMessage:any) => {
  const messageBody: IMessage = JSON.parse(webSocketMessage.data.toString());
  switch (messageBody.objectType) {
    case ObjectType.Incident:
      switch (messageBody.actionType) {
        case ActionType.Add:
          createNewChannel(messageBody.object as IIncident);
          break;
        case ActionType.Update:
          // Perform some action for updating a TimelineEvent
          break;
        case ActionType.Delete:
          // Perform some action for deleting a TimelineEvent
          break;
        default:
          console.log('Received unknown action type for Incident:', messageBody);
          break;
      }
      break;
    case ObjectType.TimelineEvent:
      switch (messageBody.actionType) {
        case ActionType.Add:
          addTimeLineEvent(messageBody.object as ITimelineEvent)
          break;
        case ActionType.Update:
          // Perform some action for updating a TimelineEvent
          break;
        case ActionType.Delete:
          // Perform some action for deleting a TimelineEvent
          break;
        case ActionType.ChangePriority:
          sendMassageOnChangePriority(messageBody.object.channelId,messageBody.object.priority)
          break;
        default:
          console.log('Received unknown action type for TimelineEvent:', messageBody);
          break;
      }
      break;
    default:
      console.log('Received unknown object type:', messageBody);
      break;
  }
};
