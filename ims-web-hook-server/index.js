const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 7071 });
const clients = new Map();
wss.on("connection", (ws) => {
  const id = uuidv4();
  clients.set(ws, id);
});
ws.on("message", (messageAsString) => {
  const message = JSON.parse(messageAsString);
  const metadata = clients.get(ws);

  message.sender = metadata.id;
  const outbound = JSON.stringify(message);

  [...clients.keys()].forEach((client) => {
    if(client!=sender)
        client.send(outbound);
  });
});
ws.on("close", () => {
    clients.delete(ws);
  });
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  console.log("wss up");
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
// const axios = require('axios');
// // The Slack webhook URL -
// const webhookUrl = 'https://hooks.slack.com/services/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';
// // Function to send a message to Slack
// async function sendMessageToSlack(message) {
//   try {
//     await axios.post(webhookUrl, { text: message });
//   } catch (error) {
//     console.error('Error sending message to Slack:', error.message);
//   }
// }
// // Send a test message to Slack
// sendMessageToSlack('This is the slack group Bot - Hello everyone!');

//++++++++++++++++++++++++++=
// //Create a nnew channel
// const { WebClient } = require('@slack/web-api');

// // Replace 'YOUR_SLACK_API_TOKEN' with your actual Slack API token
// const slackApiToken = 'xoxe.xoxp-1-Mi0yLTU2MDY2MjY5MjQ3NTctNTYwOTU1ODIzNjI3NC01NTk2ODA2MzM0Njc5LTU2NDY4Mzg2NDc1ODQtMTlhMzUzN2M0MzlhNjNkYjA5ZjAyZGY4N2JjZDQzOTRkMGU0ZGFjMmRiMWJkMmEyNTIwMGNhZGYwODE1MmRiMg';
// const web = new WebClient(slackApiToken);

// async function createChannel(channelName, isPrivate = false) {
//   try {
//     const result = await web.conversations.create({
//       name: channelName,
//       is_private: isPrivate,
//     });

//     console.log('New channel created:', result.channel);
//     return result.channel.id;
//   } catch (error) {
//     console.error('Error creating channel:', error);
//     return null;
//   }
// }

// // Replace 'CHANNEL_NAME' with the desired name for your new channel
// // Set the second argument to true if you want to create a private channel
// const channelName = 'CHANNEL_1';
// const channelId = createChannel(channelName, false); // Change the second argument to true for private channel

// // The channel ID will be printed once the channel is created
// console.log('Channel ID:', channelId);
