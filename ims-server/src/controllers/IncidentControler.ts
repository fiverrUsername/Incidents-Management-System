
import   IncidentSchema  from '../models/IncidentModel';
import { Request, Response } from 'express';

export default class IncidenceController {
  
  public async addIncident(req: Request, res: Response) {
    try {
      const incident = await IncidentSchema.create(req.body);
      return res.status(200).json(incident);
    } catch (error) {
      return res.status(404).json({ message: error });
    }
  }
    public async updateIncidence(req: Request, res: Response) {
        try {
            const incidence = await IncidentSchema.findByIdAndUpdate(req.params.id, req.body);
            if (incidence)
                return res.status(200).json(incidence);
            return res.status(404).json("incidence not found");
        } catch (error) {
            res.status(404).json({ message: error });
        }
    }

    public async getAllIncidents(req: Request, res: Response) {
        try {
            const incidents = await IncidentSchema.find();
            return res.status(200).json(incidents);
        } catch (error) {
            return res.status(404).json({ message: error });
        }
    }

    public async getIncidentById(req: Request, res: Response) {
        try {
            const incident = await IncidentSchema.findById(req.params.id);
            if (incident)
                return res.status(200).json(incident);
            return res.status(404).json({ message: "incident not found" });
        } catch (error) {
            return res.status(404).json({ message: error });
        }
    }

}

