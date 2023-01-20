import {
  CHANGE_PAGE,
  LOAD_INFO_SUCCESS,
  LOAD_INFO_ERROR,
  CHANGE_LIMIT,
  LOAD_BOOKINGS,
  LOAD_BOOKINGS_SUCCESS,
  CHANGE_ROLE,
  CHANGE_SEARCH,
  CHANGE_ISPAID,
  CHANGE_END,
  CHANGE_START,
  CHANGE_STATUS,
} from './constants';

export function changePage(page) {
  return {
    type: CHANGE_PAGE,
    page,
  };
}
export function changeRole(role) {
  return {
    type: CHANGE_ROLE,
    role,
  };
}
export function changeStatus(stt) {
  return {
    type: CHANGE_STATUS,
    stt,
  };
}
export function changeStart(start) {
  return {
    type: CHANGE_START,
    start,
  };
}
export function changeEnd(end) {
  return {
    type: CHANGE_END,
    end,
  };
}
export function changeIspaid(isPaid) {
  return {
    type: CHANGE_ISPAID,
    isPaid,
  };
}
export function changeSearch(search) {
  return {
    type: CHANGE_SEARCH,
    search,
  };
}

export function changeLimit(limit) {
  return {
    type: CHANGE_LIMIT,
    limit,
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

export function loadBookings(
  status,
  hasFilterStatus,
  isFilterAll,
  isFilterUpcoming,
) {
  return {
    type: LOAD_BOOKINGS,
    status,
    hasFilterStatus,
    isFilterAll,
    isFilterUpcoming,
  };
}

export function loadBookingsSuccess(payload) {
  return {
    type: LOAD_BOOKINGS_SUCCESS,
    payload,
  };
}
