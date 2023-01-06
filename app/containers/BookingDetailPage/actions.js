import { LOAD_DATA, LOAD_DATA_SUCCESS, LOAD_DATA_ERROR } from './constants';

export function loadData(id) {
  return {
    type: LOAD_DATA,
    id,
  };
}

export function loadDataSuccess(data) {
  return {
    type: LOAD_DATA_SUCCESS,
    data,
  };
}
export function loadDataError(error) {
  return {
    type: LOAD_DATA_ERROR,
    error,
  };
}
