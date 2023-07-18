import IncidentSchema from '../models/IncidentModel';
import { Request, Response } from 'express';
import logger from '../loggers/log';
import validate from './incidentValidation';
import { constants } from '../loggers/constants';
import { IIncident } from '../interfaces/IncidentInterface';

export default class IncidentController {

  public async addIncident(req: Request, res: Response) {
    try {
      const incident: IIncident = req.body;
      await validate(incident);
      const createdIncident: IIncident = await IncidentSchema.create(incident);
      logger.info({ sourece: constants.FROM_DATA_PATH, msg: constants.ADD_INCIDENT_SUCCESS, incidentId: createdIncident._id });
      return res.status(201).json(createdIncident);
    }
    catch (error: any) {
      logger.error({ source: constants.FROM_DATA_PATH, err: constants.ERROR_ADDING_INCIDENT });
      return res.status(500).json({ message: error.message });
    }
  }

  public async updateIncident(req: Request, res: Response) {
    try {
      const incident:IIncident|null = await IncidentSchema.findByIdAndUpdate(req.params.id, req.body);
      if (incident) {
        logger.info({ source: constants.FROM_DATA_PATH, msg: constants.UPDATE_INCIDENT_SUCCESS, incidetID: incident._id || req.params.id });
        return res.status(200).json(incident);
      }
      if(!req.params.id)
      {
        logger.error({ source: constants.MISSNG_REQUIRED_FIELDS, method: constants.METHOD.PUT })
        return res.status(422).json({ message: constants.MISSNG_REQUIRED_FIELDS, error: true })
      }
      logger.error({ source: constants.FROM_DATA_PATH, err: constants.INCIDENT_NOT_FOUND,incidentId:req.params.id });
      return res.status(404).json({ message: constants.INCIDENT_NOT_FOUND });
    } catch (error: any) {
      logger.error({ source: constants.FROM_DATA_PATH, method: constants.METHOD.PUT, incidetID: req.params.id });
      return res.status(500).json({ message: error.message, error: true });
    }
  }

  public async getAllIncidents(req: Request, res: Response) {
    try {
      const incidents = await IncidentSchema.find();
      logger.info({ source: constants.FROM_DATA_PATH, msg: constants.GET_ALL_INCIDENTS_SUCCESS });
      return res.status(200).json(incidents);
    } catch (error: any) {
      logger.error({ source: constants.FROM_DATA_PATH, err: constants.ERROR_GETTING_ALL_ICIDETS });
      return res.status(404).json({ message: error });
    }
  }

  public async getIncidentById(req: Request, res: Response) {
    try {
      const incident = await IncidentSchema.findById(req.params.id);
      if (incident) {
        logger.info({ source: constants.FROM_DATA_PATH, msg: constants.GET_INCIDENT_BY_ID_SUCCESS, incidentId: req.params.id });
        return res.status(200).json(incident);
      }
      logger.error({ source: constants.FROM_DATA_PATH, err: constants.INCIDENT_NOT_FOUND, incidentId: req.params.id, method: constants.METHOD.GET })
    } catch (error: any) {
      logger.error({ source: constants.FROM_DATA_PATH, err: constants.INCIDENT_NOT_FOUND, incidentID: req.params.id, method: constants.METHOD.GET });
      return res.status(404).json({ message: error });
    }
  }

}
