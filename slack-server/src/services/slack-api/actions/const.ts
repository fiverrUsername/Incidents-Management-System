import { WebClient, LogLevel } from "@slack/web-api";
export const SLACK_API_TOKEN =
  "xoxb-5609511342163-5604717800598-XAxj3F4jbNGLav6i5DkQZkJw";
export const client = new WebClient(SLACK_API_TOKEN, {
  logLevel: LogLevel.DEBUG,
});
