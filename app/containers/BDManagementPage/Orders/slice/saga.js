import { call, put, select, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import { API_LIST_BOOKING_BD } from 'constants/api';
import { LOAD_BOOKINGS } from './constants';
import { loadInfoError, loadBookingsSuccess } from './actions';
import {
  makeSelectLimit,
  makeSelectPage,
  makeSelectEnd,
  makeSelectIsPaid,
  makeSelectSearch,
  makeSelectStart,
  makeSelectStatus,
  makeSelectRole,
} from './selectors';

export function* getBookings() {
  const myId = window.localStorage.getItem('uid');
  console.log('my id: ', myId);
  try {
    const page = yield select(makeSelectPage());
    const size = yield select(makeSelectLimit());
    const start = yield select(makeSelectStart());
    const end = yield select(makeSelectEnd());
    const search = yield select(makeSelectSearch());
    const isPaid = yield select(makeSelectIsPaid());
    const status = yield select(makeSelectStatus());
    const role = yield select(makeSelectRole());

    const payload = yield call(
      get,
      API_LIST_BOOKING_BD,
      {
        page,
        size,
        endTime: end,
        startTime: start,
        paid: isPaid,
        talent: role === 'talent' ? search : null,
        organizer: role === 'organizer' ? search : null,
        status,
        bookingCode: role === 'code' ? search : null,
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
