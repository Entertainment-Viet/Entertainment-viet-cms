import produce from 'immer';
import { LOAD_ORG, LOAD_ORG_SUCCESS } from './constants';

export const initialState = {
  loading: false,
  error: false,
  organizerInfo: false,
};

/* eslint-disable default-case, no-param-reassign */
const pageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_ORG:
        draft.error = false;
        draft.loading = true;
        break;
      case LOAD_ORG_SUCCESS:
        draft.loading = false;
        draft.organizerInfo = action.payload;
        break;
    }
  });

export default pageReducer;
