
import IIncident from '../../../interfaces/IIncident'
import { FormData } from '../../../components/incidents/addIncident/addIncidentForm/addIncidentForm'
import { Status } from '../../../interfaces/enums'
import backendServices from '../../backendServices/backendServices'


export default async function submitIncident(data: FormData, incident: IIncident[], setIncident: React.Dispatch<React.SetStateAction<IIncident[]>>) {

    const incidentcR: IIncident = {
        //TODO
        name: data.name,
        status: Status.Active,
        description: data.description,
        currentPriority: data.priority,
        type: data.type,
        durationHours: 0,
        slackLink: "",
        channelName: data.channelName,
        channelId: "",
        currentTags: data.tags.map(tag => {
            if (typeof tag === "string") return "";
            return ({ id: tag.id, name: tag.name })
        }),
        date: data.date.toDate(),
        createdAt: new Date(),
        updatedAt: new Date(),
        //TODO
        createdBy: "698cbeda854a5d4d8bcf303l",
        cost: 0,
    }

    try {
        const newIncident = await backendServices.createIncident(incidentcR);
        incidentcR.id = newIncident.id
        const updatedIncidents = [incidentcR, ...incident];
        setIncident(updatedIncidents);
        return true;
    } catch (error) {
        console.error('Error creating incident:', error);
        return false;
    }
}
