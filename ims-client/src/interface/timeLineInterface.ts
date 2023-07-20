import dayjs from 'dayjs';

export default interface ITimeLineEvent  {
  id:string,
  incidentId: string,
  userId: string,
  description: string,
  priority:string,
  type:string,
  tags:{ id: string, name: string }[],
  files:File[],
  createdDate: dayjs.Dayjs,
  updatedDate:Date
}