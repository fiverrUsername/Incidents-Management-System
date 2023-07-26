import { WebSocket } from 'ws'
import { IIncident } from '../interfaces/IncidentInterface';
import { ITimelineEvent } from '../interfaces/ItimelineEvent';

const ws = new WebSocket('ws://localhost:7071');

const messageQueue: any[] = []; // Replace 'any' with the type of messages you are sending

export enum ObjectType {
  Incident,
  TimelineEvent
}

export enum ActionType {
  Add,
  Update,
  Delete,
}

export interface IMessage {
  objectType: ObjectType,
  actionType: ActionType,
  object: ITimelineEvent | IIncident
}

ws.on('open', () => {
  console.log('WebSocket connection is open.');

  // Process the message queue
  while (messageQueue.length > 0) {
    const message = messageQueue.shift();
    send(message);
  }
});

const send = (message: IMessage) => {
  ws.send(JSON.stringify(message));
}


export const sendToSocket = (object: IIncident | ITimelineEvent, objectType: ObjectType, actionType: ActionType) => {
  const sendObj: IMessage = { objectType, actionType, object };
  if (ws.readyState === WebSocket.OPEN) {
    send(sendObj);
  } else {
    messageQueue.push(sendObj);
  }
}