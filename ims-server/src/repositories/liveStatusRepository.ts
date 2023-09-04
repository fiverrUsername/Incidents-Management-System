import { IliveStatus } from "../interfaces/liveStatusInterface";
import liveStatusModel from "../models/liveStatusModel";
class liveStatusRepository {
    async getLiveStatusSystemsByDate(_date: Date, tag?: string): Promise<IliveStatus[] | any> {
        try {
            const startDate = new Date(_date);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(_date);
            endDate.setHours(23, 59, 59, 999);
            let query: Record<string, any> = {
                date: {
                    $gte: startDate,
                    $lte: endDate,
                }
            };
            if (tag) {
                query.systemName = tag
            }
            const results = await liveStatusModel.find(query);
            return results;
        }
        catch (e) {
            console.error(`error: ${e}`);
            return null;
        }
    }
    async getLiveStatusByTag(tag: string, startDate: Date, endDate: Date): Promise<IliveStatus[] | any> {
        try {
            let query: Record<string, any> = { systemName: tag };
            endDate.setHours(23, 59, 59, 999);
            query.date = {
                $gte: startDate,
                $lte: endDate,
            };
            const liveStatusList: IliveStatus[] = await liveStatusModel
                .find(query)
                .sort({ date: 1 })
            return liveStatusList;
        } catch (error: any) {
            console.error(`error: ${error}`);
            return null;
        }
    }
    async getTodaysLiveStatusByTag(tag: string): Promise<IliveStatus | null> {
        try {
            const today = new Date();
            const todaysLiveStatus = await this.getLiveStatusSystemsByDate(today, tag);
            return todaysLiveStatus[0];
        } catch (error: any) {
            console.error(`error: ${error}`);
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
            const updatedliveStatus: IliveStatus | null = await liveStatusModel.findOneAndUpdate({ id: id }, data);
            return updatedliveStatus;
        } catch (error: any) {
            console.error(`error: ${error}`);
            return error;
        }
    }
}
export default new liveStatusRepository();