import { Request, Response } from "express";
import aggregationService from "../services/aggregationService";

export default class AggregationController {
  async incidentAggregation(req: Request, res: Response): Promise<void> {
    try {
      const aggregation = await aggregationService.aggregateIncident();
      if (aggregation instanceof Error) {
        res.status(404).json({ message: aggregation, error: true });
      } else res.status(200).json(aggregation);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}