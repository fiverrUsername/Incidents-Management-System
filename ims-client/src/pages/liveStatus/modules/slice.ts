import { createSelector, createSlice } from "@reduxjs/toolkit"
import { liveStatusEntry, liveStatusCollection } from "../../../interface/ILiveStatus"

export const SYSTEM_STATUS_STATE_KEY = 'SYSTEM_STATUS'


const initialState: liveStatusCollection = { systemsStatus: [] }

const slice = createSlice({
    name: SYSTEM_STATUS_STATE_KEY,
    initialState,
    reducers: {
        onGetSystemsStatusRequest: (state, action) => {
            console.log('onGetSystemsStatusRequest')
        },
        onGetSystemsStatusSuccess: (state, action) => {
            state.systemsStatus = action.payload
        },
    }
})

const getState = (state: any) => {
    return state[SYSTEM_STATUS_STATE_KEY] || initialState
}

export const selectors = {
    selectSystemsStatus: createSelector(getState, (state: liveStatusCollection) => state.systemsStatus)
}

export const actions = { ...slice.actions }

export default slice.reducer;