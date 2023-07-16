import { Request, Response } from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import fs from 'fs'
import swaggerUI from 'swagger-ui-express'
import config from './config/config'
import incidentRout from './routes/IncidentRout'
import aggrigationRouter from './routes/aggrigationRouter'
import tagRouter from './routes/tagRouter'
import { connect } from './models/db'
import logger from './loggers/log'
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
app.use('/incident', incidentRout)
app.use('/aggregation', aggrigationRouter)
app.use('/tag', tagRouter)

app.get('/', (req: Request, res: Response): void => {
  res.redirect('/swagger')
});

app.listen(port, () => {
  logger.info(`Server is listeningo on http://localhost:${port}`)
});

export default app