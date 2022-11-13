import { call, put, select, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import { API_BOOKING_LIST } from 'constants/api';
import { ENUM_CLIENT_ROLES } from 'constants/enums';
import { LOAD_BOOKINGS } from './constants';
import { loadInfoError, loadBookingsSuccess } from './actions';
import {
  makeSelectLimit,
  makeSelectPage,
  makeSelectEnd,
  makeSelectIsPaid,
  makeSelectRole,
  makeSelectSearch,
  makeSelectStart,
  makeSelectStatus,
} from './selectors';

export function* getBookings() {
  const myId = window.localStorage.getItem('uid');
  try {
    const page = yield select(makeSelectPage());
    const size = yield select(makeSelectLimit());
    const start = yield select(makeSelectStart());
    const end = yield select(makeSelectEnd());
    const search = yield select(makeSelectSearch());
    const isPaid = yield select(makeSelectIsPaid());
    const status = yield select(makeSelectStatus());
    const role = yield select(makeSelectRole());

    let payload;

    if (role === ENUM_CLIENT_ROLES.TAL) {
      payload = yield call(
        get,
        API_BOOKING_LIST,
        {
          page,
          size,
          start,
          end,
          search,
          isPaid,
          status,
        },
        myId,
      );
    }
    if (role === ENUM_CLIENT_ROLES.ORG) {
      payload = yield call(
        get,
        API_BOOKING_LIST,
        {
          page,
          size,
          start,
          end,
          search,
          isPaid,
          status,
        },
        myId,
      );
    }
    // yield put(loadBookingsSuccess(payload));
  } catch (err) {
    // yield put(loadInfoError(err));
  }
}

export default function* watchLatestAction() {
  yield takeEvery(LOAD_BOOKINGS, getBookings);
}
