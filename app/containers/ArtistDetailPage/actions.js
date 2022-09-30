import {
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_ERROR,
  LOAD_PACKAGE,
  LOAD_PACKAGE_SUCCESS,
} from './constants';

export function loadData(id) {
  return {
    type: LOAD_DATA,
    id,
  };
}

export function loadDataSuccess(data, packages) {
  return {
    type: LOAD_DATA_SUCCESS,
    data,
    packages,
  };
}
export function loadDataError(error) {
  return {
    type: LOAD_DATA_ERROR,
    error,
  };
}
export function loadPackageInfo(id, talentId) {
  return {
    type: LOAD_PACKAGE,
    id,
    talentId,
  };
}
export function loadPackageInfoSuccess(payload) {
  return {
    type: LOAD_PACKAGE_SUCCESS,
    payload,
  };
}
