import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import events from './slackTracking';
import cors from 'cors';
import { WEBHOOK_EVENT_RECEIVED_SUCCESSFULLY, port } from './constPage';
const app = express();
require('dotenv').config()

app.use(bodyParser.json());
app.use(cors({
  origin: true,
  credentials: true,
  methods: 'POST,GET,PUT,OPTIONS,DELETE'
}));

app.get('/test', (req: Request, res: Response) => {
  res.status(200).send('OK');
});

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
console.log(process.env.P1+"fdd")
app.listen(port, () => {
  console.log(`Server is on http://localhost:${port}`);
});


