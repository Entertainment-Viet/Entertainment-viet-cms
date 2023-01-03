import produce from 'immer';
import {
  CREATE_ACHIEVEMENT,
  LOAD_ACHIEVEMENT,
  LOAD_ACHIEVEMENT_SUCCESS,
  LOAD_ACHIEVEMENT_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: false,
};

/* eslint-disable default-case, no-param-reassign */
const pageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_ACHIEVEMENT:
        draft.error = false;
        draft.loading = true;
        break;
      case LOAD_ACHIEVEMENT_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.data = action.data;
        break;
      case LOAD_ACHIEVEMENT_ERROR:
        draft.loading = false;
        draft.error = true;
        break;
      case CREATE_ACHIEVEMENT:
        draft.loading = false;
        draft.data = action.payload;
        break;
    }
  });

export default pageReducer;
