
import dotenv from 'dotenv';
dotenv.config();
import { LogLevel, WebClient } from "@slack/web-api";
export const port = 4700;

// export const wsPort = 'ws://127.0.0.1:8080';
export const wsPort = 'wss://ims-socket.onrender.com';


export const WEBHOOK_EVENT_RECEIVED_SUCCESSFULLY = 'Webhook event received successfully.'
export const TIMELINE_EVENT_ADDED_SUCCESSFULLY = 'Timeline event added successfully';
export const ERROR_CREATING_CHANNEL = 'Error creating channel:';
export const ERROR_CREATING_INCIDENT = 'Error creating incident:';
export const ERROR_GETTING_SLACK_CHANNEL_DATA = 'Error getting Slack Channel data:';
export const SLACK_UPLOAD_FILES = 'https://slack.com/api/files.upload';
export const ERROR_UPDATING_CHANNEL_DESCRIPTION = 'Error updating channel description:';
export const NO_CHANNEL_NAME = 'NO CHANNEL NAME';
export const NO_INCIDENT_NAME = 'NO INCIDENT NAME';
export const IMS_SERVER_ROUTING = "https://ims-server-pbkw.onrender.com/";
export const CHANNEL_REDIRECT = "https://slack.com/app_redirect?channel="
export const ERROR_EXTRACTING_FILES = 'Error extracting files:';



export const SLACK_API_TOKEN ="xoxb-5609511342163-5604717800598-4mFZolyE1ORRDNjsT3eGTGZZ"
export const SLACK_TOKEN= "xoxe-1-My0xLTU2MDk1MTEzNDIxNjMtNTU5NTYwNzQ4MjAwNy01ODA4MDAyNTYxMzQ4LTI0N2RmNzliNGEzNWMzMDBiZWI5NmU1M2VhMmQyNjE4ODQ0YTAxNTVjY2VlN2VlY2EwMWYxZjRjNGNmNDM5MmY"
export const client = new WebClient(SLACK_API_TOKEN, {
  logLevel: LogLevel.DEBUG,
});