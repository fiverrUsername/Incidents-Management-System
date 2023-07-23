import dayjs from 'dayjs';
import {ITag} from './ITag';

export default interface ITimeLineEvent  {
  incidentId: string,
  userId: string,
  description: string,
  priority:string,
  type:string,
  tags:ITag[],
  files:string,
  createdDate: dayjs.Dayjs,
  updatedDate:Date
}