import produce from 'immer';
import { LOAD_DATA, LOAD_DATA_ERROR, LOAD_DATA_SUCCESS } from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: false,
  id: '',
  packages: false,
};

/* eslint-disable default-case, no-param-reassign */
const pageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_DATA:
        draft.loading = true;
        draft.error = false;
        draft.data = false;
        draft.id = action.id;
        break;
      case LOAD_DATA_SUCCESS:
        draft.loading = false;
        draft.data = action.data;
        break;
      case LOAD_DATA_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default pageReducer;
