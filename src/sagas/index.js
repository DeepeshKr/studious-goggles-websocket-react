import { all, fork } from 'redux-saga/effects';

import mySaga from './mySaga';
import websock from "./websock"

export function* rootSaga() {
    yield all([
        fork(mySaga),
        fork(websock),
    ])
}

export default rootSaga