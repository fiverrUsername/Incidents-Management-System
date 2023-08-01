import { validate } from "class-validator";
import { IncidentDto } from "../dto/incidentDto";
import { IIncident } from "../interfaces/IncidentInterface";
import { ISummary } from "../interfaces/ISummary";
import { constants } from "../loggers/constants";
import logger from "../loggers/log";
import incidentModel from "../models/IncidentModel";
import incidentRepository from "../repositories/incidentRepository";
import { Priority } from "../enums/enum";

class IncidentService {
  async addIncident(newIncident: IIncident): Promise<void | any> {
    try {
      // const incident = new IncidentDto(newIncident);
      // const validationErrors = await validate(incident);
      // if (validationErrors.length > 0) {
      //   logger.error({
      //     source: constants.INCIDENT_SERVICE,
      //     err: "Validation error",
      //     validationErrors: validationErrors.map((error) => error.toString()),
      //   });
      //   throw new Error("Validation error");
      // }

      logger.info({
        sourece: constants.INCIDENT_COTROLLER,
        msg: constants.ADD_INCIDENT_SUCCESS,
        incidentId: newIncident.id
      });
      return await incidentRepository.addIncident(newIncident);
      // return await incidentRepository.addIncident(incident);
    } catch (error: any) {
      logger.error({
        source: constants.INCIDENT_COTROLLER,
        err: constants.ERROR_ADDING_INCIDENT,
      });
      console.error(`error: ${error}`);
      return error;
    }
  }

  async updateIncident(id: string, data: any): Promise<IIncident | any> {
    try {
      const isValidId:IIncident|any =await incidentRepository.getIncidentById(id);   
      if (isValidId === null || isValidId instanceof Error) {
        logger.error({ source: constants.INCIDENT_COTROLLER, err: constants.INCIDENT_NOT_FOUND, incidentId: id, });
        return new Error(constants.INCIDENT_NOT_FOUND);
      }
      const updatedIncident:IIncident = await incidentRepository.updateIncident(id, data);
      if (updatedIncident) {
        logger.info({ source: constants.INCIDENT_COTROLLER, msg: constants.UPDATE_INCIDENT_SUCCESS, incidetID: id, });
        return updatedIncident;
      }
      logger.error({ source: constants.SERVER_ERROR, method: constants.METHOD.PUT, error: true })
      return new Error(constants.SERVER_ERROR)
    } catch (error: any) {
      logger.error({ source: constants.INCIDENT_COTROLLER, method: constants.METHOD.PUT, incidetID: id, });
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

  async getIncidentByField(fieldValue: string,fieldName: string): Promise<IIncident | any> {
    try {
      const incident = await incidentRepository.getIncidentByField(fieldValue,fieldName);
      if (incident) {
        logger.info({
          source: constants.INCIDENT_COTROLLER,
          method: constants.METHOD.GET,
          incidentId: fieldValue,
        });
      }
      return incident;
    } catch (error: any) {
      logger.error({
        source: constants.INCIDENT_COTROLLER,
        err: constants.INCIDENT_NOT_FOUND,
        incidentID:fieldValue,
      });
      console.error(`error: ${error}`);
      return error;
    }
  }

  async getSummaryIncident(id: string): Promise<ISummary | any> {
    try {
      let summary: ISummary|null=null; 
      // = {
      //   createdBy: '',
      //    createdAt: '',
      //   currentPriority: Priority.P0,
      //   tags: []
      // }
      //check if get incident from repository or service
      const incident = await incidentRepository.getIncidentByField(id,"id");   
      console.log(incident);
      if (incident) {
        //find user with userId from createdBy  ????
        //create summary
        summary = {
          createdBy: incident.createdBy,
          createdAt: incident.createdAt,
          currentPriority: incident.currentPriority,
          tags: incident.currentTags
        }
        logger.info({ source: constants.INCIDENT_COTROLLER, method: constants.METHOD.GET, incidentId: id })
        return summary;
      }
      return summary;
    } catch (error: any) {
      logger.error({ source: constants.INCIDENT_COTROLLER, err: constants.INCIDENT_NOT_FOUND, incidentID: id });
      console.error(`error: ${error}`);
      return error;
    }
  }

}
export default new IncidentService();
