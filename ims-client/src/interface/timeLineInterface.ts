import dayjs from 'dayjs';
import { Priority ,Status } from './enums';
import {ITag} from './ITag';

export interface ITimeLineEvent  {
  incidentId: string,
  userId: string,
  channelId?:string,
  description: string,
  priority:Priority,
  status: Status,
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