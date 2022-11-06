import {
  LOAD_PACKAGES,
  CHANGE_PAGE,
  LOAD_INFO_SUCCESS,
  LOAD_INFO_ERROR,
  LOAD_BOOKING_PACKAGES,
  CHANGE_MODE,
  CHANGE_LIMIT,
  LOAD_PACKAGE,
  LOAD_PACKAGE_SUCCESS,
} from './constants';

export function loadPackages(id) {
  return {
    type: LOAD_PACKAGES,
    id,
  };
}

export function loadBookingPackages(packageId) {
  return {
    type: LOAD_BOOKING_PACKAGES,
    packageId,
  };
}

export function changePage(page) {
  return {
    type: CHANGE_PAGE,
    page,
  };
}

export function changeLimit(limit) {
  return {
    type: CHANGE_LIMIT,
    limit,
  };
}
export function changeMode(mode) {
  return {
    type: CHANGE_MODE,
    mode,
  };
}

export function loadInfoSuccess(data, paging) {
  return {
    type: LOAD_INFO_SUCCESS,
    data,
    paging,
  };
}
export function loadInfoError(error) {
  return {
    type: LOAD_INFO_ERROR,
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
