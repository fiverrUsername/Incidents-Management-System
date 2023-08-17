import { Priority } from "../enums/enum";
import { ISystemStatus } from "../interfaces/systemStatusInterface";
import systemStatusModel from "../models/systemStatusModel";

class SystemStatusRepository {
    async getLiveStatusSystemsByDate(_date: string): Promise<ISystemStatus[] | any> {
        try {
            return await systemStatusModel.find({ date: _date })
        }
        catch (e) {
            console.error(`error: ${e}`);
            return null;
        }
    }

  async getLiveStatus(tag: string): Promise<ISystemStatus[] | any> {
    try {
      const systemStatusList: ISystemStatus[] = await systemStatusModel
        .find({ systemName: tag })
        .sort({ date: -1 })
        .limit(10);
      console.log(systemStatusList)
      return systemStatusList;
    } catch (error: any) {
      console.error(`error: ${error}`);
      return null;
    }
  }
    async getTodaysLiveStatusByTag(tag: string): Promise<ISystemStatus | null> {
        try {
            console.log("i'm in getTodaysLiveStatusByTag");
            // Get the start and end of the current day
            const now = new Date();
            const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            return await systemStatusModel.findOne({
                date: {
                    $gte: startOfDay,
                    $lt: endOfDay
                },
                systemName: tag
            });
        } catch (e) {
            console.error(`error: ${e}`);
            return null;
        }
    }

  async createLiveStatus(data: ISystemStatus): Promise<ISystemStatus | any> {
    try {
        const newLiveStatus: ISystemStatus = await systemStatusModel.create(data);
        return newLiveStatus;
    } catch (error: any) {
        console.error(`error: ${error}`);
        return error;
    }
}

async updateLiveStatus(data: ISystemStatus, id: string): Promise<ISystemStatus | any> {
    try {
        const updatedSystemStatus: ISystemStatus | null= await systemStatusModel.findOneAndUpdate({id:id},data);
        return updatedSystemStatus;
    } catch (error: any) {
        console.error(`error: ${error}`);
        return error;
    }
}
}

export default new SystemStatusRepository();