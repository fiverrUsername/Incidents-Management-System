import pino from 'pino'
import fs from 'fs';

const levels = {
  http: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

const file = process.env.LOG_DESTINATION || '';
const logFile = fs.createWriteStream(file, { flags: 'a' });

const logger = pino({
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