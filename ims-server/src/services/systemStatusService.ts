import { ISystemStatus } from "../interfaces/systemStatusInterface";
import { constants } from "../loggers/constants";
import logger from "../loggers/log";
import systemStatusRepository from "../repositories/systemStatusRepository";

class SystemStatusService {
    async getAllIncidents(date: string): Promise<ISystemStatus[] | any> {
        try {
            logger.info({
                source: constants.SYSTEM_STATUS_SERVICE,
                msg: constants.GET_SYSTEMS_BY_DATE_SUCCESS,
            });
            return await systemStatusRepository.getSystemsByDate(date);
        } catch (error: any) {
            logger.error({
                source: constants.SYSTEM_STATUS_SERVICE,
                err: constants.GET_SYSTEMS_BY_DATE_FAILED,
            });
            console.error(`error: ${error}`);
            return error;
        }
    }
}

export default new SystemStatusService()