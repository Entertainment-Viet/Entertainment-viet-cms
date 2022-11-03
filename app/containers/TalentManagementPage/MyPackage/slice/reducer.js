import produce from 'immer';
import { ENUM_PAGGING } from 'constants/enums';
import {
  LOAD_BOOKING_PACKAGES,
  LOAD_PACKAGES,
  LOAD_INFO_SUCCESS,
  LOAD_INFO_ERROR,
  CHANGE_MODE,
  CHANGE_LIMIT,
  CHANGE_PAGE,
  LOAD_PACKAGE,
  LOAD_PACKAGE_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: false,
  packageId: false,
  mode: 0,
  page: 0,
  limit: 10,
  total: 0,
  paging: ENUM_PAGGING,
  packageInfo: false,
};

/* eslint-disable default-case, no-param-reassign */
const pageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_PACKAGES:
        draft.loading = true;
        draft.error = false;
        draft.data = false;
        draft.packageId = action.id;
        break;

      case LOAD_BOOKING_PACKAGES:
        draft.loading = true;
        draft.error = false;
        draft.data = false;
        draft.packageId = action.packageId;
        break;

      case LOAD_INFO_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.data = action.data;
        draft.paging = action.paging;
        break;

      case LOAD_INFO_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.data = false;
        break;
      case CHANGE_MODE:
        draft.mode = action.mode;
        break;
      case CHANGE_LIMIT:
        draft.limit = action.limit;
        break;
      case CHANGE_PAGE:
        draft.page = action.page;
        break;
      case LOAD_PACKAGE:
        draft.error = false;
        draft.loading = true;
        draft.packageInfo = false;
        break;
      case LOAD_PACKAGE_SUCCESS:
        draft.loading = false;
        draft.packageInfo = action.payload;
        break;
    }
  });

export default pageReducer;
