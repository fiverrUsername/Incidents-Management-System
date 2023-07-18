import { Request, Response } from 'express';

import aggregationService from '../services/aggregationService';

export default class IncidentController {
    async incidentAggregation(req: Request, res: Response): Promise<void> {
        try {
            const aggregation = await aggregationService.aggregateIncident();
            res.status(200).json(aggregation);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    }
}