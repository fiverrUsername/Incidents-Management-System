
import dotenv from 'dotenv';
dotenv.config();
import { LogLevel, WebClient } from "@slack/web-api";
export const port = 4700;

// export const wsPort = 'ws://127.0.0.1:8080';
export const wsPort = 'wss://ims-socket.onrender.com';


export const WEBHOOK_EVENT_RECEIVED_SUCCESSFULLY = 'Webhook event received successfully.'
export const TIMELINE_EVENT_ADDED_SUCCESSFULLY = 'Timeline event added successfully';
export const SLACK_UPLOAD_FILES = 'https://slack.com/api/files.upload';
export const NO_CHANNEL_NAME = 'NO CHANNEL NAME';
export const NO_INCIDENT_NAME = 'NO INCIDENT NAME';
export const IMS_SERVER_ROUTING = "https://ims-server-pbkw.onrender.com/";
export const CHANNEL_REDIRECT = "https://slack.com/app_redirect?channel="


const SLACK_API_TOKEN =
"xoxb-5609511342163-5604717800598-RZ0xrfQTWl2EqumOmHAUOYQ8"
// const token=process.env.SLACK_API_TOKEN  as string;
// export const client = new WebClient(token, {
export const client = new WebClient(SLACK_API_TOKEN, {

  logLevel: LogLevel.DEBUG,
});