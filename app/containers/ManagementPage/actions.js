import {
  LOAD_INFO,
  CHANGE_PAGE,
  LOAD_INFO_SUCCESS,
  LOAD_INFO_ERROR,
} from './constants';

export function loadInfo() {
  return {
    type: LOAD_INFO,
  };
}

export function changePage(page) {
  return {
    type: CHANGE_PAGE,
    page,
  };
}

export function loadInfoSuccess(data) {
  return {
    type: LOAD_INFO_SUCCESS,
    data,
  };
}
export function loadInfoError(error) {
  return {
    type: LOAD_INFO_ERROR,
    error,
  };
}
