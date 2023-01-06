/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import { API_UPDATE } from 'constants/api';
import { LOAD_DATA } from './constants';
import { loadDataError, loadDataSuccess } from './actions';
import {} from './selectors';

export function* getData(booking) {
  try {
    const myId = localStorage.getItem('uid');
    const payload = yield call(get, API_UPDATE, {}, myId, booking.id);
    yield put(loadDataSuccess(payload));
  } catch (err) {
    yield put(loadDataError(err));
  }
}

export default function* watchLatestAction() {
  yield takeEvery(LOAD_DATA, getData);
}
