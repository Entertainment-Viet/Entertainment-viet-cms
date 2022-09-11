import {
  LOAD_PACKAGES,
  CHANGE_PAGE,
  LOAD_INFO_SUCCESS,
  LOAD_INFO_ERROR,
  LOAD_BOOKING_PACKAGES,
} from './constants';

export function loadPackages() {
  return {
    type: LOAD_PACKAGES,
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
