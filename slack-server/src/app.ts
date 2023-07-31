import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import { addTimeLineEvent } from "./services/slack-api/wrap/sendTimeLine";
const app = express();
const port = 4700;
console.log("000000000000")

app.use(bodyParser.json());


app.post('/', (req:Request, res:Response) => {
    console.log(req.body)
    addTimeLineEvent(req.body);
    res.json({ message: 'Timeline event added successfully'});
  });

  app.listen(port, () => {
    console.log(`Server is on http://localhost:${port}`)
  });


