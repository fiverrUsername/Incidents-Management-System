import dayjs from 'dayjs';
import {ITag} from './ITag';
import { Priority } from './enum-priority';

export default interface ITimeLineEvent  {
  incidentId: string,
  userId: string,
  description: string,
  priority:Priority,
  type:string,
  tags:ITag[],
  files:string[],
  createdDate: dayjs.Dayjs,
  updatedDate:Date
}