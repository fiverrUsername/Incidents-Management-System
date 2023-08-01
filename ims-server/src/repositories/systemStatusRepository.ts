import { ISystemStatus } from "../interfaces/systemStatusInterface";
import systemStatusModel from "../models/systemStatusModel";
import { IIncident } from "../interfaces/IncidentInterface";

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
    // async getAllLiveStatus(): Promise<ISystemStatus[] | any> {
    //     try {
    //         return await systemStatusModel.find()
    //     }
    //     catch (e) {
    //         console.error(`error: ${e}`);
    //         return null;
    //     }
    // }
    async createLiveStatus(data: ISystemStatus, tag: string): Promise<ISystemStatus | any> {
        const liveStatus: ISystemStatus = {
            id: "new uuid",
            systemName: tag,
            incidents: [data.id],
            date: (new Date()).toString(),
            maxPriority: data.maxPriority,
        }
        try {
            const newLiveStatus: ISystemStatus = await systemStatusModel.create(liveStatus);
            console.log(newLiveStatus);
            return newLiveStatus;
        } catch (error: any) {
            console.error(`error: ${error}`);
            return error;
        }
    }
    async updateLiveStatus(incident: IIncident, id: string): Promise<ISystemStatus | any> {
        try {
            const existingSystemStatus: ISystemStatus | null = await systemStatusModel.findById(id);
            if (!existingSystemStatus) {
                throw new Error(`ISystemStatus with ID ${id} not found.`);
            }
            existingSystemStatus.incidents.push(incident.id);
            // Update the maxPriority based on the comparison with the incident's priority
            if (incident.currentPriority > existingSystemStatus.maxPriority) {
                existingSystemStatus.maxPriority = incident.currentPriority;
            }
            // Save the updated existing ISystemStatus back to the database
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
