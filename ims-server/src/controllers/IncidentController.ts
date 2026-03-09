import { Request, Response } from 'express';
import { STATUS } from '../loggers/constants';
import { IIncident } from '../interfaces/IncidentInterface';
import incidentService from '../services/incidentService';
import { CONSTANTS } from '../loggers/constants';
import { ISummary } from '../interfaces/ISummary';
import { IncidentDto } from '../dto/incidentDto';
import { ActionType, ObjectType } from '../../../ims-socket/src/interfaces';
import { sendToSocket } from '../services/socket'

export default class IncidentController {

  async addIncident(req: Request, res: Response): Promise<void> {
    try {
      const incident: IncidentDto = await incidentService.addIncident(req.body);
      if (incident instanceof Error) {
        res.status(STATUS.SERVER_ERROR).json({ message: incident, error: true });
      }
      else {
        sendToSocket(incident as IIncident, ObjectType.Incident, ActionType.Add);
        res.status(STATUS.CREATED).json(incident);
      }
    } catch (error: any) {
      res.status(STATUS.SERVER_ERROR).json({ message: error.message });
    }
  }

  async updateIncident(req: Request, res: Response): Promise<Response> {
    try {
      const incident: IncidentDto = await incidentService.updateIncident(req.params.id, req.body);
      if (incident instanceof Error) {
        if (incident.message === CONSTANTS.INCIDENT_NOT_FOUND) {
          return res.status(STATUS.NOT_FOUND).json({ message: CONSTANTS.INCIDENT_NOT_FOUND });
        } else {
          return res.status(STATUS.SERVER_ERROR).json({ message: incident, error: true });
        }
      }
      return res.status(STATUS.SUCCESS).json(incident);
    } catch (error: any) {
      return res.status(STATUS.SERVER_ERROR).json({ message: error.message, error: true });
    }
  }

  async getAllIncidents(_req: Request, res: Response): Promise<void> {
    try {
      const incidents: IncidentDto = await incidentService.getAllIncidents();
      if (incidents instanceof Error) {
        res.status(404).json({ message: incidents.message, error: true });
      } else {
        res.status(STATUS.SUCCESS).json(incidents);
      }
    } catch (error: any) {
      res.status(STATUS.SERVER_ERROR).json({ message: error });
    }
  }

  async getIncidentByField(req: Request, res: Response): Promise<void> {
    try {
      const incident: IncidentDto = await incidentService.getIncidentByField(req.params.fieldvalue, req.params.fieldname || 'id');
      if (incident instanceof Error) {
        res.status(STATUS.NOT_FOUND).json({ message: incident, error: true });
      } else res.status(STATUS.SUCCESS).json(incident);
    } catch (error: any) {
      res.status(STATUS.SERVER_ERROR).json({ message: error });
    }
  }

  async getSummaryIncident(req: Request, res: Response): Promise<Response> {
    try {
      const summary: ISummary | null = await incidentService.getSummaryIncident(req.params.id);
      if (summary instanceof Error || summary === null) {
        return res.status(STATUS.NOT_FOUND).json({ message: summary, error: true });
      }
      return res.status(STATUS.SUCCESS).json(summary);
    } catch (error: any) {
      return res.status(STATUS.SERVER_ERROR).json({ message: error });
    }
  }

}