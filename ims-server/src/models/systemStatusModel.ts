import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { ISystemStatus } from "../interfaces/systemStatusInterface";
import { Priority } from "../enums/enum";

export const SystemStatusSchema = new Schema<ISystemStatus>({
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
export default mongoose.model<ISystemStatus>("systemStatus", SystemStatusSchema);