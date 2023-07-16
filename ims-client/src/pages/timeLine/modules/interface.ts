export interface ITimeLineEventprops {
    timeline: TimelineEvent;
    isPriorityChanged: boolean;
    isTypeChanged: boolean;
    previousType: string;
    previosPriority: string;
    name?: string;
    profile?: string;
}
export interface Idincidentprops {
    _id: string
}


interface TimelineEvent {
    _id: string;
    incidentId: string;
    userId: string;
    description: string;
    priority: string;
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
    priority: string
    type: string
    durationHours: string,
    slackLink: string
    tags: { id: string; name: string }[];
    date: Date,
    createdAt: Date,
    updatedAt: Date,
    cost: string
}