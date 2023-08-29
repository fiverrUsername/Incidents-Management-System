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
            logger.info({
                source: constants.SYSTEM_STATUS_SERVICE,
                msg: constants.GET_SYSTEMS_BY_DATE_SUCCESS,
            });
            const tags = await tagService.getAllTags();
            const systemDate = date || new Date();
            const liveStatuses = await Promise.all(tags.map(async (tag) => {
                const latestStatusForTag = await liveStatusRepository.getLiveStatusByTag(tag.name, systemDate);
                return {
                    systemName: tag.name,
                    systemData: latestStatusForTag,
                };
            }));
            const hasData = liveStatuses.some((entry) => entry.systemData.length > 0);
            if (!hasData) {
                return null;
            }
            return liveStatuses;
        } catch (error: any) {
            logger.error({
                source: constants.SYSTEM_STATUS_SERVICE,
                err: constants.GET_SYSTEMS_BY_DATE_FAILED,
            });
        }
    }

    async createOrUpdateLiveStatus(data: IliveStatus, incidentId: string, tag: string): Promise<void | any> {
        try {
            logger.info({
                source: constants.SYSTEM_STATUS_SERVICE,
                msg: constants.CREATE_OR_UPDATE_SUCCESS,
            });
            const existingLiveStatus = await liveStatusRepository.getTodaysLiveStatusByTag(tag);
            const incidentIndex = this.priorityIndexMap[data.maxPriority];
            if (existingLiveStatus) {
                if (data.maxPriority > existingLiveStatus.maxPriority) {
                    data.maxPriority = existingLiveStatus.maxPriority;
                }
                data.incidentCounter = existingLiveStatus.incidentCounter + 1;
                existingLiveStatus.incidents[incidentIndex].push(incidentId);
                data.incidents = existingLiveStatus.incidents;
                return await liveStatusRepository.updateLiveStatus(data, existingLiveStatus.id);
            } else {
                data.id = uuidv4()
                data.incidentCounter = 1;
                data.incidents[incidentIndex].push(incidentId);
                return await liveStatusRepository.createLiveStatus(data);
            }
        } catch (error: any) {
            logger.error({
                source: constants.SYSTEM_STATUS_SERVICE,
                err: constants.CREATE_OR_UPDATE_FAILED,
            });
        }
    }
    async updateLiveStatusByTimeLineEvent(timeLineEvent: ITimelineEvent, system: string, previousPriority: Priority): Promise<void | null> {
        try {
            logger.info({
                source: constants.SYSTEM_STATUS_SERVICE,
                msg: constants.UPDATE_BY_TIMELINE_SUCCESS,
            });
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
            liveStatus.resolvedIncidents++
            liveStatus.incidents = updatedIncidents
            return await liveStatusRepository.updateLiveStatus(liveStatus, liveStatus.id);
        } catch (error: any) {
            logger.error({
                source: constants.SYSTEM_STATUS_SERVICE,
                err: constants.UPDATE_BY_TIMELINE_FAILED,
            });
        }
    }

    getUpdatedMaxPriority(incidentsIds: string[][]) {
        const priorityValues = Object.values(Priority) as string[];
        for (const [index, incidentsId] of incidentsIds.entries()) {
            if (incidentsId.length > 0)
                return priorityValues[priorityValues.length - index - 1] as Priority;
        }
        return Priority.P3;
    }

    async autoUpdateLiveStatus() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const systems: IliveStatus[] = await liveStatusRepository.getLiveStatusSystemsByDate(yesterday);
        systems.forEach(async system => {
            if (!(system.incidentCounter > system.resolvedIncidents))
                return
            await liveStatusRepository.createLiveStatus(
                {
                    id: uuidv4(),
                    systemName: system.systemName,
                    incidents: system.incidents,
                    date: new Date,
                    maxPriority: this.getUpdatedMaxPriority(system.incidents),
                    incidentCounter: system.incidentCounter - system.resolvedIncidents,
                    resolvedIncidents: 0
                });
        });
    }

    async liveStatusByIncident(incident: IIncident): Promise<(IliveStatus[] | any)> {
        try {
            logger.info({
                source: constants.SYSTEM_STATUS_SERVICE,
                msg: constants.UPDATE_BY_INCIDENT_SUCCESS,
            });
            const promises: Promise<IliveStatus | any>[] = incident.currentTags.map(async (tag) => {
                const liveStatusData: IliveStatus = {
                    id: uuidv4(),
                    systemName: tag.name,
                    incidents: [[], [], [], []],
                    date: new Date,
                    maxPriority: incident.currentPriority,
                    incidentCounter: 0,
                    resolvedIncidents: 0,
                };
                return await this.createOrUpdateLiveStatus(liveStatusData, incident.id ? incident.id : '', tag.name);
            });
            return Promise.all(promises);
        } catch (error: any) {
            logger.error({
                source: constants.SYSTEM_STATUS_SERVICE,
                err: constants.UPDATE_BY_INCIDENT_FAILED,
            });
        }
    }
}
export default new liveStatusService()