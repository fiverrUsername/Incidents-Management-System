import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { IliveStatus } from "../interfaces/liveStatusInterface";
import { Priority } from "../enums/enum";

export const liveStatusSchema = new Schema<IliveStatus>({
    id: {
        type: String,
        default: uuidv4,
    },
    systemName: {
        type: String,
        required: true
    },
    incidents: {
        type: [[String]],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    maxPriority: {
        type: String,
        required: true,
        enum: Object.values(Priority),
    },
    incidentCounter: {
        type: Number,
        required: true,
    }
});
export default mongoose.model<IliveStatus>("liveStatus", liveStatusSchema);