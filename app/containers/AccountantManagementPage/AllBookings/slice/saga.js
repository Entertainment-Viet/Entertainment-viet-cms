import { call, put, select, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import { API_BOOKING_LIST } from 'constants/api';
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
  const myId = localStorage.getItem('uid');
  console.log('my id: ', myId);
  try {
    const page = yield select(makeSelectPage());
    const size = yield select(makeSelectLimit());
    const startTime = yield select(makeSelectStart());
    const endTime = yield select(makeSelectEnd());
    const search = yield select(makeSelectSearch());
    const isPaid = yield select(makeSelectIsPaid());
    const status = yield select(makeSelectStatus());
    const role = yield select(makeSelectRole());
    let payload;
    if (role === 'org') {
      payload = yield call(
        get,
        API_BOOKING_LIST,
        {
          page,
          size,
          startTime,
          endTime,
          paid: isPaid,
          status,
          organizerId: search,
        },
        myId,
      );
    } else if (role === 'talent') {
      payload = yield call(
        get,
        API_BOOKING_LIST,
        {
          page,
          size,
          startTime,
          endTime,
          paid: isPaid,
          status,
          talentid: search,
        },
        myId,
      );
    } else
      payload = yield call(
        get,
        API_BOOKING_LIST,
        {
          page,
          size,
          startTime,
          endTime,
          paid: isPaid,
          status,
          bookingCode: search,
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
