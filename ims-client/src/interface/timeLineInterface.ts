import dayjs from 'dayjs';
import { Priority } from './enum-priority';
import {ITag} from './ITag';

export interface ITimeLineEvent  {
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


export interface ITimelineEventListprops {
  timelineList: ITimeLineEvent[];
}

export interface ITimeLineEventprops {
  timeline: ITimeLineEvent;
  isPriorityChanged: boolean;
  isTypeChanged: boolean;
  previousType: string;
  previosPriority: string;
  name?: string;
  profile?: string;
}