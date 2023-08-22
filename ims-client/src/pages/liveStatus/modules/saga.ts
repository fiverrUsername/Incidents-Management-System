import { call, put, takeEvery } from 'redux-saga/effects'
import apiCalls from '../../../service/apiCalls'
import { actions } from './slice'
import { liveStatusCollection } from '../../../interface/ILiveStatus'


function* onGetLiveStatus() {
    try {
        const data: liveStatusCollection = yield call(apiCalls.getLiveStatus)
        yield put(actions.onGetLiveStatusSuccess(data))
    } catch (error:any) {
        console.error(error)
    }
}

export default function* watchSystemsStatus() {
    yield takeEvery(actions.onGetLiveStatusRequest, onGetLiveStatus)
}