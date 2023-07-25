const webhookUrl = 'https://hooks.slack.com/services/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';
import axios from 'axios';
export async function sendMassageOnChangePriority (channelId:string, prod:string) {
    const priorityChannel = {
        prod: prod === "p0" ? "C05JPSL5TCL" : prod === "p1" ? "C05JMDNMH1Q" : prod === "p2" ? "C05J6T6FKPH" : "C05JJFQRQ05"
      };
    try {
        await axios.post(webhookUrl, {
            text: `Added a new incident in this priority. Click the link to watch: https://slack.com/app_redirect?channel=${channelId}`,
            channel: priorityChannel.prod
        });
    } catch (error) {
        console.error(`Error sending the incident channel link to this channel:${channelId}:`, error);
    }
}
sendMassageOnChangePriority("C05J8AZ1Q3X", 'p0');