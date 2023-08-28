import { createEventAdapter, SlackEventAdapter } from '@slack/events-api';
import handleMessageEvent from './actions/via-slack/createTimeline';
import { createIncident } from './actions/via-slack/createIncident';
import dotenv from 'dotenv';
dotenv.config();

const slackEvents: SlackEventAdapter = createEventAdapter(process.env.SLACK_SIGING_SECRET!);

export default function events(data: any) {
  const { event } = data;
  console.log("event", event);
  switch (event.type) {
    case 'message':
      if(!event.bot_profile)
        handleMessageEvent(event);
      break;
    case 'channel_created':
      if(event.channel.creator!=='U05HSM3PJHL')
        createIncident(event.channel.id);
      break;
      // Add more cases for other event types you want to handle
    default:
      // If the event type is not handled, do nothing or log an error.
      console.log(`Unhandled event type: ${event.type}`);
  }
}


const port = 4701;
slackEvents.start(port).then(() => {
  console.log('Server started!');
});

