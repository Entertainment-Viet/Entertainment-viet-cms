import { put, select, takeEvery } from 'redux-saga/effects';
import { LOAD_DATA } from './constants';
import { loadInfoError, loadDataSuccess } from './actions';
import { makeSelectLimit, makeSelectPage } from './selectors';

const mockDataTalent = [
  {
    uid: '865ba737-6e0f-4c6b-b805-6bd778464cfc',
    displayName: 'Test 1',
    position: 'Chủ tịch',
    gmail: 'test@gmail.com',
    phoneNumber: '01234343444',
    status: 'user.state.pending',
  },
  {
    uid: '865ba737-6e0f-4c6b-b805-6bd778464cfc',
    displayName: 'Test 5',
    position: 'Chủ tịch',
    gmail: 'test@gmail.com',
    phoneNumber: '01234343444',
    status: 'user.state.verified',
  },
  {
    uid: '865ba737-6e0f-4c6b-b805-6bd778464cfc',
    displayName: 'Test 2',
    position: 'Chủ tịch',
    gmail: 'test@gmail.com',
    phoneNumber: '01234343444',
    status: 'user.state.guest',
  },
  {
    uid: '865ba737-6e0f-4c6b-b805-6bd778464cfc',
    displayName: 'Test 3',
    position: 'Chủ tịch',
    gmail: 'test@gmail.com',
    phoneNumber: '01234343444',
    status: 'user.state.unverified',
  },
  {
    uid: '865ba737-6e0f-4c6b-b805-6bd778464cfc',
    displayName: 'Test 4',
    position: 'Chủ tịch',
    gmail: 'test@gmail.com',
    phoneNumber: '01234343444',
    status: 'user.state.archived',
  },
];

const mockDataOrg = [
  {
    uid: '1bd861a6-4726-4709-bf21-79834a9498a5',
    displayName: 'Test 1',
    representative: 'Bảo Đặng',
    gmail: 'test@gmail.com',
    phoneNumber: '01234343444',
    status: 'user.state.pending',
  },
  {
    uid: '1bd861a6-4726-4709-bf21-79834a9498a5',
    displayName: 'Test 5',
    representative: 'Bảo Đặng',
    gmail: 'test@gmail.com',
    phoneNumber: '01234343444',
    status: 'user.state.verified',
  },
  {
    uid: '1bd861a6-4726-4709-bf21-79834a9498a5',
    displayName: 'Test 2',
    representative: 'Bảo Đặng',
    gmail: 'test@gmail.com',
    phoneNumber: '01234343444',
    status: 'user.state.guest',
  },
  {
    uid: '1bd861a6-4726-4709-bf21-79834a9498a5',
    displayName: 'Test 3',
    representative: 'Bảo Đặng',
    gmail: 'test@gmail.com',
    phoneNumber: '01234343444',
    status: 'user.state.unverified',
  },
  {
    uid: '1bd861a6-4726-4709-bf21-79834a9498a5',
    displayName: 'Test 4',
    representative: 'Bảo Đặng',
    gmail: 'test@gmail.com',
    phoneNumber: '01234343444',
    status: 'user.state.archived',
  },
];

export function* getData(id) {
  try {
    const page = yield select(makeSelectPage());
    const size = yield select(makeSelectLimit());
    // eslint-disable-next-line no-console
    console.log(page, size);
    const { isGetDataTalent } = id;
    let payload;
    if (isGetDataTalent) {
      payload = mockDataTalent;
    } else {
      payload = mockDataOrg;
    }
    yield put(loadDataSuccess(payload));
  } catch (err) {
    yield put(loadInfoError(err));
  }
}

export default function* watchLatestAction() {
  yield takeEvery(LOAD_DATA, getData);
}
