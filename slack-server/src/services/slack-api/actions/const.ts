import { WebClient, LogLevel } from "@slack/web-api";
export const SLACK_API_TOKEN =
  "xoxb-5601969176276-5599490438291-Wp0fXzjDa99HGkNDA33Co8HW";
export const client = new WebClient(SLACK_API_TOKEN, {
  logLevel: LogLevel.DEBUG,
});
