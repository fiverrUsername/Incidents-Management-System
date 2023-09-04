import { IAttachmentData } from "./attachmentData";

export interface IMessageData {
    channelId: string;
    userName?: string;
    files?: IAttachmentData[];
    text?: string;
  }