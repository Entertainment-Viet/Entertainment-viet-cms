/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeEvery } from 'redux-saga/effects';
import { get } from 'utils/request';
import { NFT_LOAD } from './constants';
import {} from 'constants/api';
import {} from './actions';
import {} from './selectors';

export function* getData() {}

export default function* watchLatestAction() {
  yield takeEvery(NFT_LOAD, getData);
}
