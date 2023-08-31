import log from 'loglevel';
import axios from 'axios';
import { Level } from '../interfaces/enums';
import { ILogData, ILogRecievedData } from '../interfaces/ILogger';

const baseUrl = process.env.REACT_APP_API_KEY

export default class Logger {
 static info(data: ILogRecievedData): void {
    log.info(data.message);
    sendLogToServer(Level.info, data);
  }
  static debug(data: ILogRecievedData): void {
    log.debug(data.message);
    sendLogToServer(Level.debug, data);
  }
  static error(data: ILogRecievedData): void {
    log.error(data.message);
    sendLogToServer(Level.error, data);
  }
  static trace(data: ILogRecievedData): void {
    log.trace(data.message);
    sendLogToServer(Level.trace, data);
  }
  static warn(data: ILogRecievedData): void {
    log.warn(data.message);
    sendLogToServer(Level.warn, data);
  }
}
 function sendLogToServer(level:Level, data:ILogRecievedData) {
  const logData:ILogData = {
    level,
    message:data.message,
    timestamp: new Date().toISOString(),
    ...(data.source && { source :data.source}),
    };
  axios.post(`${baseUrl}/log`, logData)
    .then(response => { 
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
}
