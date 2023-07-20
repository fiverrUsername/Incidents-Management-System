import { validate } from "class-validator";
import { IIncident } from "../interfaces/IncidentInterface";
import { constants } from "../loggers/constants";
import logger from "../loggers/log";
import incidentModel from "../models/IncidentModel";
import incidentRepository from "../repositories/incidentRepository";
import { Incident } from "../classValidator/incidentValidation";

class IncidentService {
  async addIncident(newIncident: IIncident): Promise<void | any> {
    try {
      await validate(newIncident);
      logger.info({ sourece: constants.INCIDENT_COTROLLER, msg: constants.ADD_INCIDENT_SUCCESS, incidentId: newIncident.id });
      return await incidentRepository.addIncident(newIncident);
    } catch (error: any) {
      logger.error({
        source: constants.INCIDENT_COTROLLER,
        err: constants.ERROR_ADDING_INCIDENT,
      });
      console.error(`error: ${error}`);
      return error;
    }
  }

  async updateIncident(
    id: String,
    data: typeof incidentModel
  ): Promise<void | any> {
    try {
      const updatedIncident = await incidentRepository.updateIncident(id, data);
      if (updatedIncident) {
        logger.info({
          source: constants.INCIDENT_COTROLLER,
          msg: constants.UPDATE_INCIDENT_SUCCESS,
          incidetID: id,
        });
        return updatedIncident;
      }
      if (!data.name) {
        logger.error({
          source: constants.MISSNG_REQUIRED_FIELDS,
          method: constants.METHOD.PUT,
        });
        throw new Error(constants.MISSNG_REQUIRED_FIELDS);
      } else {
        logger.error({
          source: constants.INCIDENT_COTROLLER,
          err: constants.INCIDENT_NOT_FOUND,
          incidentId: id,
        });
        throw new Error(constants.INCIDENT_NOT_FOUND);
      }
    } catch (error: any) {
      logger.error({
        source: constants.INCIDENT_COTROLLER,
        method: constants.METHOD.PUT,
        incidetID: id,
      });
      console.error(`error: ${error}`);
      return error;
    }
  }

  async getAllIncidents(): Promise<IIncident[] | any> {
    try {
      logger.info({
        source: constants.INCIDENT_COTROLLER,
        msg: constants.GET_ALL_INCIDENTS_SUCCESS,
      });
      const incidents = await incidentRepository.getAllIncidents();
      return incidents;
    } catch (error: any) {
      logger.error({
        source: constants.INCIDENT_COTROLLER,
        err: constants.ERROR_GETTING_ALL_INCIDENTS,
      });
      console.error(`error: ${error}`);
      return error;
    }
  }

  async getIncidentById(id: String): Promise<IIncident | any> {
    try {
      const incident = await incidentRepository.getIncidentById(id);
      if (incident) {
        logger.info({
          source: constants.INCIDENT_COTROLLER,
          method: constants.METHOD.GET,
          incidentId: id,
        });
      }
      return incident;
    } catch (error: any) {
      logger.error({
        source: constants.INCIDENT_COTROLLER,
        err: constants.INCIDENT_NOT_FOUND,
        incidentID: id,
      });
      console.error(`error: ${error}`);
      return error;
    }
  }
  async getSummaryIncident(id: String): Promise<ISummary | any> {
    try {
       let summary={
        createdBy:"",
        createdAt:new Date(),
        currentPriority:"",
        tags:[]
       };
        const incident = await  this.getIncidentById(id);
      if (incident) {
         summary={
          createdBy:incident.createdBy,
          createdAt:incident.createdAt,
          currentPriority:incident.priority,
          tags:incident.tags
        }
        logger.info({source:constants.INCIDENT_COTROLLER,method:constants.METHOD.GET,incidentId:id})
        return summary;
      }
     } catch (error:any) {
      logger.error({ source: constants.INCIDENT_COTROLLER, err: constants.INCIDENT_NOT_FOUND, incidentID: id });
      console.error(`error: ${error}`);
      return error;
    }
  }
}
export default new IncidentService();
