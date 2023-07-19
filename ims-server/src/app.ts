import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import fs from 'fs';
import swaggerUI from 'swagger-ui-express';
import ServicesS3 from './aws_s3/ServicesS3';
import config from './config/config';
import logger from './loggers/log';
import { connect } from './models/db';
import incidentRoute from './routes/IncidentRout';
import aggregationRouter from './routes/aggrigationRouter';
import tagRouter from './routes/tagRouter';
import timelineEventRouter from './routes/timelineEventRouter';
import awsRouter from './routes/awsRouter';

const port = config.server.port;
const swaggerFile: any = (process.cwd() + "/src/Swagger.json");
const swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDocument = JSON.parse(swaggerData);
swaggerDocument.servers[0].url = `http://localhost:${process.env.SERVER_PORT}`

// ServicesS3.uploadFileToS3('ims-fiverr/incidence', 'myfile.png', 'C:/Users/THINKPAD/Downloads/myfile.png');
// ServicesS3.downloadFileFromS3('ims-fiverr', 'image (4).png', 'myfile.png');
// ServicesS3.deleteFileFromS3('ims-fiverr', 'image (4).png');
//  const show= async () => {
//   console.log('---------------------------------------------------- ');

//   const dataFile =await ServicesS3.showFileFromS3('ims-fiverr', 'technical_interviews_preparation_-_week_2__1_.docx');
//   if (dataFile != null) {
//     const fileContents = dataFile.toString();
//     console.log('----------data file : ', fileContents);
//   }
// }
// show();
const app = express();
connect();
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
export default app;