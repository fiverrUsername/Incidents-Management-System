import { AggregationType } from "aws-sdk/clients/appflow";
import { CONSTANTS } from "../loggers/constants";
import logger from "../loggers/log";
import aggregationRepository from "../repositories/aggregationRepository";

class AggregateService {
  async aggregateIncident(): Promise<any> {

    try {
      const aggregation: AggregationType | Error = await aggregationRepository.aggregateIncident();
      if (aggregation instanceof Error) {
        logger.error({ source: CONSTANTS.AGGREGATION, err: CONSTANTS.ERROR_AGGGREATION });
      }
      logger.info({ source: CONSTANTS.AGGREGATION, success: true });
      return aggregation;
    } catch (error: any) {
      logger.error({ source: CONSTANTS.AGGREGATION, err: CONSTANTS.ERROR_AGGGREATION });
      console.error(`error: ${error}`);
      return error;
    }
  }
}

export default new AggregateService();