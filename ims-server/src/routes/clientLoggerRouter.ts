import express from "express";
import fs from 'fs';
import ILogData from '../interfaces/ILog'
import { status ,constants} from "../loggers/constants";

const router = express.Router();

router.post("/",  async (req, res) => {
    const logData:ILogData = req.body;
    const logEntry = `time:[${logData.timestamp}] level:[${logData.level}] massage:[${logData.message}] source:[${logData.source}]\n`;
    try {
        await fs.promises.appendFile('ClientLogs.log', logEntry);
        res.status(status.SUCCESS).json({message:constants.ADD_CLIENT_LOG_ENTRY_SUCCESS});

      } catch (error) {
        res.status(status.SERVER_ERROR).json({message:constants.ADD_CLIENT_LOG_ENTRY_FAILED});
      }
  });

export default router;