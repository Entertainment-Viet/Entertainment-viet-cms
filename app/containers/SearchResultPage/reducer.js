import produce from 'immer';
import { ENUM_PAGGING } from 'constants/enums';
import {
  CHANGE_PAGE,
  LOAD_DATA,
  CHANGE_BUDGET,
  CHANGE_END,
  CHANGE_START,
  CHANGE_CATEGORY,
  CHANGE_CITY,
  CHANGE_SEARCH,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: false,
  paging: ENUM_PAGGING,
  page: 1,
  search: '',
  category: '',
  city: '',
  budget: '',
  start: '',
  end: '',
};

/* eslint-disable default-case, no-param-reassign */
const pageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_DATA:
        draft.loading = true;
        draft.error = false;
        draft.data = false;
        draft.paging = ENUM_PAGGING;
        break;
      case CHANGE_PAGE:
        draft.page = action.page;
        break;
      case CHANGE_BUDGET:
        draft.budget = action.budget;
        break;
      case CHANGE_END:
        draft.end = action.end;
        break;
      case CHANGE_START:
        draft.start = action.start;
        break;
      case CHANGE_CATEGORY:
        draft.category = action.category;
        break;
      case CHANGE_CITY:
        draft.city = action.city;
        break;
      case CHANGE_SEARCH:
        draft.search = action.search;
        break;
    }
  });

export default pageReducer;
