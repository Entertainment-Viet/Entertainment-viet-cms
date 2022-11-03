import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = state => state.BookingDetail || initialState;

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
};
