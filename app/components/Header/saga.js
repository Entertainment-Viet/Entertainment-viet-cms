/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeEvery, delay, all } from 'redux-saga/effects';
import { get } from 'utils/request';
import { API_GET_SHOPPINGCART, API_TALENT_DETAIL } from 'constants/api';
import { LOAD_DATA } from './constants';
import { loadDataSuccess, loadDataError } from './actions';
import { makeSelectId } from './selectors';

export function* getData() {
  const id = yield select(makeSelectId());
  try {
    while (true) {
      const payload = yield call(get, API_GET_SHOPPINGCART, {}, id);
      const talent = yield all(
        payload.content.map(el =>
          call(get, `${API_TALENT_DETAIL}`, {}, el.talentId),
        ),
      );
      payload.content = payload.content.map((p, index) => ({
        ...p,
        talent: talent[index],
      }));
      yield put(loadDataSuccess(payload));
      yield delay(5000);
    }
  } catch (err) {
    yield put(loadDataError(err));
  }
}

export default function* watchLatestAction() {
  yield takeEvery(LOAD_DATA, getData);
}
