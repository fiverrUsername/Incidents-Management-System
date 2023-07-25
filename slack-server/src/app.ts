import { getUsers } from "./services/slack-api/actions/getUsers"
import { addTimeLineEvent, ITimelineEvent } from "./services/slack-api/wrap/sendTimeLine"
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { sendMassageToSlack } from "./services/slack-api/actions/postMessage";

const app = express();
const port = 4700;

app.use(bodyParser.json());
app.get('/',()=>console.log("ssts"))
app.post('/', (req:Request, res:Response) => {
    addTimeLineEvent(req.body);
    res.json({ message: 'Timeline event added successfully'});
  });

sendMassageToSlack({channelId:"C05JBDPBQ1H",userName:"Avigail",filesUrl:['C:/Users/user1/Documents/4e42471b0fe408436af17b42a5a122d5.jpg'],text:"exlain my incidents😂"});
  app.listen(port, () => {
    console.log(`Server A listening on port ${port}`);
  });