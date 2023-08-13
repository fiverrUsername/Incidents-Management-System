import { WebClient, LogLevel } from "@slack/web-api";
export const SLACK_API_TOKEN =
  "xoxb-5609511342163-5604717800598-XAxj3F4jbNGLav6i5DkQZkJw";
  export const SLACK_TOKEN =
  "xoxe.xoxp-1-Mi0yLTU2MDk1MTEzNDIxNjMtNTYwOTY2OTQ0NDE3OS01NTk1NjA3NDgyMDA3LTU2NjA3MTgzMzc0NDUtYzJiNDc1ZjZlYzIyMzAwMGUxZTZiY2ViZWNiOWJkNTc0MjcyNTA3NmZhOTMyNDg2OGZlZGVlYzgzYmI0ZTVhNw"
export const client = new WebClient(SLACK_API_TOKEN, {
  logLevel: LogLevel.DEBUG,
});
export const slackSigningSecret = '6375bfe488c6d9b8d321dfbd8afae02d';
