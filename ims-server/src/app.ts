import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import fs from 'fs';
import swaggerUI from 'swagger-ui-express';
import '../src/services/socket';
import { authenticateWithApiKey } from './authenticateWithApiKey ';
import config from './config/config';
import logger from './loggers/log';
import { connect } from './models/db';
import incidentRoute from './routes/IncidentRout';
import aggregationRouter from './routes/aggrigationRouter';
import attachmentRouter from './routes/attachmentRouter';
import clientLogRouter from './routes/clientLoggerRouter';
import liveStatusRouter from "./routes/liveStatusRouter";
import tagRouter from './routes/tagRouter';
import timelineEventRouter from './routes/timelineEventRouter';
import dailySchedule from './services/schedule';
import { CORS_WHITELIST } from './constants/cors.constants';

const port: string | undefined = config.server.port
const app: express.Application = express()
const swaggerFile: any = (process.cwd() + "/src/Swagger.json");
const swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDocument: any = JSON.parse(swaggerData);

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (origin === undefined || CORS_WHITELIST.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: 'POST,GET,PUT,OPTIONS,DELETE'
};

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

app.get('/', (_req: Request, res: Response): void => {
  res.redirect('/swagger')
});

app.listen(port, () => {
  logger.info(`Server is listening on http://localhost:${port}`)
});


export default app;