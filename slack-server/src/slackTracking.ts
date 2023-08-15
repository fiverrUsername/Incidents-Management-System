import { createEventAdapter, SlackEventAdapter } from '@slack/events-api';
import handleMessageEvent from './actions/via-slack/createTimeline';
import { createIncident } from './actions/via-slack/createIncident';

const slackEvents: SlackEventAdapter = createEventAdapter(process.env.SLACK_SIGING_SECRET||"This is a sentence to avoid run error");

export default function events(data: any) {
  const { event } = data;
  console.log("event", event);

  switch (event.type) {
    case 'message':
      handleMessageEvent(event);
      break;
    case 'app_mention':
      break;
    case 'channel_created':
      console.log('channel_created');
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

