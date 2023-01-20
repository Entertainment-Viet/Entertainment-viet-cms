import produce from 'immer';
import { ENUM_PAGGING } from 'constants/enums';
import {
  LOAD_INFO_SUCCESS,
  LOAD_INFO_ERROR,
  CHANGE_LIMIT,
  CHANGE_PAGE,
  CHANGE_END,
  CHANGE_ISPAID,
  CHANGE_ROLE,
  CHANGE_SEARCH,
  CHANGE_START,
  CHANGE_STATUS,
  LOAD_BOOKINGS,
  LOAD_BOOKINGS_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  paging: ENUM_PAGGING,
  data: false,
  search: '',
  role: 'code',
  status: '',
  isPaid: '',
  start: '',
  end: '',
};

/* eslint-disable default-case, no-param-reassign */
const pageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_INFO_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.paging = action.paging;
        break;

      case LOAD_INFO_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      case CHANGE_LIMIT:
        draft.limit = action.limit;
        break;
      case CHANGE_PAGE:
        draft.page = action.page;
        break;
      case LOAD_BOOKINGS:
        draft.error = false;
        draft.loading = true;
        draft.data = false;
        break;
      case LOAD_BOOKINGS_SUCCESS:
        draft.loading = false;
        // draft.bookings = action.payload;
        draft.paging = action.payload.bookings.paging;
        draft.data = action.payload.bookings.content;
        break;
      case CHANGE_SEARCH:
        draft.search = action.search;
        break;
      case CHANGE_END:
        draft.end = action.end;
        break;
      case CHANGE_START:
        draft.start = action.start;
        break;
      case CHANGE_ROLE:
        draft.role = action.role;
        break;
      case CHANGE_ISPAID:
        draft.isPaid = action.isPaid;
        break;
      case CHANGE_STATUS:
        draft.status = action.stt;
        break;
    }
  });

export default pageReducer;
