import bodyParser from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import swaggerUI from 'swagger-ui-express';
import clientLogRouter from './routes/clientLoggerRouter'
import '../src/services/socket';
import config from './config/config';
import logger from './loggers/log';
import { connect } from './models/db';
import incidentRoute from './routes/IncidentRout';
import aggregationRouter from './routes/aggrigationRouter';
import attachmentRouter from './routes/attachmentRouter';
import liveStatusRouter from "./routes/liveStatusRouter";
import tagRouter from './routes/tagRouter';
import timelineEventRouter from './routes/timelineEventRouter';
import dailySchedule from './services/schedule';
import { authenticateWithApiKey } from './authenticateWithApiKey ';
import { corsOptions } from './corsConfig';

const port = config.server.port
const app = express()
const swaggerFile: any = (process.cwd() + "/src/Swagger.json");
const swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDocument = JSON.parse(swaggerData);
swaggerDocument.servers[0].url = `http://localhost:${process.env.SERVER_PORT}`


connect();
dailySchedule
app.use(cors(corsOptions));
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(bodyParser.json())
app.use('/incident', incidentRoute)
app.use('/aggregation', aggregationRouter)
app.use('/tag', tagRouter)
app.use('/timelineEvent', timelineEventRouter)
app.use('/attachment', attachmentRouter)
app.use('/livestatus', liveStatusRouter)
app.use('/log', clientLogRouter);
app.use(authenticateWithApiKey());
app.get('/', (req: Request, res: Response): void => {
  res.redirect('/swagger')
});

app.listen(port, () => {
  logger.info(`Server is listening on http://localhost:${port}`)
});


export default app;