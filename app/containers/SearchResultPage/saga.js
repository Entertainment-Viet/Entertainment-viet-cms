/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeEvery, delay } from 'redux-saga/effects';
import { get } from 'utils/request';
import { API_TALENT_LIST } from 'constants/api';
import { LOAD_DATA } from './constants';
import { loadDataSuccess, loadDataError } from './actions';
import {
  makeSelectBudget,
  makeSelectCategory,
  makeSelectEnd,
  makeSelectPage,
  makeSelectSearch,
  makeSelectStart,
  makeSelectCity,
} from './selectors';

export function* getData() {
  const page = yield select(makeSelectPage());
  yield delay(1000);
  const search = yield select(makeSelectSearch());
  const city = yield select(makeSelectCity());
  const budget = yield select(makeSelectBudget());
  const start = yield select(makeSelectStart());
  const end = yield select(makeSelectEnd());
  const category = yield select(makeSelectCategory());
  try {
    const payload = yield call(get, API_TALENT_LIST, {
      page,
      search,
      category,
      city,
      budget,
      start,
      end,
    });
    yield put(loadDataSuccess(payload.data, payload.paging));
  } catch (err) {
    yield put(loadDataError(err));
  }
}

export default function* watchLatestAction() {
  yield takeEvery(LOAD_DATA, getData);
}
