import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = state => state.ArtistDetailPage || initialState;

const makeSelectNFTLoading = () =>
  createSelector(
    selectState,
    State => State.loading,
  );

const makeSelectNFTError = () =>
  createSelector(
    selectState,
    State => State.error,
  );

const makeSelectData = () =>
  createSelector(
    selectState,
    State => State.data,
  );

const makeSelectPackages = () =>
  createSelector(
    selectState,
    State => State.packages,
  );

const makeSelectId = () =>
  createSelector(
    selectState,
    State => State.id,
  );

export {
  makeSelectData,
  makeSelectNFTError,
  makeSelectNFTLoading,
  makeSelectId,
  makeSelectPackages,
};
