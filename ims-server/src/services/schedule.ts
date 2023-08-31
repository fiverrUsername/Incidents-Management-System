import schedule from 'node-schedule';
import liveStatusService from './liveStatusService';

const rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;

const dailySchedule = schedule.scheduleJob(rule, liveStatusService.autoUpdateLiveStatus);

export default dailySchedule;