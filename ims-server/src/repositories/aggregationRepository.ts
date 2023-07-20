import logger from "../loggers/log";
import IncidentModel from "../models/IncidentModel";

class AggregationRepository {
    async aggregateIncident(): Promise<any> {
        try {
            const result = await IncidentModel.aggregate([
                {
                    $group: {
                        _id: null,
                        activeCount: {
                            $sum: { $cond: [{ $eq: ['$status', 'Active'] }, 1, 0] },
                        },
                        averageCost: { $avg: '$cost' },
                        averageDurationHours: { $avg: '$durationHours' },
                    },
                },
            ]).exec();

            if (result.length > 0) {
                return result[0];
            } else {
                return ({
                    activeCount: 0,
                    averageCost: 0,
                    averageDurationHours: 0,
                })
            }
        } catch (error: any) {
            return error
        }
    }
}
export default new AggregationRepository();