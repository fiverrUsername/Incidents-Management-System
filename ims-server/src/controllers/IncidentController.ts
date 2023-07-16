
import IncidentSchema from '../models/IncidentModel';
import { Request, Response } from 'express';
import logger from '../loggers/log';
import validate from './incidentValidation';
import { constants } from '../loggers/constants';
import { IIncident } from '../interfaces/IncidentInterface';

export default class IncidentController {

  public async addIncident(req: Request, res: Response) {
    try {
      const incident:IIncident = req.body;
      await validate(incident);
      const createdIncident:IIncident = await IncidentSchema.create(incident);
      logger.info({sourece:constants.FROM_DATA_PATH,msg:constants.ADD_INCIDENT_SUCCESS, incidentId:createdIncident.id});
      return res.status(200).json(createdIncident);
    }
    catch (error: any) {
      logger.error({source:constants.FROM_DATA_PATH, err:constants.ERROR_ADDING_INCIDENT});
      return res.status(404).json({ message: error.message });
    }
  }

  public async updateIncident(req: Request, res: Response) {
    try {    
      const incident = await IncidentSchema.findByIdAndUpdate(req.params.id, req.body);
      if (incident) {
        logger.info({ source: constants.FROM_DATA_PATH, msg: constants.UPDATE_INCIDENT_SUCCESS });
        return res.status(200).json(incident);
      }
    } catch (error: any) {
      return res.status(404).json({ message: error.message, error: true });
    }
  }

  public async getAllIncidents(req: Request, res: Response) {
    try {
      const incidents = await IncidentSchema.find();
      logger.info({ source: constants.FROM_DATA_PATH, msg: constants.GET_ALL_INCIDENTS_SUCCESS });
      return res.status(200).json(incidents);
    } catch (error: any) {
      logger.error({source:constants.FROM_DATA_PATH, err:constants.ERROR_GETTING_ALL_ICIDETS});
      return res.status(404).json({ message: error });
    }
  }

  public async getIncidentById(req: Request, res: Response) {    
    try {
      const incident = await IncidentSchema.findById(req.params.id);
      if (incident)
      {
        logger.info('get incident by id',incident);
        return res.status(200).json(incident);
      }
      return res.status(404).json({ message: "Incident not found" });
    } catch (error:any) {
      logger.error({ source: constants.FROM_DATA_PATH, err: constants.INCIDENT_NOT_FOUND ,incidentID:req.params.id});
      return res.status(404).json({ message: error });
    }
  }

}