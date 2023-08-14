import { call, put, takeEvery } from 'redux-saga/effects'
import apiCalls from '../../../service/apiCalls'
import { actions } from './slice'
import { SystemStatusCollection } from '../../../interface/ISytemStatus'


function* onGetSystemsStatus() {
    try {
        const data: SystemStatusCollection = yield call(apiCalls.getSystemsStatus)
        yield put(actions.onGetSystemsStatusSuccess(data))
    } catch (error:any) {
        console.error(error)
    }
}

export default function* watchSystemsStatus() {
    yield takeEvery(actions.onGetSystemsStatusRequest, onGetSystemsStatus)
}