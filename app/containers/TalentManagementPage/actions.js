import {
  LOAD_PACKAGES,
  CHANGE_PAGE,
  LOAD_INFO_SUCCESS,
  LOAD_INFO_ERROR,
  LOAD_BOOKING_PACKAGES,
  CHANGE_MODE,
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
export function changeMode(mode) {
  return {
    type: CHANGE_MODE,
    mode,
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
