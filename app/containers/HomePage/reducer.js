import produce from 'immer';
import {
  NFT_LOAD, NFT_LOAD_SUCCESS, NFT_LOAD_ERROR,
  NFT_CHANGE_PAGE, NFT_SEARCH,
  NFT_SORT_TYPELIST, NFT_SORT_POSITION, NFT_CHANGE_NFT_CONVERT,
  NFT_CHANGE_ORGANIZATION
} from './constants';
import { ENUM_PAGGING } from 'constants/enums';

export const initialState = {
  loading: false,
  error: false,
  products: false,
  paging: ENUM_PAGGING,
  page: 1,
  sort_type: 'price',
  type_list: '',
  sort_position: '',
  search: '',
  nft_convert: '',
  organization: 'SKYGATE'
};

/* eslint-disable default-case, no-param-reassign */
const nftReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case NFT_LOAD:
        draft.loading = true;
        draft.error = false;
        draft.products = false;
        draft.paging = ENUM_PAGGING;
        break;

      case NFT_LOAD_SUCCESS:
        draft.products = action.products;
        draft.paging = action.paging;
        draft.loading = false;
        break;

      case NFT_LOAD_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case NFT_CHANGE_PAGE:
        draft.page = action.page;
        break;

      case NFT_SORT_POSITION:
        draft.sort_position = action.sort_position;
        break;

      case NFT_SORT_TYPELIST:
        draft.type_list = action.type_list;
        break;

      case NFT_SEARCH:
        draft.search = action.search;
        break;

      case NFT_CHANGE_NFT_CONVERT:
        draft.nft_convert = action.id;
        break;

      case NFT_CHANGE_ORGANIZATION:
        draft.organization = action.organization;
        break;
    }
  });

export default nftReducer;
