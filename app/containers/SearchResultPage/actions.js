import {
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_ERROR,
  CHANGE_PAGE,
  CHANGE_BUDGET,
  CHANGE_END,
  CHANGE_START,
  CHANGE_CATEGORY,
  CHANGE_CITY,
  CHANGE_SEARCH,
} from './constants';

export function loadData(search) {
  return {
    type: LOAD_DATA,
    search,
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

export function changePage(page) {
  return {
    type: CHANGE_PAGE,
    page,
  };
}
export function changeCategory(category) {
  return {
    type: CHANGE_CATEGORY,
    category,
  };
}
export function changeCity(city) {
  return {
    type: CHANGE_CITY,
    city,
  };
}
export function changeBudget(budget) {
  return {
    type: CHANGE_BUDGET,
    budget,
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
export function changeSearch(search) {
  return {
    type: CHANGE_SEARCH,
    search,
  };
}
