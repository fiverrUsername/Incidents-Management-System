import schedule from 'node-schedule';

import systemStatusService from './systemStatusService';

const rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;
rule.tz = 'Asia/Jerusalem';

const dailySchedule = schedule.scheduleJob(rule, systemStatusService.autoUpdateLiveStatus);

export default dailySchedule