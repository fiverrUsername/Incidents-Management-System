import mongoose from "mongoose";
import { IncidentDto } from "../dto/incidentDto";
import { IIncident } from "../interfaces/IncidentInterface";
import { ITimelineEvent } from "../interfaces/ItimelineEvent";
import incidentModel from "../models/IncidentModel";
import TimelineEventRepository from "../repositories/timelineEventRepository"
import { Status } from "../enums/enum";

class IncidentRepository {
  async addIncident(newIncident: IIncident): Promise<IIncident | any> {
    const timeline:ITimelineEvent={
      channelId:newIncident.channelId,
      incidentId: newIncident.id || "",
      userId: newIncident.createdBy,
      description: 'Created new Incident',
      priority: newIncident.currentPriority,
      type: newIncident.type,
      files: [],
      createdDate: new Date(),
      updatedDate: new Date(),
      status:newIncident.status
    }
    try {
      const _newIncident:IIncident=await incidentModel.create(newIncident);
      timeline.incidentId=_newIncident.id || ""
      await TimelineEventRepository.addTimelineEvent(timeline)
      return  _newIncident;
    } catch (error: any) {
      console.error(`error: ${error}`);
      return error;
    }
  }

  async updateIncident(id: String, data: IncidentDto): Promise<IIncident | any> {
    try {
      return await incidentModel.findOneAndUpdate({id}, data);
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

  async  getIncidentByField(fieldValue: string, fieldName: string): Promise<IIncident | any> {
    try {
      return await incidentModel.findOne({ [fieldName]: fieldValue });
    } catch (error: any) {
      console.error(`error: ${error}`);
      return error;
    }
  }
  
  async  getIncidentById(id: string): Promise<IIncident | any> {
    try {
      return await incidentModel.findOne({ id });
    } catch (error: any) {
      console.error(`error: ${error}`);
      return error;
    }
  }
  
}
export default new IncidentRepository();
