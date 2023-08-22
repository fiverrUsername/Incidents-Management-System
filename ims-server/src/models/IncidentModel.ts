import mongoose, {  Schema } from 'mongoose';
import { IIncident } from '../interfaces/IncidentInterface ';

export const IncidentSchema = new Schema<IIncident>({
    id: {
        type: String,
        required: true,
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
    date: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    durationFault: {
        type: String,
        required: true,
    },
    caringTeam: {
        type: String,
        required: true,
    },
});

export default mongoose.model<IIncident>('Incident', IncidentSchema);








