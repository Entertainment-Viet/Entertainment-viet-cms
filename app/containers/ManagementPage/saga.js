/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import { API_JOBOFFER_LIST } from 'constants/api';
import { LOAD_INFO } from './constants';
import { loadInfoSuccess, loadInfoError } from './actions';
import { makeSelectPage } from './selectors';

export function* getData() {
  try {
    // const page = yield select(makeSelectPage());
    const payload = yield call(
      get,
      API_JOBOFFER_LIST,
      {},
      'cc5291f7-523c-4129-8f34-6f599c13ebb9',
    );
    yield put(loadInfoSuccess(payload));
  } catch (err) {
    yield put(loadInfoError(err));
  }
}

export default function* watchLatestAction() {
  yield takeEvery(LOAD_INFO, getData);
}
