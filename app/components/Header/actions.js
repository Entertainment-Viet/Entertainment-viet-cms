import { LOAD_DATA, LOAD_DATA_SUCCESS, LOAD_DATA_ERROR } from './constants';

export function loadDataHeader(id) {
  return {
    type: LOAD_DATA,
    id,
  };
}

export function loadDataSuccess(cartData) {
  return {
    type: LOAD_DATA_SUCCESS,
    cartData,
  };
}
export function loadDataError(error) {
  return {
    type: LOAD_DATA_ERROR,
    error,
  };
}
