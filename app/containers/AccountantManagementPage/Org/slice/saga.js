import { call, put, select, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import { API_ORG_LIST } from 'constants/api';
import { LOAD_BOOKINGS } from './constants';
import { loadInfoError, loadBookingsSuccess } from './actions';
import { makeSelectLimit, makeSelectPage, makeSelectSearch } from './selectors';

export function* getBookings() {
  const myId = window.localStorage.getItem('uid');
  console.log('my id: ', myId);
  try {
    const page = yield select(makeSelectPage());
    const size = yield select(makeSelectLimit());
    const search = yield select(makeSelectSearch());
    const payload = yield call(
      get,
      API_ORG_LIST,
      {
        page,
        size,
        displayName: search,
      },
      myId,
    );
    yield put(loadBookingsSuccess(payload));
  } catch (err) {
    yield put(loadInfoError(err));
  }
}

export default function* watchLatestAction() {
  yield takeEvery(LOAD_BOOKINGS, getBookings);
}
