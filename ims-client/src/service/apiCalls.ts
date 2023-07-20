import axios from "axios"
import IIncident from "../interface/incidentInterface"
import ITimeLineEvent from "../interface/timeLineInterface"

const apiCalls = {
    //להוסיף את כל הקריאות שרת
    getIncidents: () => axios.get(`http://127.0.0.1:7000/incident`).then(response => response.data),
    getAggregation: () => axios.get(`http://127.0.0.1:7000/aggregation`).then(response => response.data),
    createIncident: (incident: IIncident) => axios.post(`http://127.0.0.1:7000/incident/addIncident`, incident).then(response => response.data),
    getTags: () => axios.get(`http://127.0.0.1:7000/tag`).then(response => response.data),
    getIncidentById:(id:string)=>axios.get(`http://localhost:7000/incident/${id}`).then(response => response.data),
    getSummaryIncident:(id:string)=>axios.get(`http://localhost:7000/incident/summary/${id}`).then(response => response.data),
    getTimeLineEvents:()=>axios.get(`http://localhost:7000/timelineEvent`).then(response => response.data),
    getTimeLineForIncident:(id:string)=>axios.get(`http://localhost:7000/incident/${id}`).then(response => response.data),
    addTimelineEvent:(timeLineEvent: ITimeLineEvent) => axios.post(`http://127.0.0.1:7000/timelineEvent`, timeLineEvent).then(response => response.data),
}

export default apiCalls