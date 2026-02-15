
import dotenv from 'dotenv';
dotenv.config();
import { LogLevel, WebClient } from "@slack/web-api";
export const port: number = 4700;

export const wsPort: string = 'wss://ims-socket.onrender.com';

export const WEBHOOK_EVENT_RECEIVED_SUCCESSFULLY: string = 'Webhook event received successfully.'
export const TIMELINE_EVENT_ADDED_SUCCESSFULLY: string = 'Timeline event added successfully';
export const SLACK_UPLOAD_FILES: string = 'https://slack.com/api/files.upload';
export const NO_CHANNEL_NAME: string = 'NO CHANNEL NAME';
export const NO_INCIDENT_NAME: string = 'NO INCIDENT NAME';
export const IMS_SERVER_ROUTING: string = "https://ims-server-pbkw.onrender.com/";
export const CHANNEL_REDIRECT: string = "https://slack.com/app_redirect?channel="

export const client: WebClient = new WebClient(process.env.SLACK_API_TOKEN as string, {
  logLevel: LogLevel.DEBUG,
});