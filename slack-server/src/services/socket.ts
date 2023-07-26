import { WebSocket } from 'ws'
import { IMessage, ObjectType, ActionType } from '../../../ims-server/src/services/socket'
import { Im } from '@slack/web-api/dist/response/RtmStartResponse';

const ws = new WebSocket('ws://localhost:7071');

ws.on('open', () => {
  console.log('WebSocket connection is open.');
});

ws.onmessage = (webSocketMessage) => {
  const messageBody: IMessage = JSON.parse(webSocketMessage.data.toString());
  if (messageBody.objectType === ObjectType.Incident && messageBody.actionType === ActionType.Add) {
    console.log('incident');
    
  } else {
    // Handle other types of messages or log an error for unknown types
    console.log('Received unknown message type:', messageBody);
  }
  console.log(messageBody)
};
