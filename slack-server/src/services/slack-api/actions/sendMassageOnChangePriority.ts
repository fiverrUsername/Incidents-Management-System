
import axios from 'axios';
import { SLACK_API_TOKEN } from './const';

export async function sendMassageOnChangePriority (channelId:string, prod:string) {
    const priorityChannel = {
        prod: prod === "p0" ? "C05JPSL5TCL" : prod === "p1" ? "C05JMDNMH1Q" : prod === "p2" ? "C05J6T6FKPH" : "C05JJFQRQ05"
      };
      try {
        const response = await axios.post('https://slack.com/api/chat.postMessage', {
          channel: priorityChannel.prod,
          text: `Added a new incident in this priority. Click the link to watch: https://slack.com/app_redirect?channel=${channelId}`
    }, {
          headers: {
            'Authorization': `Bearer ${SLACK_API_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });
        const data = response.data;
        console.log('C05JPSL5TCL')
        if (data.ok) {
          console.log('Message sent to Slack successfully!');
          return data.ts;
        } else {
          console.error('Error sending message to Slack:', data.error);
          return null;
        }
      } catch (error) {
        console.error('Error sending message to Slack:', error);
        return null;
      }
}
//sendMassageOnChangePriority("C05J8AZ1Q3X", 'p1');





