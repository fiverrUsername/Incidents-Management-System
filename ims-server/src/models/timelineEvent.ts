import mongoose, { Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid';
import { ITimelineEvent } from '../interfaces/ItimelineEvent';

export const TimelineEventSchema = new Schema<ITimelineEvent>({
  _id: {
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
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  type:{
    type:String,
    required:true
  },
  files:{
    type:[String],
    required:true
  },
  createdDate:{
    type:Date,
    required:false,
    default:Date.now()
  },
  updatedDate:{
    type:Date,
    required:false,
  }
});

export default mongoose.model<ITimelineEvent>('timelineEvents', TimelineEventSchema);