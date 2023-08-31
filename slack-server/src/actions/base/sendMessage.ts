import axios from "axios";
import { client } from '../../constPage';
import { IAttachmentData } from '../../interfaces/attachmentData';
import { IMessageData } from '../../interfaces/messageData';
import { constants, files } from '../../loggers/constants';
import logger from '../../loggers/log';

export async function sendMessage(messageData: IMessageData) {
   const message = (messageData.userName ? `name: <@${messageData.userName}>\n` : '') + (messageData.text ? messageData.text : '');
   try {
      await client.chat.postMessage({
        channel: messageData.channelId,
        text: message,
        as_user: true,
        username: messageData.userName,
      });
   } catch (error) {
      logger.error({ source: constants.CLIENT_ERROR_POST_MASSAGE, file: files.SEND_MESSAGE ,method:constants.METHOD.CLIENT, error: error })
   }
   if ( messageData.files!.length > 0) {
      await Promise.all(
        messageData.files!.map(async (file: IAttachmentData) => {
          try {
            const response = await axios.get(file.url.toString(), { responseType: 'arraybuffer' });
            await client.files.upload({
              channels: messageData.channelId,
              file: response.data,
              filename: file.key.substring(file.key.lastIndexOf('?')+1)
            });
          } catch (error) {
            logger.error({ source: constants.CLIENT_ERROR_SENDING_FILES_TO_SLACK,  file: files.SEND_MESSAGE ,method:constants.METHOD.CLIENT , error: error})
          }
        })
      );
    }
    logger.info({ source: constants.MESSAGE_SENDING_MESSAGE_SUCCESSFULLY, file: files.SEND_MESSAGE ,method:constants.METHOD.CLIENT })
}
