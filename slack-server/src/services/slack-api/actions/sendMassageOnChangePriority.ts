const webhookUrl = 'https://hooks.slack.com/services/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';
import axios from 'axios';
async function sendMassageOnChangePriority (channelId:string, prod:string) {
    const priorityChannel = {
        prod: prod === "p0" ? "prod_0" : prod === "p1" ? "prod_1" : prod === "p2" ? "prod_2" : "prod_3"
      };
    try {
        await axios.post(webhookUrl, {
            text: `Added a new incident in this priority. Click the link to watch: https://slack.com/app_redirect?channel=${channelId}`,
            channel: priorityChannel
        });
    } catch (error) {
        console.error(`Error sending the incident channel link to this channel:${priorityChannel}:`, error);
    }
}