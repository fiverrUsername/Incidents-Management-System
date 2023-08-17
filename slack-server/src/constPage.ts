import dotenv from 'dotenv';
dotenv.config();
import { LogLevel, WebClient } from "@slack/web-api";
export const port = 4700;
export const wsPort = 'ws://localhost:7071';
export const WEBHOOK_EVENT_RECEIVED_SUCCESSFULLY = 'Webhook event received successfully.'
export const TIMELINE_EVENT_ADDED_SUCCESSFULLY = 'Timeline event added successfully';
export const ERROR_CREATING_CHANNEL = 'Error creating channel:';
export const ERROR_CREATING_INCIDENT = 'Error creating incident:';
export const ERROR_GETTING_SLACK_CHANNEL_DATA = 'Error getting Slack Channel data:';
export const SLACK_UPLOAD_FILES = 'https://slack.com/api/files.upload';
export const ERROR_UPDATING_CHANNEL_DESCRIPTION = 'Error updating channel description:';
export const NO_CHANNEL_NAME = 'NO CHANNEL NAME';
export const NO_INCIDENT_NAME = 'NO INCIDENT NAME';
export const IMS_SERVER_ROUTING = "http://localhost:7000/";
export const CHANNEL_REDIRECT = "https://slack.com/app_redirect?channel="
export const ERROR_EXTRACTING_FILES = 'Error extracting files:';
export const SLACK_API_TOKEN =
  "xoxb-5609511342163-5604717800598-XAxj3F4jbNGLav6i5DkQZkJw";
export const SLACK_TOKEN =
  "xoxe.xoxp-1-Mi0yLTU2MDk1MTEzNDIxNjMtNTYwOTY2OTQ0NDE3OS01NTk1NjA3NDgyMDA3LTU2NjA3MTgzMzc0NDUtYzJiNDc1ZjZlYzIyMzAwMGUxZTZiY2ViZWNiOWJkNTc0MjcyNTA3NmZhOTMyNDg2OGZlZGVlYzgzYmI0ZTVhNw"
export const client = new WebClient(SLACK_API_TOKEN, {
  logLevel: LogLevel.DEBUG,
});
