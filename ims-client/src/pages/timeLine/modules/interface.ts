import { Priority } from "../../../interface/enum-priority";

export interface ITimeLineEventprops {
    timeline: TimelineEvent;
    isPriorityChanged: boolean;
    isTypeChanged: boolean;
    previousType: string;
    previosPriority: Priority;
    name?: string;
    profile?: string;
}
export interface ITimelineEventListprops {
    timelineList: TimelineEvent[];
}


export interface TimelineEvent {
    _id: string;
    incidentId: string;
    userId: string;
    description: string;
    priority: Priority;
    type: string,
    files: string[];
    createdDate: string;
    updatedDate: string;
}
export interface Incident {
    _id: string,
    name: string,
    status: string,
    description: string,
    priority: Priority,
    type: string,
    durationHours: string,
    channelId: string,
    slackLink:string,
    channelName: string,
    tags: { id: string; name: string }[];
    date: Date,
    createdAt: Date,
    updatedAt: Date,
    cost: string
}