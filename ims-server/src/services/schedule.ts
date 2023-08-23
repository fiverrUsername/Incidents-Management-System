import schedule from 'node-schedule';

import liveStatusService from './liveStatusService';

const rule = new schedule.RecurrenceRule();
rule.hour = 11;
rule.minute = 28;
rule.tz = 'Asia/Jerusalem';

const dailySchedule = schedule.scheduleJob(rule, liveStatusService.autoUpdateLiveStatus);

export default dailySchedule