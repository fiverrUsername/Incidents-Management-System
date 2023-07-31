import { ISystemStatus } from "../interfaces/systemStatusInterface";
import systemStatusModel from "../models/systemStatusModel";

class SystemStatusRepository {
    async getSystemsByDate(_date: string): Promise<ISystemStatus[] | any> {
        try {
            return await systemStatusModel.find({ date: _date })
        }
        catch (e) {
            console.error(`error: ${e}`);
            return null;
        }
    }
}

export default new SystemStatusRepository();
