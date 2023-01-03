/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import { API_ACHIEVEMENT } from 'constants/api';
import { LOAD_ACHIEVEMENT } from './constants';
import { loadAchievementSuccess, loadAchievementError } from './actions';
const myId = window.localStorage.getItem('uid');

export function* loadAchievementData() {
  try {
    const payload = yield call(get, API_ACHIEVEMENT, {}, myId);
    yield put(loadAchievementSuccess(payload));
  } catch (err) {
    yield put(loadAchievementError(err));
  }
}
export default function* watchLatestAction() {
  yield takeEvery(LOAD_ACHIEVEMENT, loadAchievementData);
}
