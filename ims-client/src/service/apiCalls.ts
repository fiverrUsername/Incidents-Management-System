import axios from "axios"

const apiCalls = {
    //להוסיף את כל הקריאות שרת
    getIncidents: () => axios.get(`http://localhost:5000/incident`).then(response => response.data),
}

export default apiCalls