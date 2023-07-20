import dayjs from 'dayjs';

export default interface ITimeLineEvent  {
  incidentId: string,
  userId: string,
  description: string,
  priority:string,
  type:string,
  files:File[],
  createdDate: dayjs.Dayjs,
  updatedDate:Date
}