import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectNFT = state => state.NFT || initialState;

const makeSelectNFTLoading = () =>
  createSelector(
    selectNFT,
    NFTState => NFTState.loading,
  );

const makeSelectNFTError = () =>
  createSelector(
    selectNFT,
    NFTState => NFTState.error,
  );

const makeSelectNFT = () =>
  createSelector(
    selectNFT,
    NFTState => NFTState.products,
  );

const makeSelectNFTPaging = () =>
  createSelector(
    selectNFT,
    NFTState => NFTState.paging,
  );

const makeSelectNFTPage = () =>
  createSelector(
    selectNFT,
    NFTState => NFTState.page,
  );

const makeSelectNFTCategories = () =>
  createSelector(
    selectNFT,
    NFTState => NFTState.categories,
  );

const makeSelectNFTSearch = () =>
  createSelector(
    selectNFT,
    NFTState => NFTState.search,
  );

const makeSelectNFTSortType = () =>
  createSelector(
    selectNFT,
    NFTState => NFTState.sort_type,
  );

const makeSelectNFTSortTypeList = () =>
  createSelector(
    selectNFT,
    NFTState => NFTState.type_list,
  );

const makeSelectNFTSortPosition = () =>
  createSelector(
    selectNFT,
    NFTState => NFTState.sort_position,
  );
const makeSelectNFTToConvert = () =>
  createSelector(
    selectNFT,
    NFTState => NFTState.nft_convert,
  );

const makeSelectNFTOrganization = () =>
  createSelector(
    selectNFT,
    NFTState => NFTState.organization,
  );
  
export {
  selectNFT,
  makeSelectNFT,
  makeSelectNFTLoading,
  makeSelectNFTError,
  makeSelectNFTPaging,
  makeSelectNFTPage,
  makeSelectNFTSearch,
  makeSelectNFTSortType,
  makeSelectNFTSortTypeList,
  makeSelectNFTSortPosition,
  makeSelectNFTToConvert,
  makeSelectNFTOrganization
};

