const slackApiToken = 'xoxb-5609511342163-5604717800598-XAxj3F4jbNGLav6i5DkQZkJw';
//const slackApiToken = 'xoxb-5609511342163-5604717800598-XAxj3F4jbNGLav6i5DkQZkJw';
export async function createNewChannel(channelName:string, userIds:string[]) {
 try {
   const response = await axios.post('https://slack.com/api/conversations.create', {
     name: channelName,
     is_private: false,
     user_ids: userIds
   }, {
     headers: {
       'Authorization': `Bearer ${slackApiToken}`,
       'Content-Type': 'application/json'
     }
   });
   const data = response.data;
   if (data.ok) {
     console.log('New public channel created:', data.channel.name);
     const channelId = data.channel.id;
     await sendJoinMessageToUser(channelId, userIds);
     return channelId;
   } else {
     console.error('Failed to create channel:', data.error);
     return null;
   }
 } catch (error) {
   console.error('Error creating channel:', error);
   return null;
 }
}
const webhookUrl = 'https://hooks.slack.com/services/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';
const axios = require('axios');
async function sendJoinMessageToUser(channelId:string, userId:string[]) {
    try {
        await axios.post(webhookUrl, {
            text: `You have been invited to join the channel. Click the link to join: https://slack.com/app_redirect?channel=${channelId}`,
            channel: userId
        });
    } catch (error) {
        console.error(`Error sending join invitation to user ${userId}:`, error);
    }
}
async function sendMessageToChannel(channelId:string, message:string) {
  try {
    const response = await axios.post('https://slack.com/api/chat.postMessage', {
      channel: channelId,
      text: message
    }, {
      headers: {
        'Authorization': `Bearer ${slackApiToken}`,
        'Content-Type': 'application/json'
      }
    });
    const data = response.data;
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


