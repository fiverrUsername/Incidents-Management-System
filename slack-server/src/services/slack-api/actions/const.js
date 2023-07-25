"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.SLACK_API_TOKEN = void 0;
var web_api_1 = require("@slack/web-api");
exports.SLACK_API_TOKEN = "xoxb-5609511342163-5604717800598-XAxj3F4jbNGLav6i5DkQZkJw";
exports.client = new web_api_1.WebClient(exports.SLACK_API_TOKEN, {
    logLevel: web_api_1.LogLevel.DEBUG,
});
