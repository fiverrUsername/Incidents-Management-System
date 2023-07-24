import { Request, Response } from "express";
import aggregationService from "../services/aggregationService";
import { status } from "../loggers/constants";
export default class AggregationController {
  async incidentAggregation(req: Request, res: Response): Promise<void> {
    try {
      const aggregation = await aggregationService.aggregateIncident();
      if (aggregation instanceof Error) {
        res.status(status.PAGE_NOT_FOUND).json({ message: aggregation, error: true });
      } else res.status(status.SUCCESS).json(aggregation);
    } catch (error: any) {
      res.status(status.SERVER_ERROR).json({ message: error.message });
    }
  }
}