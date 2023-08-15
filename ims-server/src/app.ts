import bodyParser from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
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
import liveStatusRouter from "./routes/systemStatusRouter";
import attachmentRouter from './routes/attachmentRouter';

const port = config.server.port
const app = express()
const swaggerFile: any = (process.cwd() + "/src/Swagger.json");
const swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDocument = JSON.parse(swaggerData);
swaggerDocument.servers[0].url = `http://localhost:${process.env.SERVER_PORT}`
const whitelist = ['http://localhost:3000'];
const apiKey = process.env.API_KEY;
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (origin === undefined || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: 'POST,GET,PUT,OPTIONS,DELETE'
};


connect();
 app.use(cors(corsOptions));
// app.use(cors({
//   origin: true, // "true" will copy the domain of the request back
//   // to the reply. If you need more control than this
//   // use a function.
//   credentials: true, // This MUST be "true" if your endpoint is
//   // authenticated via either a session cookie
//   // or Authorization header. Otherwise the
//   // browser will block the response.
//   methods: 'POST,GET,PUT,OPTIONS,DELETE' // Make sure you're not blocking
//   // pre-flight OPTIONS requests
// }));
// app.use(authenticateToken);

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(bodyParser.json())
app.use('/incident', incidentRoute)
app.use('/aggregation', aggregationRouter)
app.use('/tag', tagRouter)
app.use('/timelineEvent', timelineEventRouter)
app.use('/attachment', attachmentRouter)
app.use('/livestatus',liveStatusRouter)
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