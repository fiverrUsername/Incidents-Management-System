import { constants } from "../loggers/constants";
import logger from "../loggers/log";
import aggregationRepository from "../repositories/aggregationRepository";

class AggregateService {

    async aggregateIncident(): Promise<any> {
        try {
            const aggregation = await aggregationRepository.aggregateIncident()
            return aggregation
        } catch (error: any) {
            logger.error({ err: constants.ERROR_AGGGREATION });
            console.error(`error: ${error}`);
        }
    }
}

export default new AggregateService();