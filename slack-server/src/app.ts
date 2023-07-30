import { getUsers } from "./services/slack-api/actions/getUsers"
import { sendMessageFromBot } from "./services/slack-api/actions/sendMessageFromBot"
import { addTimeLineEvent, ITimelineEvent } from "./services/slack-api/wrap/sendTimeLine"
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 4700;

app.use(bodyParser.json());
app.get('/',()=>console.log("ssts"))
app.post('/', (req:Request, res:Response) => {
    addTimeLineEvent(req.body);
    res.json({ message: 'Timeline event added successfully'});
  });
  app.listen(port, () => {
    console.log(`Server A listening on port ${port}`);
  });