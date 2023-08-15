import { combineReducers } from "@reduxjs/toolkit"

import incidentsSlice, { INCIDENT_STATE_KEY } from '../pages/incidents/modules/slice'
import systemsStatusSlice, { SYSTEM_STATUS_STATE_KEY } from "../pages/liveStatus/modules/slice"

const createdAppReducer = combineReducers({
    //-צריך להוסיף כאן את כל ה
    //slice
    [INCIDENT_STATE_KEY]: incidentsSlice,
    [SYSTEM_STATUS_STATE_KEY]: systemsStatusSlice
})

const reducer = (state: any, action: any) => {
    return createdAppReducer(state, action)
}

export default reducer