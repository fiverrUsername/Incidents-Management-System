
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import events from './services/events';
// import './services/socket'
import './services/events'
import { addTimeLineEvent } from "./services/slack-api/wrap/sendTimeLine";

const app = express();
const port = 4700;

app.use(bodyParser.json());

app.post('/webhook', (req, res) => { 
  const data=req.body;
  if (data.challenge) {
    const challenge = data.challenge;
    res.json({ challenge });
  } else {
   res.json({ message: 'Webhook event received successfully.' });
  }
  events(data);
});

app.post('/', (req:Request, res:Response) => {
    console.log(req.body)
    addTimeLineEvent(req.body);
    res.json({ message: 'Timeline event added successfully'});
  });

app.listen(port, () => {
  console.log(`Server is on http://localhost:${port}`)
});

