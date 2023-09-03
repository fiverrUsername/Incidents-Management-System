import { sendMessage } from '../base/sendMessage';
import { Priority } from '../../../../ims-server/src/enums/enum';
import { CHANNEL_REDIRECT } from '../../constPage';

export async function sendMassageOnSpecificPriorityChannel(channelId: string, prod: Priority) {
  const prod_channel_id = prod  === Priority.P0 ? process.env.P0 as string: prod === Priority.P1  ? process.env.P1 as string : prod === Priority.P2 ? process.env.P2 as string: process.env.P3 as string;
  sendMessage({ channelId: prod_channel_id, text: `Added an incident in this priority. Click the link to watch: ${CHANNEL_REDIRECT}${channelId}` })
}