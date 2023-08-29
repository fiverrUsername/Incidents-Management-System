import { Request, Response } from "express";
import aggregationService from "../services/aggregationService";
import { status } from "../loggers/constants";
export default class AggregationController {
  async incidentAggregation(req: Request, res: Response): Promise<Response> {
    try {
      const aggregation = await aggregationService.aggregateIncident();
      if (aggregation == null || aggregation == undefined || aggregation instanceof Error) {
        return res.status(status.PAGE_NOT_FOUND).json({ message: aggregation, error: true });
      }
      return res.status(status.SUCCESS).json(aggregation);
    } catch (error: any) {
      return res.status(status.SERVER_ERROR).json({ message: error.message });
    }
  }
}