import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import events from './slackTracking';
import './slackTracking'
import { sendMessageOnAddTimelineEvent } from "./actions/via-ims/sendMessageOnAddTimelineEvent";
import cors from 'cors';
import './socket';
import './slackTracking';
import { TIMELINE_EVENT_ADDED_SUCCESSFULLY, WEBHOOK_EVENT_RECEIVED_SUCCESSFULLY, port } from './constPage';
const app = express();


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
  console.log(`Server is on http://localhost:${port}`);
});
