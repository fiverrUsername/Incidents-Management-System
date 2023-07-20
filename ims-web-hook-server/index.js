// const axios = require('axios');
// // The Slack webhook URL
// const webhookUrl = 'https://hooks.slack.com/services/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';
// // Function to send a message to Slack
// async function sendMessageToSlack(message) {
//   try {
//     await axios.post(webhookUrl, { text: message});
//     console.log('Message sent to Slack successfully!');
//   } catch (error) {
//     console.error('Error sending message to Slack:', error.message);
//   }
// }
// // Send a test message to Slack
// sendMessageToSlack('This is a message from us- the slack group -from webhook 😍, we are so cool!!!!!!!!');

//++++++++++++++++++++

// const axios = require('axios');
// // The Slack webhook URL
// const webhookUrl = 'https://hooks.slack.com/services/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';
// // Function to send a message to Slack
// async function sendMessageToSlack(message) {
//   try {
//     await axios.post(webhookUrl, { text: message});
//     console.log('Message sent to Slack successfully!');
//   } catch (error) {
//     console.error('Error sending message to Slack:', error.message);
//   }
// }
// // Send a test message to Slack
// sendMessageToSlack('This is a message for general');


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// const { WebClient, LogLevel } = require('@slack/web-api');

// // Your Slack API token
// const slackApiToken = 'xoxb-5609511342163-5604717800598-XAxj3F4jbNGLav6i5DkQZkJw'
// // Function to create a new conversation (channel)
// async function createChannel() {
//   try {
//     // Create a new instance of the WebClient with your API token
//     const client = new WebClient(slackApiToken, {
//       logLevel: LogLevel.DEBUG,
//     });

//     // Call the conversations.create method using the WebClient
//     const result = await client.conversations.create({
//       name: 'emoji-enthusiasts', // The name of the new channel
//     });

//     // The result will include information like the ID of the conversation (channel)
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Call the function to create a new channel
// createChannel();
//++++++++++++++
const axios = require('axios');
// The Slack webhook URL -
const webhookUrl = 'https://hooks.slack.com/services/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';
// Function to send a message to Slack
async function sendMessageToSlack(message) {
  try {
    await axios.post(webhookUrl, { text: message });
  } catch (error) {
    console.error('Error sending message to Slack:', error.message);
  }
}
// Send a test message to Slack
sendMessageToSlack('This is the slack group Bot - Hello everyone!');



