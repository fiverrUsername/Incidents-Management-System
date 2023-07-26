import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import fs from 'fs';
import swaggerUI from 'swagger-ui-express';
import '../src/services/socket';
import config from './config/config';
import logger from './loggers/log';
import { connect } from './models/db';
import incidentRoute from './routes/IncidentRout';
import aggregationRouter from './routes/aggrigationRouter';
import tagRouter from './routes/tagRouter';
import timelineEventRouter from './routes/timelineEventRouter';
import awsRouter from './routes/awsRouter';
import { sendToSocket } from '../src/services/socket';

const port = config.server.port


const swaggerFile: any = (process.cwd() + "/src/Swagger.json");
const swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDocument = JSON.parse(swaggerData);
swaggerDocument.servers[0].url = `http://localhost:${process.env.SERVER_PORT}`
const app = express()
connect()
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(cors())
app.use(bodyParser.json())
app.use('/incident', incidentRoute)
app.use('/aggregation', aggregationRouter)
app.use('/tag', tagRouter)
app.use('/timelineEvent', timelineEventRouter)
app.use('/aws', awsRouter)
app.get('/', (req: Request, res: Response): void => {
  res.redirect('/swagger')
});



app.listen(port, () => {
  logger.info(`Server is listeningo on http://localhost:${port}`)
});

sendToSocket({
  _id: '123456789', // Replace with a valid ID
  id: 'INC-001', // Replace with a valid ID
  name: 'Example Incident', // Replace with a valid name
  status: 'Open', // Replace with a valid status
  description: 'This is an example incident.', // Replace with a valid description
  currentPriority: 'High', // Replace with a valid priority
  type: 'Service Outage', // Replace with a valid type
  durationHours: 2, // Replace with a valid duration in hours
  slackLink: 'https://example.slack.com/link-to-incident', // Replace with a valid Slack link (optional)
  currentTags: [ ],
  date: '2023-07-25', // Replace with a valid date
  createdAt: '2023-07-25T10:00:00.000Z', // Replace with a valid timestamp for creation
  updatedAt: '2023-07-25T12:00:00.000Z', // Replace with a valid timestamp for update
  cost: 1000, // Replace with a valid cost value
  createdBy: 'John Doe', // Replace with a valid user or creator name
})

export default app;