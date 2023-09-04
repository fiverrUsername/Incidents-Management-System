import { createEventAdapter, SlackEventAdapter } from '@slack/events-api';
import handleMessageEvent from './actions/via-slack/createTimeline';
import { createIncident } from './actions/via-slack/createIncident';
import dotenv from 'dotenv';
import logger from './loggers/log';
import { constants, files } from './loggers/constants';
dotenv.config();

const slackEvents: SlackEventAdapter = createEventAdapter(process.env.SLACK_SIGING_SECRET!);

export default function events(data: any) {
  const { event } = data;
  switch (event.type) {
    case 'message':
      if(!event.bot_profile)
        handleMessageEvent(event);
      break;
    case 'channel_created':
      if(event.channel.creator!=='U05HSM3PJHL')
        createIncident(event.channel.id);
      break;
    default:
      logger.error({ source: constants.FILED_HANDLE_EVENT+": "+event.type,  file: files.SLACK_TRACKING ,method:constants.METHOD.CLIENT})
  }
}


const port = 4701;
slackEvents.start(port).then(() => {
  logger.info({ source: constants.SERVER_STARTED_PORT_4701, file: files.SLACK_TRACKING ,method:constants.METHOD.CLIENT })
});

