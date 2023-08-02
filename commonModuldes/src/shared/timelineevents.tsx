import { Priority } from "./incidentManagement";
import { ITag } from "./incidentManagement";
import dayjs from 'dayjs';

export interface ITimelineEventListprops {
    timelineList: ITimeLineEvent[];
}

export interface ITimelineEventDto {
    incidentId: string;
    userId: string;
    description: string;
    priority: Priority;
    type: string;
    files: string[];
    createdDate: string;
    updatedDate: string;
}

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
export interface ITimeLineEventprops {
    timeline: ITimeLineEvent;
    isPriorityChanged: boolean;
    isTypeChanged: boolean;
    previousType: string;
    previosPriority: string;
    name?: string;
    profile?: string;
  }