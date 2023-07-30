import { getUsers } from "./services/slack-api/actions/getUsers"
import { addTimeLineEvent, ITimelineEvent } from "./services/slack-api/wrap/sendTimeLine"
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { sendMassageToSlack } from "./services/slack-api/actions/postMessage";
import { createEventAdapter } from '@slack/events-api';
import { WebClient } from '@slack/web-api';

const app = express();
const port = 4700;

const slackEvents = createEventAdapter('sxzE9hZ9agbQmCgkADz8bJ9J');

app.use(bodyParser.json());
app.post('/webhook', (req, res) => {
  const data = req.body;
  console.log("data",data)
 if (data.challenge) {
   
    const challenge = data.challenge;
    res.json({ challenge });
  } else {
   
   res.json({ message: 'Webhook event received successfully.' });
  }
});

app.post('/', (req:Request, res:Response) => {
    console.log(req.body)
    addTimeLineEvent(req.body);
    res.json({ message: 'Timeline event added successfully'});
  });

  app.listen(port, () => {
    console.log(`Server is on http://localhost:${port}`)
  });
const port1 = 4701; 
slackEvents.start(port1).then(() => {
  console.log('Server started!');
});

