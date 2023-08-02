import { createEventAdapter, SlackEventAdapter } from '@slack/events-api';
import handleMessageEvent from './slack-api/handles/handleMessageEvent';
import { createIncident } from './slack-api/actions/createIncidentWhenCreateChannel';

const slackSigningSecret = '6375bfe488c6d9b8d321dfbd8afae02d';

const slackEvents: SlackEventAdapter = createEventAdapter(slackSigningSecret);

export default function events(data: any) {
  const { event } = data;
  console.log("data-", data)
  switch (event.type) {
    case 'message':
      handleMessageEvent(event);
      break;
    case 'app_mention':
      //handleAppMentionEvent(event);
      break;
    case 'channel_created':
      console.log('channel_created');      
      createIncident(event);
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

