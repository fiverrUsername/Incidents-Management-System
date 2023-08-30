import cors from 'cors';
import bodyParser from 'body-parser';
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

const port = config.server.port
const app = express()
const swaggerFile: any = (process.cwd() + "/src/Swagger.json");
const swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDocument = JSON.parse(swaggerData);

// swaggerDocument.servers[0].url = `http://localhost:${process.env.SERVER_PORT}`
const whitelist = ['https://ims-client-mep8.onrender.com','wss://ims-socket.onrender.com/','ws://ims-socket.onrender.com/','https://ims-socket.onrender.com','https://slack-server-71aw.onrender.com/','wss://ims-socket.onrender.com/8080','https://slack-server-71aw.onrender.com/4700','http://localhost:3000', 'http://localhost:4700', 'http://localhost:7071','http://localhost:7000'];
const apiKey = process.env.API_KEY;
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (origin === undefined || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('ims server! -Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: 'POST,GET,PUT,OPTIONS,DELETE'
};


connect();
app.use(cors(corsOptions));
dailySchedule
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(bodyParser.json())
app.use('/incident', incidentRoute)
app.use('/aggregation', aggregationRouter)
app.use('/tag', tagRouter)
app.use('/timelineEvent', timelineEventRouter)
app.use('/attachment', attachmentRouter)
app.use('/livestatus', liveStatusRouter)
app.use('/log',clientLogRouter);


// בדיקה אם השרת מורשה לגשת לשרת
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization === `Bearer ${apiKey}`) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});


app.get('/', (req: Request, res: Response): void => {
  res.redirect('/swagger')
});

app.listen(port, () => {
  logger.info(`Server is listening on http://localhost:${port}`)
});


export default app;