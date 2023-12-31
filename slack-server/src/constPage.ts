
import dotenv from 'dotenv';
dotenv.config();
import { LogLevel, WebClient } from "@slack/web-api";
export const port = 4700;

export const wsPort = 'wss://ims-socket.onrender.com';


export const WEBHOOK_EVENT_RECEIVED_SUCCESSFULLY = 'Webhook event received successfully.'
export const TIMELINE_EVENT_ADDED_SUCCESSFULLY = 'Timeline event added successfully';
export const SLACK_UPLOAD_FILES = 'https://slack.com/api/files.upload';
export const NO_CHANNEL_NAME = 'NO CHANNEL NAME';
export const NO_INCIDENT_NAME = 'NO INCIDENT NAME';
export const IMS_SERVER_ROUTING = "https://ims-server-pbkw.onrender.com/";
export const CHANNEL_REDIRECT = "https://slack.com/app_redirect?channel="



export const client = new WebClient(process.env.SLACK_API_TOKEN as string, {
  logLevel: LogLevel.DEBUG,
});