// const { WebClient, LogLevel } = require("@slack/web-api");

// async function sendMassageToSlack() {
//   const userAccessToken = 'xoxp-5609511342163-5609669444179-5646669344592-37360f2551a0c4874b9ae4c52ad18d07';
//   const web = new WebClient(userAccessToken);

//   try {
//     await web.chat.postMessage({
//       channel: '#general',
//       text: 'Hello everyone, this is Ruth Blassy and Avigail Indig trying to send a message through a user - Slack',
//     });
//     console.log('Message sent successfully!');
//   } catch (error) {
//     console.error('Error sending message:', error);
//   }
// }

// sendMassageToSlack();
const { WebClient, LogLevel } = require("@slack/web-api");



async function sendMassageToSlack() {
  const userAccessToken = 'xoxp-5609511342163-5609669444179-5646669344592-37360f2551a0c4874b9ae4c52ad18d07';
  const web = new WebClient(userAccessToken);

  try {
    await web.chat.postMessage({
      channel: '#general',
      text: 'Hello everyone, this is Ruth Blassy and Avigail Indig trying to send a message through a user - Slack',
    });
    console.log('Message sent successfully!');
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

sendMassageToSlack();
