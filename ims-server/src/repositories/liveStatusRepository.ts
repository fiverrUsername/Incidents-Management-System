import { IliveStatus } from "../interfaces/liveStatusInterface";
import liveStatusModel from "../models/liveStatusModel";
class liveStatusRepository {
    async getLiveStatusSystemsByDate(_date: string): Promise<IliveStatus[] | any> {
        try {
            return await liveStatusModel.find({ date: _date })
        }
        catch (e) {
            console.error(`error: ${e}`);
            return null;
        }
    }
  async getLiveStatus(tag: string): Promise<IliveStatus[] | any> {
    try {
      const liveStatusList: IliveStatus[] = await liveStatusModel
        .find({ systemName: tag })
        .sort({ date: 1 })
        .limit(10);
      console.log(liveStatusList)
      return liveStatusList;
    } catch (error: any) {
      console.error(`error: ${error}`);
      return null;
    }
  }
    async getTodaysLiveStatusByTag(tag: string): Promise<IliveStatus | null> {
        try {
            console.log("i'm in getTodaysLiveStatusByTag");
            // Get the start and end of the current day
            const now = new Date();
            const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            return await liveStatusModel.findOne({
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
  async createLiveStatus(data: IliveStatus): Promise<IliveStatus | any> {
    try {
        const newLiveStatus: IliveStatus = await liveStatusModel.create(data);
        return newLiveStatus;
    } catch (error: any) {
        console.error(`error: ${error}`);
        return error;
    }
}
async updateLiveStatus(data: IliveStatus, id: string): Promise<IliveStatus | any> {
    try {
        const updatedliveStatus: IliveStatus | null= await liveStatusModel.findOneAndUpdate({id:id},data);
        return updatedliveStatus;
    } catch (error: any) {
        console.error(`error: ${error}`);
        return error;
    }
}
}
export default new liveStatusRepository();