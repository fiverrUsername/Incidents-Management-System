import { AggregationType } from "aws-sdk/clients/appflow";
import { CONSTANTS } from "../loggers/constants";
import logger from "../loggers/log";
import aggregationRepository from "../repositories/aggregationRepository";

class AggregateService {

  async aggregateIncident(): Promise<AggregationType> {
    try {

      const aggregation = await aggregationRepository.aggregateIncident();

      if (aggregation instanceof Error) {
        throw aggregation;
      }

      logger.info({
        source: CONSTANTS.AGGREGATION,
        message: CONSTANTS.SUCCESS
      });

      return aggregation;

    } catch (error) {

      logger.error({
        source: CONSTANTS.AGGREGATION,
        err: CONSTANTS.ERROR_AGGGREATION,
        error
      });

      throw error;
    }
  }
}

export default new AggregateService();