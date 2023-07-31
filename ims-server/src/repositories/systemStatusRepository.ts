import { ISystemStatus } from "../interfaces/systemStatusInterface";
import systemStatusModel from "../models/systemStatusModel";
//dependecy injection???
import { IIncident } from "../interfaces/IncidentInterface";

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
    // async getAllLiveStatus(): Promise<ISystemStatus[] | any> {
    //     try {
    //         return await systemStatusModel.find()
    //     }
    //     catch (e) {
    //         console.error(`error: ${e}`);
    //         return null;
    //     }
    // }

    async createLiveStatus(incident: IIncident): Promise<ISystemStatus | any> {
        const ids=[];
        ids.push(incident.id);
        const liveStatus:ISystemStatus={
            systemName: incident.currentTags[0].name,
            incidents: ids,
            date: new Date(),
            maxPriority: incident.currentPriority
        }
        try {
          const newLiveStatus:ISystemStatus=await systemStatusModel.create(liveStatus);
          console.log(newLiveStatus);     
          return  newLiveStatus;
        } catch (error: any) {
          console.error(`error: ${error}`);
          return error;
        }
      }
      async updateLiveStatus(incident: IIncident,id:string ): Promise<ISystemStatus | any> {
        //liveStatus.incidents.push(incident.id);
        //check in enum which has an higher index
        //liveStatus.maxPriority=
        try {
            //i have to update something that was added today and has the name of the tags
          //const updatedLiveStatus:ISystemStatus=await systemStatusModel.getSystemsByDate();
          //console.log(updatedLiveStatus);     
          //return  updatedLiveStatus;
        } catch (error: any) {
          console.error(`error: ${error}`);
          return error;
        }
      }
}

export default new SystemStatusRepository();
