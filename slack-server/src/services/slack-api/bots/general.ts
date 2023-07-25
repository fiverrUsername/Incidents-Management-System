import { Request, Response } from 'express';
import axios from 'axios';
const { WebClient, LogLevel } = require("@slack/web-api");


    function sendMassageToSlack(){
        const userAccessToken = 'xoxp-5609511342163-5609669444179-5646669344592-37360f2551a0c4874b9ae4c52ad18d07';
        const web = new WebClient({ token: userAccessToken });
        web.api_call('chat.postMessage', {
        channel: '#general',
        as_user: true,
        text: 'Hello everyone, this is Ruth Blassy and Avigail Indig trying to send a message through a user - Slack',
        });
        
    }

     

    sendMassageToSlack();




