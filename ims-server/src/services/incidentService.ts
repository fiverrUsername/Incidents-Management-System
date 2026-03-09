import dayjs from "dayjs";
import { IIncident } from "../interfaces/IncidentInterface";
import { ISummary } from "../interfaces/ISummary";
import { CONSTANTS } from "../loggers/constants";
import logger from "../loggers/log";
import incidentRepository from "../repositories/incidentRepository";
import liveStatusService from './liveStatusService';
import { IncidentDto } from "../dto/incidentDto";

class IncidentService {
  async addIncident(newIncident: IIncident): Promise<void | any> {
    try {
      logger.info({
        sourece: CONSTANTS.INCIDENT_COTROLLER,
        msg: CONSTANTS.ADD_INCIDENT_SUCCESS,
        incidentId: newIncident.id
      });
      console.log("-------IncidentService ,", newIncident)
      const incident = await incidentRepository.addIncident(newIncident);

      const isToday = new Date(newIncident.date).toDateString() === new Date().toDateString();

      if (isToday) {
        await liveStatusService.liveStatusByIncident(incident);
      }
      else
        await liveStatusService.liveStatusByIncidentWithPreviousDate(incident)
      return incident
    } catch (error: any) {
      logger.error({
        source: CONSTANTS.INCIDENT_COTROLLER,
        err: CONSTANTS.ERROR_ADDING_INCIDENT,
      });
      console.error(`error: ${error}`);
      return error;
    }
  }

  async updateIncident(id: string, data: any): Promise<IIncident | any> {
    try {
      const isValidId: IIncident | any = await incidentRepository.getIncidentById(id);
      if (isValidId === null || isValidId instanceof Error) {
        logger.error({ source: CONSTANTS.INCIDENT_COTROLLER, err: CONSTANTS.INCIDENT_NOT_FOUND, incidentId: id, });
        return new Error(CONSTANTS.INCIDENT_NOT_FOUND);
      }
      const updatedIncident: IIncident = await incidentRepository.updateIncident(id, data);
      if (updatedIncident) {
        logger.info({ source: CONSTANTS.INCIDENT_COTROLLER, msg: CONSTANTS.UPDATE_INCIDENT_SUCCESS, incidetID: id, });
        return updatedIncident;
      }
      logger.error({ source: CONSTANTS.SERVER_ERROR, method: CONSTANTS.METHOD.PUT, error: true })
      return new Error(CONSTANTS.SERVER_ERROR)
    } catch (error: any) {
      logger.error({ source: CONSTANTS.INCIDENT_COTROLLER, method: CONSTANTS.METHOD.PUT, incidetID: id, });
      console.error(`error: ${error}`);
      return error;
    }
  }

  async getAllIncidents(): Promise<IIncident[] | any> {
    try {
      logger.info({
        source: CONSTANTS.INCIDENT_COTROLLER,
        msg: CONSTANTS.GET_ALL_INCIDENTS_SUCCESS,
      });
      const incidents: IIncident[] = await incidentRepository.getAllIncidents();
      const orderedIncidents = incidents.sort((a: IIncident, b: IIncident) => {
        const diff = dayjs(b.date).diff(dayjs(a.date));
        return diff;
      });
      return orderedIncidents;
    } catch (error: any) {
      logger.error({
        source: CONSTANTS.INCIDENT_COTROLLER,
        err: CONSTANTS.ERROR_GETTING_ALL_INCIDENTS,
      });
      console.error(`error: ${error}`);
      return error;
    }
  }

  async getIncidentByField(fieldValue: string, fieldName: string): Promise<IIncident | any> {
    try {
      const incident: IIncident | any = await incidentRepository.getIncidentByField(fieldValue, fieldName);
      if (incident) {
        logger.info({
          source: CONSTANTS.INCIDENT_COTROLLER,
          method: CONSTANTS.METHOD.GET,
          incidentId: fieldValue,
        });
      }
      return incident;
    } catch (error: any) {
      logger.error({
        source: CONSTANTS.INCIDENT_COTROLLER,
        err: CONSTANTS.INCIDENT_NOT_FOUND,
        incidentID: fieldValue,
      });
      console.error(`error: ${error}`);
      return error;
    }
  }

  async getSummaryIncident(id: string): Promise<ISummary | any> {
    try {
      let summary: ISummary | null = null;
      const incident: IIncident | any = await incidentRepository.getIncidentByField(id, 'id');
      if (incident) {
        summary = {
          createdBy: incident.createdBy,
          createdAt: incident.createdAt,
          currentPriority: incident.currentPriority,
          tags: incident.currentTags
        }
        logger.info({ source: CONSTANTS.INCIDENT_COTROLLER, method: CONSTANTS.METHOD.GET, incidentId: id })
        return summary;
      }
      return summary;
    } catch (error: any) {
      logger.error({ source: CONSTANTS.INCIDENT_COTROLLER, err: true, incidentID: id });
      console.error(`error: ${error}`);
      return error;
    }
  }

}

export default new IncidentService();