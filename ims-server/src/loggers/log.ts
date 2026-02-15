import pino, { Logger } from 'pino'
import fs from 'fs';

const levels: any = {
  http: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

const file: string = process.env.LOG_DESTINATION || '';
const logFile: fs.WriteStream = fs.createWriteStream(file, { flags: 'a' });

const logger: Logger = pino({
  level: process.env.PINO_LOG_LEVEL || 'info',
  customLevels: levels,
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  prettifier: require('pino-pretty'),
}, logFile);


export default logger;