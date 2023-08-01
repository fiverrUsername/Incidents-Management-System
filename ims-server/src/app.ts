<<<<<<< HEAD
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


const port = config.server.port
=======
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

import config from './config/config'
import incidentRout from './routes/IncidentRout'

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
    servers: [
      {
        url: `http://localhost:${config.server.port}`, // Replace with your server URL
      },
    ],
    tags: [
      {
        name: 'users',
      },
    ],
  },
  apis: ['./routes/*.ts', './controllers/*.ts'],
};
>>>>>>> origin/main

const swaggerSpecs = swaggerJSDoc(swaggerOptions);
const app = express()

<<<<<<< HEAD
process.on('uncaughtException', function (err) {
  console.log(err);
});

const swaggerFile: any = (process.cwd() + "/src/Swagger.json");
const swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDocument = JSON.parse(swaggerData);
swaggerDocument.servers[0].url = `http://localhost:${process.env.SERVER_PORT}`

const whitelist = ['http://localhost:3000'];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (origin === undefined || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};




connect()
// app.use(cors(corsOptions));
app.use(cors({
  origin: true, // "true" will copy the domain of the request back
  // to the reply. If you need more control than this
  // use a function.
  credentials: true, // This MUST be "true" if your endpoint is
  // authenticated via either a session cookie
  // or Authorization header. Otherwise the
  // browser will block the response.
  methods: 'POST,GET,PUT,OPTIONS,DELETE' // Make sure you're not blocking
  // pre-flight OPTIONS requests
}));
// app.use(authenticateToken);

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
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

export default app;
=======
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));
app.use(cors())
app.use(bodyParser.json())
app.use('/incident', incidentRout)

mongoose
  .connect(config.mongo.url)
  .then(() => {
    console.info('Connected to mongoDB.')
    const port = config.server.port
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`)
    })
  })
  .catch((error) => {
    console.error('Unable to connect.')
    console.error(error)
  })
>>>>>>> origin/main
