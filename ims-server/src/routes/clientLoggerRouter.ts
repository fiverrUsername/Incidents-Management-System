import express from "express";
import fs from 'fs';
import logger from "../loggers/log";

const router = express.Router();

router.post("/",  async (req, res) => {
    const logData = req.body;
    const logEntry = `time:[${new Date().toISOString()}] level:[${logData.level}] massage:[${logData.message}]\n`;
    try {
        await fs.promises.appendFile('ClientLogs.log', logEntry);
        res.status(200).send("Log entry added successfully");
      } catch (error) {
        logger.error(`Error appending log entry: ${error}`);
        res.status(500).send("Failed to append log entry");
      }
  });

export default router;