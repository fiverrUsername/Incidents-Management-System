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
            if (tags) {
                const startDate = new Date(systemDate);
                startDate.setDate(startDate.getDate() - 9);
                const liveStatuses = await Promise.all(tags.map(async (tag) => {
                    const latestStatusForTag = await liveStatusRepository.getLiveStatusByTag(tag.name, startDate, systemDate);
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
            }
        } catch (error: any) {
            logger.error({
                source: constants.SYSTEM_STATUS_SERVICE,
                err: constants.GET_SYSTEMS_BY_DATE_FAILED,
            });
        }
    }

    async createOrUpdateLiveStatus(data: IliveStatus, incidentId: string, tag: string, liveStatus?: IliveStatus): Promise<void | any> {
        try {
            //here i need the index
            let existingLiveStatus;
            const incidentIndex = this.priorityIndexMap[data.maxPriority];
            if (liveStatus) {
                existingLiveStatus = liveStatus;
            } else {
                existingLiveStatus = await liveStatusRepository.getTodaysLiveStatusByTag(tag);
            }
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

    async updateLiveStatusByTimeLineEvent(timeLineEvent: ITimelineEvent, system: string, previousPriority: Priority): Promise<IliveStatus | null | undefined> {
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
            if (timeLineEvent.status === Status.Resolved)
                liveStatus.resolvedIncidents++
            liveStatus.incidents = updatedIncidents;
            const _liveStatus: IliveStatus = await liveStatusRepository.updateLiveStatus(liveStatus, liveStatus.id);
            if (_liveStatus instanceof Error) {
                logger.error({ source: constants.SYSTEM_STATUS_SERVICE, err: constants.UPDATE_SYSTEMS_FAILED })
                return;
            }
            logger.info({ source: constants.SYSTEM_STATUS_SERVICE, message: constants.UPLOAD_SUCCESS });
            return _liveStatus;
        } catch (e) {
            logger.error({ source: constants.SYSTEM_STATUS_SERVICE, err: constants.UPDATE_SYSTEMS_FAILED })
            console.log(e);
        }
    }

    getUpdatedMaxPriority(incidentsIds: string[][]) {
        const priorityValues = Object.values(Priority) as string[];
        for (const [index, incidentsId] of incidentsIds.entries()) {
            if (incidentsId.length > 0) {
                return priorityValues[priorityValues.length - index - 1] as Priority;
            }
        }
        return Priority.P3;
    }

    async autoUpdateLiveStatus() {
        try {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const systems: IliveStatus[] = await liveStatusRepository.getLiveStatusSystemsByDate(yesterday);
            systems.forEach(async system => {
                if (!(system.incidentCounter > system.resolvedIncidents))
                    return;
                const liveStatus: IliveStatus = await liveStatusRepository.createLiveStatus(
                    {
                        id: uuidv4(),
                        systemName: system.systemName,
                        incidents: system.incidents,
                        date: new Date,
                        maxPriority: this.getUpdatedMaxPriority(system.incidents),
                        incidentCounter: system.incidentCounter - system.resolvedIncidents,
                        resolvedIncidents: 0
                    });
                if (liveStatus instanceof Error) {
                    logger.error({
                        source: constants.SYSTEM_STATUS_SERVICE,
                        err: constants.AUTO_UPDATE_LIVE_STATUS,
                    });
                }
                else {
                    logger.info({
                        source: constants.SYSTEM_STATUS_SERVICE,
                        message: constants.AUTO_UPDATE_LIVE_STATUS,
                    });
                }
            });
        } catch (error) {
            logger.error({
                source: constants.SYSTEM_STATUS_SERVICE,
                err: constants.AUTO_UPDATE_LIVE_STATUS,
            });
            console.error(`error: ${error}`);
            return [error];
        }
    }
    async liveStatusByIncidentWithPreviousDate(incident: IIncident): Promise<(IliveStatus | any)[]> {
        try {
            const promises: Promise<IliveStatus | any>[] = incident.currentTags.map(async (tag) => {
                const systems = await liveStatusRepository.getLiveStatusByTag(tag.name, new Date(incident.date), new Date())
                if (systems)
                    systems.map(async (system: IliveStatus) => {
                        const liveStatusData: IliveStatus = system
                        liveStatusData.maxPriority = incident.currentPriority
                        return await this.createOrUpdateLiveStatus(liveStatusData, incident.id ? incident.id : '', tag.name, system);
                    })
            });
            logger.info({
                source: constants.SYSTEM_STATUS_SERVICE,
                message: constants.GET_TODAYS_LIVE_BY_TAG_SUCCESS,
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
            logger.info({
                source: constants.SYSTEM_STATUS_SERVICE,
                message: constants.GET_TODAYS_LIVE_BY_TAG_SUCCESS,
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