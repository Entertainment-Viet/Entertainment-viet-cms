import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = state => state.ManagementPage || initialState;

const makeSelectDetailLoading = () =>
  createSelector(
    selectState,
    State => State.loading,
  );
const makeSelectPage = () =>
  createSelector(
    selectState,
    State => State.paging,
  );

const makeSelectDetailError = () =>
  createSelector(
    selectState,
    State => State.error,
  );

const makeSelectDetail = () =>
  createSelector(
    selectState,
    State => State.data,
  );

const makeSelectPackage = () =>
  createSelector(
    selectState,
    State => State.packageId,
  );

export {
  makeSelectDetailLoading,
  makeSelectDetailError,
  makeSelectDetail,
  makeSelectPage,
  makeSelectPackage,
};
