import {
  NFT_LOAD, NFT_LOAD_SUCCESS, NFT_LOAD_ERROR,
  NFT_CHANGE_PAGE, NFT_SEARCH, NFT_SORT_TYPELIST, NFT_SORT_POSITION, NFT_CHANGE_NFT_CONVERT,
  NFT_CHANGE_ORGANIZATION
} from './constants';

export function loadNFT() {
  return {
    type: NFT_LOAD,
  };
}

export function loadNFTSuccess(products, paging) {
  return {
    type: NFT_LOAD_SUCCESS,
    products,
    paging
  };
}

export function loadNFTError(error) {
  return {
    type: NFT_LOAD_ERROR,
    error,
  };
}

export function changeNFTPage(page) {
  return {
    type: NFT_CHANGE_PAGE,
    page,
  };
}

export function searchNFT(search) {
  return {
    type: NFT_SEARCH,
    search,
  };
}
export function sortTypeListNFT(type_list) {
  return {
    type: NFT_SORT_TYPELIST,
    type_list,
  };
}
export function sortPositionNFT(sort_position) {
  return {
    type: NFT_SORT_POSITION,
    sort_position,
  };
}
export function changeNFTConvertTo(id) {
  return {
    type: NFT_CHANGE_NFT_CONVERT,
    id,
  };
}

export function changeNFTOrganization(organization) {
  return {
    type: NFT_CHANGE_ORGANIZATION,
    organization,
  };
}
