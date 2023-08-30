import { constants } from "../loggers/constants";
import logger from "../loggers/log";
import aggregationRepository from "../repositories/aggregationRepository";


class AggregateService {
  async aggregateIncident(): Promise<any> {
    try {
      return await aggregationRepository.aggregateIncident();
    } catch (error: any) {
      logger.error({ err: constants.ERROR_AGGGREATION });
      console.error(`error: ${error}`);
      return error;
    }
  }
}

export default new AggregateService();
