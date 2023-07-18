import mongoose, { Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid';
import { ITimelineEvent } from '../interfaces/ItimelineEvent';

export const TimelineEventSchema = new Schema<ITimelineEvent>({
  _id: {
    type: String,
    default: uuidv4,
  },
    userName: {
    type: String,
    required: true,
  },
  date:{
    type:Date,
    required:true,
    default:Date.now()
  },
  description:{
    type:String,
    required:true
  },
  priority:{
    type:Number,
    required:true
  }
});

export default mongoose.model<ITimelineEvent>('timelineEvents', TimelineEventSchema);