import { IAttachmentData } from "./attachmentData";

export interface IMessageData {
    channelId: string;
    userName?: string;
    filesUrl?: IAttachmentData[];
    text?: string;
  }