export interface ITimelineEvent {
channelId: string;
  _id: string;
  incidentId: string;
  userId: string;
  description: string;
  priority: string;
  type: string;
  files: string[];
  createdDate: Date;
  updatedDate: Date;
}
