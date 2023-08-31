import { constants } from "../loggers/constants";
import logger from "../loggers/log";
import aggregationRepository from "../repositories/aggregationRepository";

class AggregateService {
  async aggregateIncident(): Promise<any> {
    try {
      const aggregation = await aggregationRepository.aggregateIncident();
      if (aggregation instanceof Error) {
        logger.error({ source: constants.AGGREGATION, err: constants.ERROR_AGGGREATION });
      }
      logger.info({ source: constants.AGGREGATION, success: true });
      return aggregation;
    } catch (error: any) {
      logger.error({ source: constants.AGGREGATION, err: constants.ERROR_AGGGREATION });
      console.error(`error: ${error}`);
    }
  }
}

export default new AggregateService();
