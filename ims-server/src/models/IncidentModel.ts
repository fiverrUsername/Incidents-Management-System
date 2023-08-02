import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { Priority } from "../enums/enum";
import { IIncident } from "../interfaces/IncidentInterface ";

export const IncidentSchema = new Schema<IIncident>({
  id: {
    type: String,
    default: uuidv4,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  durationHours: {
    type: Number,
    required: true,
  },
  channelId: {
    type: String,
    required: false,
  },
  channelName: {
    type: String,
    required: true,
  },
  slackLink: {
    type: String,
    required: false,
  },
  
  currentTags: {
    type: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
      },
    ],
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: String,
    required: false,
  },
});

export default mongoose.model<IIncident>("incidents", IncidentSchema);
