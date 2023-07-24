import { IncidentDto } from "../dto/incidentDto";
import { IIncident } from "../interfaces/IncidentInterface";
import incidentModel from "../models/IncidentModel";

class IncidentRepository {
  async addIncident(newIncident: IIncident): Promise<IIncident | any> {
    try {
      return await incidentModel.create(newIncident);
    } catch (error: any) {
      console.error(`error: ${error}`);
      return error;
    }
  }

  async updateIncident(id: String, data: IncidentDto): Promise<void | any> {
    try {
      return await incidentModel.findByIdAndUpdate(id, data);
    } catch (error: any) {
      console.error(`error: ${error}`);
      return error;
    }
  }

  async getAllIncidents(): Promise<IIncident[] | any> {
    try {
      return await incidentModel.find();
    } catch (error: any) {
      console.error(`error: ${error}`);
      return error;
    }
  }

  async getIncidentById(id: String): Promise<IIncident | any> {
    try {
      return await incidentModel.findById(id);
    } catch (error: any) {
      console.error(`error: ${error}`);
      return error;
    }
  }

}
export default new IncidentRepository();
