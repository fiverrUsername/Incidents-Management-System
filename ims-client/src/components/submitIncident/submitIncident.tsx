import React from 'react'
import IIncident from '../../interface/incidentInterface'
import apiCalls from '../../service/apiCalls'
import { FormData } from '../AddIncident/addIncident'
import { Status } from '../../interface/enums'


export default async function submitIncident(prop: FormData) {

    const incidentcR: IIncident = {
        //TODO
        // id: "1",
        name: prop.name,
        status: Status.Active,
        description: prop.description,
        currentPriority: prop.priority,
        type: prop.type,
        durationHours: 0,
        slackLink: "",
        channelName: prop.channelName,
        channelId: "",
        currentTags: prop.tags.map(tag => ({ id: tag.id, name: tag.name })),
        date: prop.date.toDate(),
        createdAt: new Date(),
        updatedAt: new Date(),
        //TODO
        createdBy: "?",
        cost: 0,
    }

    try {
        await apiCalls.createIncident(incidentcR);
        return true;
    } catch (error) {
        console.error('Error creating incident:', error);
        return false;
    }
}
