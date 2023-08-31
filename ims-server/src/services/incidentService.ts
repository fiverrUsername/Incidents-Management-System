//import dayjs from "dayjs";
import { IIncident } from "../interfaces/IncidentInterface";
import { ISummary } from "../interfaces/ISummary";
import { constants } from "../loggers/constants";
import logger from "../loggers/log";
import incidentRepository from "../repositories/incidentRepository";
import liveStatusService from './liveStatusService';

class IncidentService {
  
  async addIncident(newIncident: IIncident): Promise<void | any> {
    try {
      // const live = await liveStatusService.liveStatusByIncident(newIncident);
      const incident = await incidentRepository.addIncident(newIncident);
      if (incident instanceof Error) {
        logger.error({ source: constants.INCIDENT_COTROLLER, err: constants.ERROR_ADDING_INCIDENT, });
        return;
      }
      logger.info({ source: constants.INCIDENT_COTROLLER, msg: constants.ADD_INCIDENT_SUCCESS, incidentId: newIncident.id });
      await liveStatusService.liveStatusByIncident(incident)
      return incident;
    } catch (error: any) {
      logger.error({ source: constants.INCIDENT_COTROLLER, err: constants.ERROR_ADDING_INCIDENT, });
      console.error(`error: ${error}`);
    }
  }

  async updateIncident(id: string, data: any): Promise<IIncident | any> {
    try {
      const isValidId: IIncident | any = await incidentRepository.getIncidentById(id);
      if (!isValidId  || isValidId instanceof Error) {
        logger.error({ source: constants.INCIDENT_COTROLLER, err: constants.INCIDENT_NOT_FOUND, incidentId: id, });
        return;
      }
      const updatedIncident: IIncident = await incidentRepository.updateIncident(id, data);
      if (updatedIncident) {
        logger.info({ source: constants.INCIDENT_COTROLLER, msg: constants.UPDATE_INCIDENT_SUCCESS, incidetID: id, });
        return updatedIncident;
      }
      logger.error({ source: constants.SERVER_ERROR, method: constants.METHOD.PUT, error: true })
    } catch (error: any) {
      logger.error({ source: constants.INCIDENT_COTROLLER, method: constants.METHOD.PUT, incidetID: id, });
      console.error(`error: ${error}`);
    }
  }

  async getAllIncidents(): Promise<IIncident[] | any> {
    try {
      const incidents = await incidentRepository.getAllIncidents();
      if (incidents instanceof Error) {
        logger.error({ source: constants.INCIDENT_COTROLLER, err: constants.ERROR_GETTING_ALL_INCIDENTS, });
        return;
      }
      logger.info({ source: constants.INCIDENT_COTROLLER, msg: constants.GET_ALL_INCIDENTS_SUCCESS, });
      const orderedIncidents = incidents.sort((a: IIncident, b: IIncident) => {
        // const diff = dayjs(b.date).diff(dayjs(a.date));
        // return diff;
      });
      return orderedIncidents;
    } catch (error: any) {
      logger.error({ source: constants.INCIDENT_COTROLLER, err: constants.ERROR_GETTING_ALL_INCIDENTS, });
      console.error(`error: ${error}`);
    }
  }

  async getIncidentByField(fieldValue: string, fieldName: string): Promise<IIncident | any> {
    try {
      const incident = await incidentRepository.getIncidentByField(fieldValue, fieldName);
      if (incident instanceof Error) {
        logger.error({ source: constants.INCIDENT_COTROLLER, err: constants.INCIDENT_NOT_FOUND, incidentID: fieldValue, });
      }
      logger.info({ source: constants.INCIDENT_COTROLLER, method: constants.METHOD.GET, incidentId: fieldValue, });
      return incident;
    } catch (error: any) {
      logger.error({ source: constants.INCIDENT_COTROLLER, err: constants.INCIDENT_NOT_FOUND, incidentID: fieldValue, });
      console.error(`error: ${error}`);
    }
  }

  async getSummaryIncident(id: string): Promise<ISummary | any> {
    try {
      let summary: ISummary | null = null;
      const incident = await incidentRepository.getIncidentByField(id, 'id');
      if (incident instanceof Error  || !incident) {
        logger.error({ source: constants.INCIDENT_COTROLLER, err: true, incidentID: id });
        return;
      }
      summary = {
        createdBy: incident.createdBy,
        createdAt: incident.createdAt,
        currentPriority: incident.currentPriority,
        tags: incident.currentTags
      }
      logger.info({ source: constants.INCIDENT_COTROLLER, method: constants.METHOD.GET, incidentId: id })
      return summary;
    } catch (error: any) {
      logger.error({ source: constants.INCIDENT_COTROLLER, err: true, incidentID: id });
      console.error(`error: ${error}`);
    }
  }

}
export default new IncidentService();
