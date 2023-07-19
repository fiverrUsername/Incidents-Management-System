import { IIncident } from '../interfaces/IncidentInterface';
import incidentModel from '../models/IncidentModel';

class IncidentRepository {

  async addIncident(newIncident: IIncident): Promise<void | null> {
    try {
      await incidentModel.create(newIncident);
    } catch (error) {
      console.error(`error: ${error}`);
      return null;
    }
  }

  async updateIncident(id: String, data: typeof incidentModel): Promise<void | null> {
    try {
      return await incidentModel.findByIdAndUpdate(id, data);
    } catch (error) {
      console.error(`error: ${error}`);
      return null;
    }
  }

  async getAllIncidents(): Promise<IIncident[] | null> {
    try {
      return await incidentModel.find();
    } catch (error) {
      console.error(`error: ${error}`);
      return null;
    }
  }

  async getIncidentById(id: String): Promise<IIncident | null> {
    try {
      return await incidentModel.findById(id);
    } catch (error) {
      console.error(`error: ${error}`);
      return null;
    }
  }
}
export default new IncidentRepository();