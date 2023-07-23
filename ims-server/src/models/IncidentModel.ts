import mongoose, { Schema } from "mongoose";
import { type IIncident } from "../interfaces/IncidentInterface";
import { v4 as uuidv4 } from "uuid";

export const IncidentSchema = new Schema<IIncident>({
  _id: {
    type: String,
    default: uuidv4,
  },
  id: {
    type: String,
    required: true,
    unique: true,
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
  priority: {
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
  slackLink: {
    type: String,
    required: true,
  },
  tags: {
    type: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
      },
    ],
    required: true,
  },
  date: {
    type: String,
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
