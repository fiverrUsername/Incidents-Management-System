import axios from "axios"
import  IIncident from "../interface/incidentInterface"

const apiCalls = {
    //להוסיף את כל הקריאות שרת
    getIncidents: () => axios.get(`/incident`).then(response => response.data),
    getTimeLineForIncident:(id:string)=>axios.get(`/incident/${id}`).then(response => response.data),
    getAggregation:() => axios.get(`/aggregation`).then(response => response.data),
    createIncident:(incident:IIncident) => axios.post(`/incident/addIncident`,incident).then(response => response.data)
}

export default apiCalls