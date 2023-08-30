import { createSelector, createSlice } from "@reduxjs/toolkit"
import { liveStatusCollection } from "../../../interfaces/ILiveStatus"

export const LIVE_STATUS_STATE_KEY = 'LIVE_STATUS'


const initialState: liveStatusCollection = { systemsStatus: [] }

const slice = createSlice({
    name: LIVE_STATUS_STATE_KEY,
    initialState,
    reducers: {
        onGetLiveStatusRequest: () => {
            console.log('')
        },
        onGetLiveStatusSuccess: (state, action) => {
            state.systemsStatus = action.payload
        },
    }
})

const getState = (state: any) => {
    return state[LIVE_STATUS_STATE_KEY] || initialState
}

export const selectors = {
    selectSystemsStatus: createSelector(getState, (state: liveStatusCollection) => state.systemsStatus)
}

export const actions = { ...slice.actions }

export default slice.reducer;