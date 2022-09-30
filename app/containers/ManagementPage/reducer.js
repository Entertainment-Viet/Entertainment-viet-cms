import produce from 'immer';
// import { ENUM_PAGGING } from 'constants/enums';
import {
  LOAD_BOOKING_PACKAGES,
  LOAD_PACKAGES,
  LOAD_INFO_SUCCESS,
  LOAD_INFO_ERROR,
  CHANGE_MODE,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: false,
  packageId: false,
  mode: 0,
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
        break;

      case LOAD_INFO_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.data = false;
        break;

      case CHANGE_MODE:
        draft.mode = action.mode;
    }
  });

export default pageReducer;
