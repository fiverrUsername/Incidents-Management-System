import dayjs from 'dayjs';
import {ITag} from './ITag';

export default interface ITimeLineEvent  {
  id:string,
  incidentId: string,
  userId: string,
  description: string,
  priority:string,
  type:string,
  tags:ITag[],
  files:File[],
  createdDate: dayjs.Dayjs,
  updatedDate:Date
}