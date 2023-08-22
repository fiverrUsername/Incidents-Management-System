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
const swaggerFile: any = (process.cwd() + "/src/Swagger.json");
const swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDocument = JSON.parse(swaggerData);
swaggerDocument.servers[0].url = `http://localhost:${process.env.SERVER_PORT}`
const whitelist = ['http://localhost:3000', 'http://localhost:4700', 'http://localhost:7071','http://localhost:7000'];
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

app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));
app.use(cors())
app.use(bodyParser.json())
app.use('/incident', incidentRoute)
app.use('/aggregation', aggregationRouter)
app.use('/tag', tagRouter)
app.use('/timelineEvent', timelineEventRouter)
app.use('/attachment', attachmentRouter)
app.use('/livestatus', liveStatusRouter)

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
