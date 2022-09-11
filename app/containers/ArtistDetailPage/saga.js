/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import { API_TALENT_DETAIL, API_TALENT_PACKAGE } from 'constants/api';
import { LOAD_DATA } from './constants';
import { loadDataSuccess, loadDataError } from './actions';
import { makeSelectId } from './selectors';

export function* getData() {
  const id = yield select(makeSelectId());
  console.log('id: ', id);
  try {
    const payload = yield call(get, API_TALENT_DETAIL, {}, id);
    const packages = yield call(get, API_TALENT_PACKAGE, {}, id);
    yield put(loadDataSuccess(payload, packages));
  } catch (err) {
    yield put(loadDataError(err));
  }
}

export default function* watchLatestAction() {
  yield takeEvery(LOAD_DATA, getData);
}
