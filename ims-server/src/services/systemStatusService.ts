import { Priority } from "../enums/enum";
import { IIncident } from "../interfaces/IncidentInterface";
import { ISystemStatus, SystemStatusEntry } from "../interfaces/systemStatusInterface";
import { constants } from "../loggers/constants";
import logger from "../loggers/log";
import systemStatusModel from "../models/systemStatusModel";
import systemStatusRepository from "../repositories/systemStatusRepository";
import tagService from "./tagService";
class SystemStatusService {
    priorityIndexMap: Record<Priority, number> = {
        [Priority.P0]: 0,
        [Priority.P1]: 1,
        [Priority.P2]: 2,
        [Priority.P3]: 3,
    };

    async getLatestLiveStatus(): Promise<SystemStatusEntry[] | any> {
        try {
            const tags = await tagService.getAllTags();
            let systemStatuses: SystemStatusEntry[] = [];
            for (const tag of tags) {
                const latestStatusForTag:ISystemStatus[] = await systemStatusRepository.getLiveStatus(tag.name);
                if (latestStatusForTag) {
                    systemStatuses.push({
                        systemName: tag.name,
                        systemData: latestStatusForTag
                    });
                }
            }
            logger.info({
                source: constants.SYSTEM_STATUS_SERVICE,
                msg: constants.GET_SYSTEMS_BY_DATE_SUCCESS,
            });
            return systemStatuses;
        } catch (error: any) {
            logger.error({
                source: constants.SYSTEM_STATUS_SERVICE,
                err: constants.GET_SYSTEMS_BY_DATE_FAILED,
            });
            console.error(`error: ${error}`);
            return error;
        }
    }

    async createOrUpdateLiveStatus(data: ISystemStatus, tag: string): Promise<void | any> {
        try {
            logger.info({
                source: constants.SYSTEM_STATUS_SERVICE,
                msg: constants.UPDATE_SYSTEMS_SUCCESS,
            });
            const existingLiveStatus = await systemStatusRepository.getTodaysLiveStatusByTag(tag);
            if (existingLiveStatus) {
                if (data.maxPriority > existingLiveStatus.maxPriority) {
                    data.maxPriority = existingLiveStatus.maxPriority;
                }
                data.incidentCounter = existingLiveStatus.incidentCounter + 1;
                const updatedIncidents = [...existingLiveStatus.incidents];
                const incidentIndex = this.priorityIndexMap[data.maxPriority];
                updatedIncidents[incidentIndex].push(data.id);
                data.incidents = updatedIncidents;
                return await systemStatusRepository.updateLiveStatus(data, existingLiveStatus.id);
            } else {
                data.incidentCounter = 1;
                const incidentIndex = this.priorityIndexMap[data.maxPriority];
                const updatedIncidents = [...data.incidents];
                updatedIncidents[incidentIndex].push(data.id);
                data.incidents = updatedIncidents;
                return await systemStatusRepository.createLiveStatus(data);
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
        const systems: any = systemStatusRepository.getLiveStatusSystemsByDate(yesterday)//TODO -check types
        systems.map(async (system: ISystemStatus) => {
            system.date = new Date(yesterday)
            system.maxPriority = await this.getUpdatedMaxPriority(system.incidents)
            await systemStatusRepository.createLiveStatus(system)
        })
    }
    
    async liveStatusByIncident(incident: IIncident): Promise<(ISystemStatus | any)[]> {
        try {
            const promises: Promise<ISystemStatus | any>[] = incident.currentTags.map(async (tag) => {
                const systemStatusData: ISystemStatus = {
                    //something is funny with the id is it from incident or from the object
                    id: incident.id ? incident.id : '',//TODO
                    systemName: tag.name,
                    incidents: [[], [], [], []],
                    date: new Date,
                    maxPriority: incident.currentPriority,
                    incidentCounter: 0
                };
                return await this.createOrUpdateLiveStatus(systemStatusData, tag.name);
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
export default new SystemStatusService()