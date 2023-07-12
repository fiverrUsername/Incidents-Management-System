export interface ITimeLineEventprops {
    timeline: TimelineEvent
}
export interface IIncidentprops {
    incident: Incident
}


interface TimelineEvent {
    _id: string;
    incidentId: string;
    userId: string;
    description: string;
    priority: string;
    files: string[];
    createdDate: string;
    updatedDate: string;
    name: string;
    profile: string;
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