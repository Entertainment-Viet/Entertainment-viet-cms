import produce from 'immer';
import { LOAD_DATA, LOAD_DATA_ERROR, LOAD_DATA_SUCCESS } from './constants';

export const initialState = {
  loading: false,
  error: false,
  cartData: false,
  id: '',
};

/* eslint-disable default-case, no-param-reassign */
const pageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_DATA:
        draft.loading = true;
        draft.error = false;
        draft.cartData = false;
        draft.id = action.id;
        break;
      case LOAD_DATA_SUCCESS:
        draft.loading = false;
        draft.cartData = action.cartData;
        break;
      case LOAD_DATA_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default pageReducer;
