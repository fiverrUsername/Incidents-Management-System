<<<<<<< HEAD
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import fs from 'fs';
import swaggerUI from 'swagger-ui-express';

import config from './config/config';
import logger from './loggers/log';
import { connect } from './models/db';
import incidentRoute from './routes/IncidentRout';
import aggregationRouter from './routes/aggrigationRouter';
import tagRouter from './routes/tagRouter';
import timelineEventRouter from './routes/timelineEventRouter';
const port = config.server.port


const swaggerFile: any = (process.cwd() + "/src/Swagger.json");
const swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDocument = JSON.parse(swaggerData);
swaggerDocument.servers[0].url = `http://localhost:${process.env.SERVER_PORT}`
const app = express()
connect()
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
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

const swaggerSpecs = swaggerJSDoc(swaggerOptions);
const app = express()

app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));
>>>>>>> origin
app.use(cors())
app.use(bodyParser.json())
app.use('/incident', incidentRoute)
app.use('/aggregation', aggregationRouter)
app.use('/tag', tagRouter)
app.use('/timelineEvent',timelineEventRouter)

<<<<<<< HEAD
app.get('/', (req: Request, res: Response): void => {
  res.redirect('/swagger')
});

app.listen(port, () => {
  logger.info(`Server is listeningo on http://localhost:${port}`)
});

export default app
=======
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
>>>>>>> origin
