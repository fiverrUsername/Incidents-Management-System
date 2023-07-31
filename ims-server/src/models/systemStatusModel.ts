import mongoose, { Schema } from "mongoose";
import { ISystemStatus } from "../interfaces/systemStatusInterface";

export const SystemStatusSchema = new Schema<ISystemStatus>({
    systemName: {
        type: String,
        required: true
    },
    incidents: {
        type: [],
        required: true
    },
    date: {
        type: String,
        required: true
    },
    maxPriority: {
        type: String,
        required: true
    }
});
export default mongoose.model<ISystemStatus>("systemStatus", SystemStatusSchema);