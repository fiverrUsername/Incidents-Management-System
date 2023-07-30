
 import { client } from './const';
import { SLACK_API_TOKEN } from './const';

export async function sendMassageOnChangePriority(channelId: string, prod: string) {
  const priorityChannel = {
    prod: prod === 'p0' ? 'C05JPSL5TCL' : prod === 'p1' ? 'C05JMDNMH1Q' : prod === 'p2' ? 'C05J6T6FKPH' : 'C05JJFQRQ05',
  };
  try {
    const message = `Added a new incident in this priority. Click the link to watch: <https://slack.com/app_redirect?channel=${channelId}>`;
    const result = await client.chat.postMessage({
      channel: priorityChannel.prod,
      text: message,
    });

    console.log('C05JPSL5TCL');

    if (result.ok) {
      console.log('Message sent to Slack successfully!');
      return result.ts;
    } else {
      console.error('Error sending message to Slack:', result.error);
      return null;
    }
  } catch (error) {
    console.error('Error sending message to Slack:', error);
    return null;
  }
}

sendMassageOnChangePriority('C05J8AZ1Q3X', 'p3');