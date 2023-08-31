import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import events from './slackTracking';
import cors from 'cors';
import { WEBHOOK_EVENT_RECEIVED_SUCCESSFULLY, port } from './constPage';
import { constants, files } from './loggers/constants';
import logger from './loggers/log';

const app = express();
require('dotenv').config()

const whitelist = ['wss://ims-socket.onrender.com/','ws://ims-socket.onrender.com/','https://ims-socket.onrender.com','https://ims-server-pbkw.onrender.com'];
const apiKey = process.env.API_KEY;
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (origin === undefined || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('slack server! Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: 'POST,GET,PUT,OPTIONS,DELETE'
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
// app.use(cors({
//   origin: "https://ims-server-pbkw.onrender.com",
//   credentials: true,
//   methods: 'POST, GET, PUT, OPTIONS, DELETE',
//   allowedHeaders: 'Content-Type,Authorization' // Add any other required headers here
// }));
// app.use(cors({
//   origin: true,
//   credentials: true,
//   methods: 'POST,GET,PUT,OPTIONS,DELETE'
// }));

app.get('/test', (req: Request, res: Response) => {
  console.log(process.env.SLACK_API_TOKEN);
  res.status(200).send('OK');
});

app.post('/webhook', (req: Request, res: Response) => {
  const data: any = req.body;
  if (data.challenge) {
    const challenge: string = data.challenge;
    res.json({ challenge });
  } else {
    res.json({ message: WEBHOOK_EVENT_RECEIVED_SUCCESSFULLY });
  }
  events(data);
});

console.log(process.env.SLACK_API_TOKEN)

app.listen(port, () => {
  logger.info({ source: constants.SERVER_IS_OS_IN_LOCALHOST_PORT+""+port, file: files.APP })
});


