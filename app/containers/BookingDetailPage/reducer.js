import produce from 'immer';
import { LOAD_DATA, LOAD_DATA_SUCCESS } from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: false,
};

/* eslint-disable default-case, no-param-reassign */
const pageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_DATA:
        draft.loading = true;
        draft.error = false;
        draft.data = false;
        break;
      case LOAD_DATA_SUCCESS:
        console.log(action.data);
        draft.data = action.data;
        draft.loading = false;
    }
  });

export default pageReducer;
