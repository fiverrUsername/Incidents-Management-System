import log from 'loglevel';
import axios from 'axios';
import { Level } from './interface/enums';
import remote from 'loglevel-plugin-remote';
import { any } from 'prop-types';

const baseUrl = process.env.REACT_APP_API_KEY

export default class Logger {
 static info(msg: string): void {
    log.info(msg);
    sendLogToServer(Level.info, msg);
  }
  static debug(msg: string): void {
    log.debug(msg);
    sendLogToServer(Level.debug, msg);
  }
  static error(msg: string): void {
    log.error(msg);
    sendLogToServer(Level.error, msg);
  }
  static trace(msg: string): void {
    log.trace(msg);
    sendLogToServer(Level.trace, msg);
  }
  static warn(msg: string): void {
    log.warn(msg);
    sendLogToServer(Level.warn, msg);
  }
}

// פונקציה לשליחת הלוג לשרת
// function sendLogToServer(level: Level, message: string) {
//   // const logData = {
//   //   level,
//   //   message,
//   //   timestamp: new Date().toISOString(),
//   // };
//   // axios.post(`${baseUrl}/log`, logData)
//   //   .then(response => { 
//   //     console.log(response.data);
//   //   })
//   //   .catch(error => {
//   //     console.log(error);
//   //   });
//   const defaults:any = {
//     url:`${baseUrl}/log`,
//     method: 'POST',
//     timeout: 0,
//     interval: 1000,
//     level: level,
//     timestamp: () => new Date().toISOString(),
//     format: remote.plain,
//     message: message,
//   };  
//   remote.apply(log, defaults )
// }
const defaults = {
  url: `${baseUrl}/log`,
  method: 'POST',
  timeout: 0,
  interval: 1000,
  level: 'debug', // כאן ניתן לקבוע את הרמת הלוג המועדפת לשליחה
  timestamp: () => new Date().toISOString(),
  format: remote.plain,
};

remote.apply(log, defaults);
