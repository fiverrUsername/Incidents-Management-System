import { Priority } from "../enums/enum";
import { IIncident } from "../interfaces/IncidentInterface";
import { ISystemStatus } from "../interfaces/systemStatusInterface";
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

    async getLiveStatus(): Promise<Array<{ [tag: string]: ISystemStatus[] }> | any> {
        try {
            const tags = await tagService.getAllTags();
            const systemStatuses: Array<{ [tag: string]: ISystemStatus[] }> = [];
            for (const tag of tags) {
                const latestStatusForTag = await systemStatusRepository.getLiveStatus(tag.name);
                systemStatuses.push({ [tag.name]: latestStatusForTag });
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
    
    async getUpdatedMaxPriority(incidentsId: string[][]): Promise<Priority> {
        let maxPriority = Priority.P3
        const incidentsDetails = incidentsId.map((incidentId) => {/* TODO*/ })
        // const incidents: ISystemStatus[] = await Promise.all(incidentsDetails)
        const incidents = [new systemStatusModel()]//TODO
        incidents.forEach((incident) => {
            if (incident.maxPriority > maxPriority) {
                maxPriority = incident.maxPriority
            }
        })
        return maxPriority;
    }

    async autoUpdateLiveStatus() {
        const yesterday = ((new Date()).getDate() - 1).toString()
        const systems = [new systemStatusModel()]//TODO
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