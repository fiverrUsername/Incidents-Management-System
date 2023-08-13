import { WebSocket } from 'ws'
import { IMessage, ObjectType, ActionType } from '../../ims-socket/src/interfaces'
import { IMS_CreateChannel } from './actions/via-ims/createChannel';
import { IIncident } from '../../ims-server/src/interfaces/IncidentInterface';
import { ITimelineEvent } from '../../ims-server/src/interfaces/ItimelineEvent';

import { sendMessageOnAddTimelineEvent } from './actions/via-ims/sendMessageOnAddTimelineEvent';
import { sendMassageOnChangePriority } from './actions/via-ims/sendMassageOnChangePriority';

const ws = new WebSocket('ws://localhost:7071');
const messageQueue: any[] = []; // Replace 'any' with the type of messages you are sending

ws.on('open', () => {
  console.log('WebSocket connection is open in ims-slack.');
  // Process the message queue
  while (messageQueue.length > 0) {
    const message = messageQueue.shift();
    send(message);
  }
});

const send = (message: IMessage) => {
  ws.send(JSON.stringify(message));
}

ws.onmessage = (webSocketMessage) => {
  const messageBody: IMessage = JSON.parse(webSocketMessage.data.toString());
  switch (messageBody.objectType) {
    case ObjectType.Incident:
      switch (messageBody.actionType) {
        case ActionType.Add:
          IMS_CreateChannel(messageBody.object as IIncident);
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
          sendMessageOnAddTimelineEvent(messageBody.object as ITimelineEvent)
          break;
        case ActionType.Update:
          // Perform some action for updating a TimelineEvent
          break;
        case ActionType.Delete:
          // Perform some action for deleting a TimelineEvent
          break;
        case ActionType.ChangePriority:
          sendMassageOnChangePriority(messageBody.object.channelId, messageBody.object.priority)
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

export const sendToSocket = (object: ITimelineEvent | IIncident, objectType: ObjectType, actionType: ActionType) => {
  const sendObj: IMessage = { objectType, actionType, object };
  if (ws.readyState === WebSocket.OPEN) {
    send(sendObj);
  } else {
    messageQueue.push(sendObj);
  }
}