import { v4 as uuidv4 } from 'uuid';

import { Priority, Status } from "../enums/enum";
import { IIncident } from "../interfaces/IncidentInterface";
import { ITimelineEvent } from "../interfaces/ItimelineEvent";
import { IliveStatus, liveStatusEntry } from "../interfaces/liveStatusInterface";
import { constants } from "../loggers/constants";
import logger from "../loggers/log";
import liveStatusRepository from "../repositories/liveStatusRepository";
import tagService from "./tagService";
class liveStatusService {
    constructor() {
        this.autoUpdateLiveStatus = this.autoUpdateLiveStatus.bind(this);
    }
    priorityIndexMap: Record<Priority, number> = {
        [Priority.P0]: 0,
        [Priority.P1]: 1,
        [Priority.P2]: 2,
        [Priority.P3]: 3,
    };

    async getLiveStatus(date?: Date): Promise<liveStatusEntry[] | any> {
        try {
            const tags = await tagService.getAllTags();
            let liveStatuses: liveStatusEntry[] = [];
            for (const tag of tags) {
                const latestStatusForTag: IliveStatus[] = await liveStatusRepository.getLiveStatusByTag(tag.name, date);
                if (latestStatusForTag) {
                    liveStatuses.push({
                        systemName: tag.name,
                        systemData: latestStatusForTag
                    });
                }
            }
            logger.info({
                source: constants.SYSTEM_STATUS_SERVICE,
                msg: constants.GET_SYSTEMS_BY_DATE_SUCCESS,
            });
            return liveStatuses;
        } catch (error: any) {
            logger.error({
                source: constants.SYSTEM_STATUS_SERVICE,
                err: constants.GET_SYSTEMS_BY_DATE_FAILED,
            });
            console.error(`error: ${error}`);
            return error;
        }
    }

    async createOrUpdateLiveStatus(data: IliveStatus, incidentId: string, tag: string): Promise<void | any> {
        try {
            logger.info({
                source: constants.SYSTEM_STATUS_SERVICE,
                msg: constants.UPDATE_SYSTEMS_SUCCESS,
            });
            //here i need the index
            const existingLiveStatus = await liveStatusRepository.getTodaysLiveStatusByTag(tag);
            if (existingLiveStatus) {
                if (data.maxPriority > existingLiveStatus.maxPriority) {
                    data.maxPriority = existingLiveStatus.maxPriority;
                }
                data.incidentCounter = existingLiveStatus.incidentCounter + 1;
                const updatedIncidents = [...existingLiveStatus.incidents];
                const incidentIndex = this.priorityIndexMap[data.maxPriority];
                updatedIncidents[incidentIndex].push(incidentId);
                data.incidents = updatedIncidents;
                return await liveStatusRepository.updateLiveStatus(data, existingLiveStatus.id);
            } else {
                data.id = uuidv4()
                data.incidentCounter = 1;
                const incidentIndex = this.priorityIndexMap[data.maxPriority];
                const updatedIncidents = [...data.incidents];
                updatedIncidents[incidentIndex].push(incidentId);
                data.incidents = updatedIncidents;
                return await liveStatusRepository.createLiveStatus(data);
            }
        } catch (error: any) {
            logger.error({
                source: constants.SYSTEM_STATUS_SERVICE,
                err: constants.UPDATE_SYSTEMS_FAILED,
            });
            console.error(`error: ${error}`);
            return error;
        }
    }
    async updateLiveStatusByTimeLineEvent(timeLineEvent: ITimelineEvent, system: string, previousPriority: Priority): Promise<void | null> {
        try {
            if (previousPriority == timeLineEvent.priority && timeLineEvent.status == Status.Active)
                return
            const liveStatus = await liveStatusRepository.getTodaysLiveStatusByTag(system);
            if (!liveStatus)
                return
            const updatedIncidents = [...liveStatus.incidents];
            const incidentIndex = this.priorityIndexMap[previousPriority];
            updatedIncidents[incidentIndex] = updatedIncidents[incidentIndex].filter(
                (incidentId) => incidentId !== timeLineEvent.incidentId
            );
            if (previousPriority != timeLineEvent.priority) {
                updatedIncidents[this.priorityIndexMap[timeLineEvent.priority]].push(timeLineEvent.incidentId)
                if (this.priorityIndexMap[liveStatus.maxPriority] > this.priorityIndexMap[timeLineEvent.priority]) {
                    liveStatus.maxPriority = timeLineEvent.priority;
                }
            }
            liveStatus.incidents = updatedIncidents
            return await liveStatusRepository.updateLiveStatus(liveStatus, liveStatus.id);
        } catch (e) {
            console.log(e);
        }
    }

    getUpdatedMaxPriority(incidentsIds: string[][]) {
        let maxPriority = Priority.P3
        const priorityValues = Object.values(Priority) as string[];
        incidentsIds.map((incidentsId, index: number) => {
            if (incidentsId.length > 0)
                maxPriority = priorityValues[index] as Priority;
        })
        return maxPriority;
    }

    async autoUpdateLiveStatus() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const systems: IliveStatus[] = await liveStatusRepository.getLiveStatusSystemsByDate(yesterday.toISOString());
        systems.forEach(async system => {
            await liveStatusRepository.createLiveStatus(
                {
                    id: uuidv4(),
                    systemName: system.systemName,
                    incidents: system.incidents,
                    date: new Date,
                    maxPriority: this.getUpdatedMaxPriority(system.incidents),
                    incidentCounter: system.incidentCounter,
                });
        });
    }

    async liveStatusByIncident(incident: IIncident): Promise<(IliveStatus | any)[]> {
        try {
            const promises: Promise<IliveStatus | any>[] = incident.currentTags.map(async (tag) => {
                const liveStatusData: IliveStatus = {
                    id: uuidv4(),
                    systemName: tag.name,
                    incidents: [[], [], [], []],
                    date: new Date,
                    maxPriority: incident.currentPriority,
                    incidentCounter: 0
                };
                return await this.createOrUpdateLiveStatus(liveStatusData, incident.id ? incident.id : '', tag.name);
            });
            return Promise.all(promises);
        } catch (error: any) {
            logger.error({
                source: constants.SYSTEM_STATUS_SERVICE,
                err: constants.GET_TODAYS_LIVE_BY_TAG_FAILED,
            });
            console.error(`error: ${error}`);
            return [error];
        }
    }
}
export default new liveStatusService()