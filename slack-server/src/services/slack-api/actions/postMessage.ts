import FormData from 'form-data';
import { SLACK_API_TOKEN } from "./const";
import axios from "axios";
const { WebClient } = require('@slack/web-api');
interface AttachmentData {
  key: string;
  data: Buffer;
}
const userAccessToken = 'xoxb-5609511342163-5604717800598-XAxj3F4jbNGLav6i5DkQZkJw';
const web = new WebClient(userAccessToken);
interface ISendMassageToSlack {
  channelId: string;
  userName: string;
  filesUrl?: AttachmentData[];
  text?: string;
}
export async function sendMassageToSlack({ channelId, userName, filesUrl, text }: ISendMassageToSlack) {
  try {
    const massage = "name: @" + userName + "\n" + (text ? text : "")
    await web.chat.postMessage({
      channel: channelId,
      text: massage,
      as_user: true,
      username: userName
    });
    if (filesUrl !== null) {
      const fileUploads = filesUrl?.map(async (fileUrl: AttachmentData) => {
        try {
          
          //const fileContent = await readFileAsync(fileUrl);
          // const response = await web.files.uploadV2({
          // channels: channelId,
          // file: fileUrl,
          // filename: fileUrl.substring(fileUrl.lastIndexOf('/') + 1)
          // });

          const formData = new FormData();
          formData.append('channels', channelId);
          formData.append('file', Buffer.from(fileUrl.data), {
            filename: fileUrl.key
          });
          const response = await axios.post('https://slack.com/api/files.upload', formData, {
            headers: {
              ...formData.getHeaders(),
              Authorization: `Bearer ${SLACK_API_TOKEN}`
            },
          });
          
        } catch (error) {
          console.error('Error uploading file:', error);
          return null;
        }
      });
      await Promise.all(fileUploads ? fileUploads : "");
    }
    console.log('Message and files sent successfully!');
  } catch (error) {
    console.error('Error sending message:', error);
  }
}
// sendMassageToSlack({channelId:"C05JBDPBQ1H",userName:"avigail",filesUrl:['C:/Users/user1/Documents/4e42471b0fe408436af17b42a5a122d5.jpg'],text:"exlain my incidents"});