import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import events from './slackTracking';
import cors from 'cors';
import { WEBHOOK_EVENT_RECEIVED_SUCCESSFULLY, port } from './constPage';
import { constants, files } from './loggers/constants';
import logger from './loggers/log';

const app = express();
require('dotenv').config()

app.use(bodyParser.json());
app.use(cors({
  origin: true,
  credentials: true,
  methods: 'POST,GET,PUT,OPTIONS,DELETE'
}));

app.post('/webhook', (req: Request, res: Response) => {
  const data: any = req.body;
  if (data.challenge) {
    const challenge: string = data.challenge;
    res.json({ challenge });
  } else {
    res.json({ message: WEBHOOK_EVENT_RECEIVED_SUCCESSFULLY });
  }
  events(data);
});



app.listen(port, () => {
  logger.info({ source: constants.SERVER_IS_OS_IN_LOCALHOST_PORT+""+port, file: files.APP })
});


