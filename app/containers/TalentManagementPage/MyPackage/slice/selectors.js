import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = state => state.MyPackage || initialState;

const makeSelectDetailLoading = () =>
  createSelector(
    selectState,
    State => State.loading,
  );
const makeSelectPage = () =>
  createSelector(
    selectState,
    State => State.page,
  );

const makeSelectLimit = () =>
  createSelector(
    selectState,
    State => State.limit,
  );

const makeSelectMode = () =>
  createSelector(
    selectState,
    State => State.mode,
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

const makeSelectPaging = () =>
  createSelector(
    selectState,
    State => State.paging,
  );

const makeSelectPackageInfo = () =>
  createSelector(
    selectState,
    State => State.packageInfo,
  );
export {
  makeSelectDetailLoading,
  makeSelectDetailError,
  makeSelectDetail,
  makeSelectPage,
  makeSelectPackage,
  makeSelectMode,
  makeSelectPaging,
  makeSelectLimit,
  makeSelectPackageInfo,
};
