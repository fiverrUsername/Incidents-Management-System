import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { ITimelineEvent } from "../interfaces/ItimelineEvent";
import { Priority, Status } from "../enums/enum";
import { ITag } from "../interfaces/tagInterface";
export const TimelineEventSchema = new Schema<ITimelineEvent>({
  id: {
    type: String,
    default: uuidv4,
  },
  incidentId: {
    type: String,
    required: true,
  },
  userId: {
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
    enum: Object.values(Priority),
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(Status),
  },
  type: {
    type: String,
    required: true,
  },
  files: {
    type: [String],
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  updatedDate: {
    type: Date,
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
  }
});

export default mongoose.model<ITimelineEvent>(
  "timelineEvents",
  TimelineEventSchema
);
