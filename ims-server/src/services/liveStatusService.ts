import { Priority, Status } from "../enums/enum";
import { IIncident } from "../interfaces/IncidentInterface";
import { IliveStatus, liveStatusEntry } from "../interfaces/liveStatusInterface";
import { ITimelineEvent } from "../interfaces/ItimelineEvent";
import { ITag } from "../interfaces/tagInterface";
import { constants } from "../loggers/constants";
import logger from "../loggers/log";
import liveStatusModel from "../models/liveStatusModel";
import liveStatusRepository from "../repositories/liveStatusRepository";
import tagService from "./tagService";
class liveStatusService {
    priorityIndexMap: Record<Priority, number> = {
        [Priority.P0]: 0,
        [Priority.P1]: 1,
        [Priority.P2]: 2,
        [Priority.P3]: 3,
    };

    async getLiveStatus(): Promise<liveStatusEntry[] | any> {
        try {
            const tags = await tagService.getAllTags();
            let liveStatuses: liveStatusEntry[] = [];
            for (const tag of tags) {
                const latestStatusForTag:IliveStatus[] = await liveStatusRepository.getLiveStatus(tag.name);
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

    async createOrUpdateLiveStatus(data: IliveStatus, tag: string): Promise<void | any> {
        try {
            logger.info({
                source: constants.SYSTEM_STATUS_SERVICE,
                msg: constants.UPDATE_SYSTEMS_SUCCESS,
            });
            const existingLiveStatus = await liveStatusRepository.getTodaysLiveStatusByTag(tag);
            if (existingLiveStatus) {
                if (data.maxPriority > existingLiveStatus.maxPriority) {
                    data.maxPriority = existingLiveStatus.maxPriority;
                }
                data.incidentCounter = existingLiveStatus.incidentCounter + 1;
                const updatedIncidents = [...existingLiveStatus.incidents];
                const incidentIndex = this.priorityIndexMap[data.maxPriority];
                console.log('data.id', data.id);

                updatedIncidents[incidentIndex].push(data.id);
                data.incidents = updatedIncidents;
                return await liveStatusRepository.updateLiveStatus(data, existingLiveStatus.id);
            } else {
                data.incidentCounter = 1;
                const incidentIndex = this.priorityIndexMap[data.maxPriority];
                const updatedIncidents = [...data.incidents];
                updatedIncidents[incidentIndex].push(data.id);
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
            updatedIncidents[incidentIndex] = [...updatedIncidents[incidentIndex], timeLineEvent.incidentId]
            if (previousPriority !== timeLineEvent.priority) {
                updatedIncidents[incidentIndex].push(timeLineEvent.incidentId)
                if (timeLineEvent.priority > liveStatus.maxPriority) {
                    liveStatus.maxPriority = timeLineEvent.priority;
                }
            }
            liveStatus.incidents = updatedIncidents
            return await liveStatusRepository.updateLiveStatus(liveStatus, liveStatus.id);
        } catch {

        }
    }
    async getUpdatedMaxPriority(incidentsIds: string[][]): Promise<Priority> {
        let maxPriority = Priority.P3
        const priorityValues = Object.values(Priority) as string[];
        incidentsIds.map((incidentsId, index: number) => {
            if (incidentsId.length > 0)
                maxPriority = priorityValues[index] as Priority;
        })
        return maxPriority;
    }

    async autoUpdateLiveStatus() {
        const yesterday = ((new Date()).getDate() - 1).toString()
        const systems: any = liveStatusRepository.getLiveStatusSystemsByDate(yesterday)//TODO -check types
        systems.map(async (system: IliveStatus) => {
            system.date = new Date(yesterday)
            system.maxPriority = await this.getUpdatedMaxPriority(system.incidents)
            await liveStatusRepository.createLiveStatus(system)
        })
    }
    
    async liveStatusByIncident(incident: IIncident): Promise<(IliveStatus | any)[]> {
        try {
            const promises: Promise<IliveStatus | any>[] = incident.currentTags.map(async (tag) => {
                const liveStatusData: IliveStatus = {
                    //something is funny with the id is it from incident or from the object
                    id: incident.id ? incident.id : '',//TODO
                    systemName: tag.name,
                    incidents: [[], [], [], []],
                    date: new Date,
                    maxPriority: incident.currentPriority,
                    incidentCounter: 0
                };
                return await this.createOrUpdateLiveStatus(liveStatusData, tag.name);
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