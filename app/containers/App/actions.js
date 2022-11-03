import { LOAD_DATA, LOAD_ERROR, LOAD_SUCCESS } from './constants';

export function loadData(data=false) {
  return {
    type: LOAD_DATA,
    data
  };
}

export function loadError(error) {
  return {
    type: LOAD_ERROR,
    error
  };
}

export function loadSuccess(success) {
  return {
    type: LOAD_SUCCESS,
    success
  };
}
