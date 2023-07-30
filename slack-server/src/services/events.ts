
import { createEventAdapter } from '@slack/events-api';
import express from 'express';

const app = express();


const slackEvents = createEventAdapter('sxzE9hZ9agbQmCgkADz8bJ9J');



app.post('/webhook', (req, res) => {
  const data = req.body;
  console.log("data",data)
 if (data.challenge) {
   
    const challenge = data.challenge;
    res.json({ challenge });
  } else {
   
   res.json({ message: 'Webhook event received successfully.' });
  }
});


const port1 = 4701; 
slackEvents.start(port1).then(() => {
  console.log('Server started!');
});

