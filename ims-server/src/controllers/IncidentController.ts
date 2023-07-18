import { Request, Response } from 'express';

import { IIncident } from '../interfaces/IncidentInterface';
import incidentService from '../services/incidentService';
import { constants } from '../loggers/constants';

export default class IncidentController {
  async addIncident(req: Request, res: Response): Promise<void> {
    try {
      const incident = await incidentService.addIncident(req.body);
      res.status(201).json(incident);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateIncident(req: Request, res: Response): Promise<void> {
    try {
      const incident = await incidentService.updateIncident(req.params.id, req.body);
      if (incident) {
        res.status(200).json(incident);
      }
      else if (!req.params.id) {
        res.status(422).json({ message: constants.MISSNG_REQUIRED_FIELDS, error: true })
      }
      else{
          res.status(404).json({ message: constants.INCIDENT_NOT_FOUND });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message, error: true });
    }
  }

    async getAllIncidents(req: Request, res: Response): Promise < void> {
    try {
      const incidents: IIncident[] | null = await incidentService.getAllIncidents();
      res.status(200).json(incidents);
    } catch(error: any) {
      res.status(404).json({ message: error });
    }
  }

    async getIncidentById(req: Request, res: Response): Promise < void> {
    try {
      const incident: IIncident | null = await incidentService.getIncidentById(req.params.id);
    res.status(200).json(incident);
  } catch (error: any) {
    res.status(404).json({ message: error });
  }
    }
}