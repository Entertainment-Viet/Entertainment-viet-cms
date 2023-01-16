import { call, put, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import { API_TALENT_DETAIL } from 'constants/api';
import { loadDataError, loadTalentInfoSuccess } from './actions';
import { LOAD_TALENT } from './constants';

export function* getTalentInfo(id) {
  try {
    const myId = localStorage.getItem('uid');
    const payload = yield call(get, API_TALENT_DETAIL, {}, myId, id.talentId);
    yield put(loadTalentInfoSuccess(payload));
  } catch (err) {
    yield put(loadDataError(err));
  }
}
export default function* watchLatestAction() {
  yield takeEvery(LOAD_TALENT, getTalentInfo);
}
