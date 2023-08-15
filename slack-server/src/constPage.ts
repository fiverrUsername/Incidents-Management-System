import { LogLevel, WebClient } from "@slack/web-api";


  export  const port = 4700;

export const wsPort='ws://localhost:7071';
export const WEBHOOK_EVENT_RECEIVED_SUCCESSFULLY='Webhook event received successfully.'
export const TIMELINE_EVENT_ADDED_SUCCESSFULLY='Timeline event added successfully';
export const ERROR_CREATING_CHANNEL='Error creating channel:';
export const ERROR_CREATING_INCIDENT='Error creating incident:';
export const ERROR_GETTING_SLACK_CHANNEL_DATA='Error getting Slack Channel data:';
export const SLACK_UPLOAD_FILES='https://slack.com/api/files.upload';
export const ERROR_UPDATING_CHANNEL_DESCRIPTION='Error updating channel description:';
export const NO_CHANNEL_NAME='NO CHANNEL NAME';
export const NO_INCIDENT_NAME='NO INCIDENT NAME';

export const IMS_SERVER_ROUTING="http://localhost:7000/";
export const CHANNEL_REDIRECT="https://slack.com/app_redirect?channel="
export const ERROR_EXTRACTING_FILES='Error extracting files:';
  export const client = new WebClient(process.env.SLACK_API_TOKEN, {
    logLevel: LogLevel.DEBUG,
  });