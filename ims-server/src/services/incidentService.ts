import validate from '../controllers/incidentValidation';
import { IIncident } from '../interfaces/IncidentInterface';
import { constants } from '../loggers/constants';
import logger from '../loggers/log';
import incidentModel from '../models/IncidentModel';
import incidentRepository from '../repositories/incidentRepository';

class IncidentService {
  async addIncident(newIncident: IIncident): Promise<void | null> {
    try {
      await validate(newIncident);
      logger.info({ sourece: constants.FROM_DATA_PATH, msg: constants.ADD_INCIDENT_SUCCESS, incidentId: newIncident.id });
      await incidentRepository.addIncident(newIncident);
    } catch (error) {
      logger.error({ source: constants.FROM_DATA_PATH, err: constants.ERROR_ADDING_INCIDENT });
      console.error(`error: ${error}`);
    }
  }

  async updateIncident(id: String, data: typeof incidentModel): Promise<void | null> {
    try {
      const updatedIncident = await incidentRepository.updateIncident(id, data);
      if (updatedIncident) {
        logger.info({ source: constants.FROM_DATA_PATH, msg: constants.UPDATE_INCIDENT_SUCCESS });
      }
      return updatedIncident;
    } catch (error) {
      console.error(`error: ${error}`);
      return null;
    }
  }

  async getAllIncidents(): Promise<IIncident[] | null> {
    try {
      logger.info({ source: constants.FROM_DATA_PATH, msg: constants.GET_ALL_INCIDENTS_SUCCESS });
      const incident = await incidentRepository.getAllIncidents();
      return incident;
    } catch (error) {
      logger.error({ source: constants.FROM_DATA_PATH, err: constants.ERROR_GETTING_ALL_INCIDENTS });
      console.error(`error: ${error}`);
      return null;
    }
  }

  async getIncidentById(id: String): Promise<IIncident | null> {
    try {
      const incident = await incidentRepository.getIncidentById(id);
      if (incident) {
        logger.info('get incident by id', incident);
      }
      return incident;
    } catch (error) {
      logger.error({ source: constants.FROM_DATA_PATH, err: constants.INCIDENT_NOT_FOUND, incidentID: id });
      console.error(`error: ${error}`);
      return null;
    }
  }
}
export default new IncidentService();