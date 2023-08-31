import { Request, Response } from 'express';
import { status } from '../loggers/constants';
import { IIncident } from '../interfaces/IncidentInterface';
import incidentService from '../services/incidentService';
import { constants } from '../loggers/constants';
import { ISummary } from '../interfaces/ISummary';
import { IncidentDto } from '../dto/incidentDto';
import { ActionType, ObjectType } from '../../../ims-socket/src/interfaces';
import { sendToSocket } from '../services/socket';

export default class IncidentController {
  async addIncident(req: Request, res: Response): Promise<Response> {
    try {
      const incident: IncidentDto = await incidentService.addIncident(req.body);
      if (incident instanceof Error || !incident) {
        return res.status(status.SERVER_ERROR).json({ message: incident, error: true });
      }
      sendToSocket(incident as IIncident, ObjectType.Incident, ActionType.Add);
      return res.status(status.CREATED_SUCCESS).json(incident);
    } catch (error: any) {
      return res.status(status.SERVER_ERROR).json({ message: error.message });
    }
  }

  async updateIncident(req: Request, res: Response): Promise<Response> {
    try {
      const incident: IncidentDto = await incidentService.updateIncident(req.params.id, req.body);
      if (incident instanceof Error || incident == null || incident == undefined) {
        return res.status(status.PAGE_NOT_FOUND).json({ message: constants.INCIDENT_NOT_FOUND });
      }
      return res.status(status.SUCCESS).json(incident);
    } catch (error: any) {
      return res.status(status.SERVER_ERROR).json({ message: error.message, error: true });
    }
  }

  async getAllIncidents(req: Request, res: Response): Promise<Response> {
    try {
      const incidents: IncidentDto = await incidentService.getAllIncidents();
      if (incidents == null || incidents == undefined || incidents instanceof Error) {
        return res.status(status.PAGE_NOT_FOUND).json({ message: incidents.message, error: true });
      }
      return res.status(status.SUCCESS).json(incidents);
    } catch (error: any) {
      return res.status(status.PAGE_NOT_FOUND).json({ message: error });
    }
  }

  async getIncidentByField(req: Request, res: Response): Promise<Response> {
    try {
      const incident: IIncident | any = await incidentService.getIncidentByField(req.params.fieldvalue, req.params.fieldname || 'id');
      if (incident == null || incident == undefined || incident instanceof Error) {
        return res.status(status.PAGE_NOT_FOUND).json({ message: incident, error: true });
      } return res.status(status.SUCCESS).json(incident);
    } catch (error: any) {
      return res.status(status.SERVER_ERROR).json({ message: error });
    }
  }

  async getSummaryIncident(req: Request, res: Response): Promise<Response> {
    try {
      const summary: ISummary | null = await incidentService.getSummaryIncident(req.params.id);
      if (summary instanceof Error || summary === null || summary == undefined) {
        return res.status(status.PAGE_NOT_FOUND).json({ message: summary, error: true });
      }
      return res.status(status.SUCCESS).json(summary);
    } catch (error: any) {
      return res.status(status.SERVER_ERROR).json({ message: error });
    }
  }

}