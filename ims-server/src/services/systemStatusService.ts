import { Priority } from "../enums/enum";
import { IIncident } from "../interfaces/IncidentInterface";
import { ISystemStatus } from "../interfaces/systemStatusInterface";
import { constants } from "../loggers/constants";
import logger from "../loggers/log";
import systemStatusRepository from "../repositories/systemStatusRepository";
import incidentService from "./incidentService";

class SystemStatusService {
    async getLiveStatusSystemsByDate(date: string): Promise<ISystemStatus[] | any> {
        try {
            logger.info({
                source: constants.SYSTEM_STATUS_SERVICE,
                msg: constants.GET_SYSTEMS_BY_DATE_SUCCESS,
            });
            return await systemStatusRepository.getLiveStatusSystemsByDate(date);
        } catch (error: any) {
            logger.error({
                source: constants.SYSTEM_STATUS_SERVICE,
                err: constants.GET_SYSTEMS_BY_DATE_FAILED,
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
    async updateLiveStatus(incident: IIncident, id: string): Promise<void | any> {
        try {
            logger.info({
                source: constants.SYSTEM_STATUS_SERVICE,
                msg: constants.UPDATE_SYSTEMS_SUCCESS,
            });
            return await systemStatusRepository.updateLiveStatus(incident, id)
        } catch (error: any) {
            logger.error({
                source: constants.SYSTEM_STATUS_SERVICE,
                err: constants.UPDATE_SYSTEMS_FAILED,
            });
            console.error(`error: ${error}`);
            return error;
        }
    }
    async getUpdatedMaxPriority(incidentsId: string[]): Promise<Priority> {
        let maxPriority = Priority.P3
        const incidentsDetails = incidentsId.map((incidentId) =>
            incidentService.getIncidentById(incidentId)
        )
        const incidents = await Promise.all(incidentsDetails)
        incidents.forEach((incident) => {
            if (incident.currentPriority > maxPriority) {
                maxPriority = incident.currentPriority
            }
        })
        return maxPriority;
    }
    async autoUpdateLiveStatus() {
        const yesterday = ((new Date()).getDate() - 1).toString()
        const systems = await this.getLiveStatusSystemsByDate(yesterday)
        systems.map(async (system: ISystemStatus) => {
            system.date = yesterday
            system.maxPriority = await this.getUpdatedMaxPriority(system.incidents)
            await this.createLiveStatus(system, system.systemName)
        })
    }
}

export default new SystemStatusService()