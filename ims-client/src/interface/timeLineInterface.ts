import dayjs from 'dayjs';

export default interface ITimeLineEvent  {
  incidentId: string,
  userId: string,
  description: string,
  priority:string,
  type:string,
  files:string [],
  createdDate: dayjs.Dayjs,
  updatedDate:Date
}