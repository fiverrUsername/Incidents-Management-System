import { IAttachmentData } from "./attachmentData";

export interface IMessageData {
    channelId: string;
    userName?: string;
    files?: string[];
    text?: string;
  }