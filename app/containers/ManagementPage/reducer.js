import produce from 'immer';
// import { ENUM_PAGGING } from 'constants/enums';
import {
  LOAD_BOOKING_PACKAGES,
  LOAD_PACKAGES,
  LOAD_INFO_SUCCESS,
  LOAD_INFO_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: false,
  packageId: false,
};

/* eslint-disable default-case, no-param-reassign */
const pageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_PACKAGES:
        draft.loading = true;
        draft.error = false;
        draft.data = false;
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
        break;

      case LOAD_INFO_ERROR:
        draft.loading = action.error;
        draft.error = true;
        draft.data = false;
        break;
    }
  });

export default pageReducer;
