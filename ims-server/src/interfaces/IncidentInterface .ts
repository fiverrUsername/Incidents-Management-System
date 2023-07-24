export interface IIncident extends Document {
  id: string;
  name: string;
  status: string;
  description: string;
  priority: string;
  date: Date;
  type: string;
  durationFault: string;
  caringTeam: string;
}
