import { WebSocket } from 'ws'
import { IMessage, ObjectType, ActionType } from '../../ims-socket/src/interfaces'
import { IMS_CreateChannel } from './actions/via-ims/createChannel';
import { IIncident } from '../../ims-server/src/interfaces/IncidentInterface';
import { ITimelineEvent } from '../../ims-server/src/interfaces/ItimelineEvent';

import { sendMessageOnAddTimelineEvent } from './actions/via-ims/sendMessageOnAddTimelineEvent';
import { sendMassageOnSpecificPriorityChannel } from './actions/via-ims/sendMassageOnChangePriority';
import { wsPort } from './constPage';
import logger from './loggers/log';
import { constants, files } from './loggers/constants';

const ws = new WebSocket(wsPort);
const messageQueue: IMessage[] = []; 

ws.on('open', () => {
  logger.info({ source: constants.SOCKET_WEBSOCKET_CONNECTION_IS_OPEN, file: files.SOCKET ,method:constants.METHOD.CLIENT })
  while (messageQueue.length > 0) {
    const message = messageQueue.shift();
    send(message!);
  }
});

const send = (message: IMessage) => {
  console.log("---------Im in send")
  ws.send(JSON.stringify(message));
  console.log("---------Im finish send")

}

ws.onmessage = (webSocketMessage) => {
  const messageBody: IMessage = JSON.parse(webSocketMessage.data.toString());
  switch (messageBody.objectType) {
    case ObjectType.Incident:
      switch (messageBody.actionType) {
        case ActionType.Add:
          console.log("-----------socket page add incident messageBody.object:  ", messageBody.object)
          IMS_CreateChannel(messageBody.object as IIncident);
          break;
        case ActionType.Update:
          // Perform some action for updating a TimelineEvent
          break;
        case ActionType.Delete:
          // Perform some action for deleting a TimelineEvent
          break;
        default:
          logger.error({ source: constants.SOCKET_ERROR_RECEIVED_UNKNOWN_ACTION_TYPE_FOR_TIMELINE+": "+messageBody,  file: files.SOCKET })
          break;
      }
      break;
    case ObjectType.TimelineEvent:
      switch (messageBody.actionType) {
        case ActionType.Add:
          console.log("-----------socket page add timeline messageBody.object:  ", messageBody.object)
          sendMessageOnAddTimelineEvent(messageBody.object as ITimelineEvent)
          break;
        case ActionType.Update:
          // Perform some action for updating a TimelineEvent
          break;
        case ActionType.Delete:
          // Perform some action for deleting a TimelineEvent
          break;
        case ActionType.ChangePriority:
          sendMassageOnSpecificPriorityChannel(messageBody.object.channelId, messageBody.object.priority)
          break;
        default:
          logger.error({ source: constants.SOCKET_ERROR_RECEIVED_UNKNOWN_ACTION_TYPE_FOR_TIMELINE+": "+messageBody,  file: files.SOCKET })
          break;
      }
      break;
    default:
      logger.error({ source: constants.SOCKET_ERROR_RECEIVED_UNKNOWN_OBJECT_TYPE+": "+messageBody,  file: files.SOCKET})
      break;
  }
};

export const sendToSocket = (object: ITimelineEvent | IIncident, objectType: ObjectType, actionType: ActionType) => {
  console.log("-----------------slack server! sendToSocket , object: ",object)
  const sendObj: IMessage = { objectType, actionType, object };
  if (ws.readyState === WebSocket.OPEN) {
    console.log("socket open!!!!!!!!!!!!!!!!1")
    send(sendObj);
  } else {
    console.log("socket close!!!!!!!!!!!!")
    messageQueue.push(sendObj);
  }
}