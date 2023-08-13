import { Priority } from "../enums/enum";
import { IIncident } from "../interfaces/IncidentInterface";
import { ISystemStatus } from "../interfaces/systemStatusInterface";
import { constants } from "../loggers/constants";
import logger from "../loggers/log";
import systemStatusModel from "../models/systemStatusModel";
import systemStatusRepository from "../repositories/systemStatusRepository";
import tagService from "./tagService";

class SystemStatusService {
    async getLatestLiveStatus(): Promise<Array<{ [tag: string]: ISystemStatus[] }> | any> {
        try {
            const tags = await tagService.getAllTags();
            const systemStatuses: Array<{ [tag: string]: ISystemStatus[] }> = [];
            for (const tag of tags) {
                console.log("Processing tag:", tag);
                const latestStatusForTag = await this.getLatestLiveStatusByTag(tag.name);
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


    async getLatestLiveStatusByTag(tag: string): Promise<ISystemStatus[] | any> {
        try {
            logger.info({
                source: constants.SYSTEM_STATUS_SERVICE,
                msg: constants.GET_SYSTEMS_BY_DATE_SUCCESS,
            });
            return await systemStatusRepository.getLatestLiveStatus(tag);
        } catch (error: any) {
            logger.error({
                source: constants.SYSTEM_STATUS_SERVICE,
                err: constants.GET_SYSTEMS_BY_DATE_FAILED,
            });
            console.error(`error: ${error}`);
            return error;
        }
    }

    async addToTodaysLiveStatusByTag(data: ISystemStatus, tag: string): Promise<ISystemStatus | any> {
        try {
            logger.info({
                source: constants.SYSTEM_STATUS_SERVICE,
                msg: constants.GET_TODAYS_LIVE_BY_TAG_SUCCESS,
            });
            const today = await systemStatusRepository.getTodaysLiveStatusByTag(tag);
            if (today) {
                console.log("data", data)
                return await this.updateLiveStatus(data, today.id)
            }
            return await this.createLiveStatus(data, tag)
        } catch (error: any) {
            logger.error({
                source: constants.SYSTEM_STATUS_SERVICE,
                err: constants.GET_TODAYS_LIVE_BY_TAG_FAILED,
            });
            console.error(`error: ${error}`);
            return error;
        }
    }
    async createLiveStatus(data: ISystemStatus, tag: string): Promise<void | any> {
        try {
            logger.info({
                source: constants.SYSTEM_STATUS_SERVICE,
                msg: constants.ADD_SYSTEMS_SUCCESS
            });
            return await systemStatusRepository.createLiveStatus(data, tag);
        } catch (error: any) {
            logger.error({
                source: constants.SYSTEM_STATUS_SERVICE,
                err: constants.ADD_SYSTEMS_FAILED,
            });
            console.error(`error: ${error}`);
            return error;
        }
    }
    async updateLiveStatus(data: ISystemStatus, id: string): Promise<void | any> {
        try {
            logger.info({
                source: constants.SYSTEM_STATUS_SERVICE,
                msg: constants.UPDATE_SYSTEMS_SUCCESS,
            });
            return await systemStatusRepository.updateLiveStatus(data, id)
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
            await this.createLiveStatus(system, system.systemName)
        })
    }

    ///logic........
    async logic(incident: IIncident): Promise<(ISystemStatus | any)[]> {
        try {
            const promises: Promise<ISystemStatus | any>[] = incident.currentTags.map(async (tag) => {
                const systemStatusData: ISystemStatus = {
                    //something is funny with the id is it from incident or from the object
                    id: incident.id ? incident.id : '',//TODO
                    systemName: "",
                    incidents: [[], [], [], []],
                    date: new Date,
                    maxPriority: incident.currentPriority,
                    incidentCounter: 0
                };
                return await this.addToTodaysLiveStatusByTag(systemStatusData, tag.name);
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