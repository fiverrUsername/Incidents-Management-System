import { WebSocket } from 'ws'
import {IIncident} from '../../../ims-server/src/interfaces/IncidentInterface'
import { ITimelineEvent } from '../interfaces/ItimelineEvent';
import { IMessage, ActionType, ObjectType } from '../../../ims-socket/src/interfaces';
import incidentRepository from '../repositories/incidentRepository';
import timelineEventRepository from '../repositories/timelineEventRepository';

const ws = new WebSocket('wss://ims-socket.onrender.com/');

const messageQueue: any[] = []; // Replace 'any' with the type of messages you are sending

ws.on('open', () => {
  // Process the message queue
  while (messageQueue.length > 0) {
    const message = messageQueue.shift();
    send(message);
  }
});

const send = (message: IMessage) => {
  ws.send(JSON.stringify(message));
}

ws.onmessage = (webSocketMessage: { data: { toString: () => string; }; }) => {
  const messageBody: IMessage = JSON.parse(webSocketMessage.data.toString());
  switch (messageBody.objectType) {
    case ObjectType.Incident:
      switch (messageBody.actionType) {
        case ActionType.Add:
          incidentRepository.addIncident(messageBody.object as IIncident)
          break;
        case ActionType.Update:
          incidentRepository.updateIncident(messageBody.object.id!, messageBody.object as IIncident)
          // Perform some action for updating a TimelineEvent
          break;
        case ActionType.Delete:
          // Perform some action for deleting a TimelineEvent
          break;
        default:
          break;
      }
      break;
    case ObjectType.TimelineEvent:
      switch (messageBody.actionType) {
        case ActionType.Add:
          timelineEventRepository.addTimelineEvent(messageBody.object as ITimelineEvent)
          break;
        case ActionType.Update:
          timelineEventRepository.updateTimelineEvent(messageBody.object.id!, messageBody.object as ITimelineEvent)
          break;
        case ActionType.Delete:
          timelineEventRepository.deleteTimelineEvent(messageBody.object.id!)
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

export const sendToSocket = (object: IIncident | ITimelineEvent, objectType: ObjectType, actionType: ActionType) => {
  console.log("---------sendToSocket in ims server. the object: ", object)
  const sendObj: IMessage = { objectType, actionType, object };
  if (ws.readyState === WebSocket.OPEN) {
    send(sendObj);
  } else {
    messageQueue.push(sendObj);
  }
}