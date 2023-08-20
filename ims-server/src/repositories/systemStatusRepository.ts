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
    async getLatestLiveStatus(tag: string): Promise<ISystemStatus[] | any> {
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
    async createLiveStatus(data: ISystemStatus, tag: string): Promise<ISystemStatus | any> {
        const priorityIndexMap: Record<Priority, number> = {
            [Priority.P0]: 0,
            [Priority.P1]: 1,
            [Priority.P2]: 2,
            [Priority.P3]: 3,
        };
        const { v4: uuidv4 } = require('uuid');
        const incidentIndex = priorityIndexMap[data.maxPriority];
        const updatedIncidents = [...data.incidents];
        if (!data.incidents) {
            data.incidents = [[], [], [], []];
        }
        // Ensure sub-array at incidentIndex exists
        if (!data.incidents[incidentIndex]) {
            data.incidents[incidentIndex] = [];
        }
        updatedIncidents[incidentIndex].push(data.id);
        const liveStatus: ISystemStatus = {
            id: uuidv4(),
            systemName: tag,
            incidents: updatedIncidents,
            date: new Date(),
            maxPriority: data.maxPriority,
            incidentCounter: 1
        };
        try {
            const newLiveStatus: ISystemStatus = await systemStatusModel.create(liveStatus);
            return newLiveStatus;
        } catch (error: any) {
            console.error(`error: ${error}`);
            return error;
        }
    }
    async updateLiveStatus(data: ISystemStatus, id: string): Promise<ISystemStatus | any> {
        try {
            const existingSystemStatus: ISystemStatus | null = await systemStatusModel.findById(id);
            if (!existingSystemStatus) {
                throw new Error(`ISystemStatus with ID ${id} not found.`);
            }
            const priorityIndexMap: Record<Priority, number> = {
                [Priority.P0]: 0,
                [Priority.P1]: 1,
                [Priority.P2]: 2,
                [Priority.P3]: 3,
            };
            const incidentIndex = priorityIndexMap[data.maxPriority];
            existingSystemStatus.incidents = [...data.incidents];
            existingSystemStatus.incidents[incidentIndex].push(data.id);
            if (data.maxPriority > existingSystemStatus.maxPriority) {
                existingSystemStatus.maxPriority = data.maxPriority;
            }
            existingSystemStatus.incidentCounter++;
            const updatedSystemStatus: ISystemStatus | null = await systemStatusModel.findByIdAndUpdate(id, existingSystemStatus);
            console.log(updatedSystemStatus);
            return updatedSystemStatus;
        } catch (error: any) {
            console.error(`error: ${error}`);
            return error;
        }
    }
}
export default new SystemStatusRepository();