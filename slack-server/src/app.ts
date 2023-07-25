import { getUsers } from "./services/slack-api/actions/getUsers"
import { sendMessageFromBot } from "./services/slack-api/actions/sendMessageFromBot"
import { addTimeLineEvent, ITimelineEvent } from "./services/slack-api/wrap/addTimeLineEvent"
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 4500;
app.use(bodyParser.json());
console.log("fgdf")
//getUsers()
const firstTimeLine:ITimelineEvent={
    incidentId: '649cbeda942a5d4d8bcf3044',
    channelId:'U05JB6PJYUQ',
    userId: 'ffc',
    description: "Hello how are you",
    priority: 'p0',
    type: 'secureity',
    createdDate: new Date(),
    updatedDate:new Date()
}
//addTimeLineEvent(firstTimeLine)
app.get('/',()=>console.log("ssts"))
app.post('/', (req:Request, res:Response) => {
    addTimeLineEvent(req.body);
    res.json({ message: 'Timeline event added successfully'});
  });
  
  app.listen(port, () => {
    console.log(`Server A listening on port ${port}`);
  });