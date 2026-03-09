import { Request, Response } from "express";
import { STATUS } from "../loggers/constants";
import aggregationService from "../services/aggregationService";


export default class AggregationController {
  async incidentAggregation(_req: Request, res: Response): Promise<void> {
    try {
      const aggregation: any = await aggregationService.aggregateIncident();
      if (aggregation instanceof Error) {
        res.status(STATUS.NOT_FOUND).json({ message: aggregation, error: true });
      } else res.status(STATUS.SUCCESS).json(aggregation);
    } catch (error: any) {
      res.status(STATUS.SERVER_ERROR).json({ message: error.message });
    }
  }
}