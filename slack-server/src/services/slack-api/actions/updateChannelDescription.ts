const { WebClient } = require('@slack/web-api');
const slackToken ='xoxb-5609511342163-5604717800598-XAxj3F4jbNGLav6i5DkQZkJw'
const web = new WebClient(slackToken);
async function updateChannelDescription(channelId:string, description:string) {
  try {
    const result = await web.conversations.setPurpose({
      channel: channelId,
      purpose: description,
    });
    console.log(`Channel description updated: ${result.purpose}`);
  } catch (error) {
    console.error('Error updating channel description:', error);
  }
}

const channelId = 'C05JPSL5TCL';
const newDescription = 'This is the updated 2 description of the channel.';
updateChannelDescription(channelId, newDescription);


