import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = state => state.AllBookings || initialState;

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

const makeSelectDetailError = () =>
  createSelector(
    selectState,
    State => State.error,
  );

const makeSelectPaging = () =>
  createSelector(
    selectState,
    State => State.paging,
  );

const makeSelectData = () =>
  createSelector(
    selectState,
    State => State.data,
  );
const makeSelectSearch = () =>
  createSelector(
    selectState,
    State => State.search,
  );
const makeSelectStart = () =>
  createSelector(
    selectState,
    State => State.start,
  );
const makeSelectEnd = () =>
  createSelector(
    selectState,
    State => State.end,
  );

const makeSelectStatus = () =>
  createSelector(
    selectState,
    State => State.status,
  );
const makeSelectIsPaid = () =>
  createSelector(
    selectState,
    State => State.isPaid,
  );
const makeSelectRole = () =>
  createSelector(
    selectState,
    State => State.role,
  );

export {
  makeSelectDetailLoading,
  makeSelectDetailError,
  makeSelectPage,
  makeSelectPaging,
  makeSelectLimit,
  makeSelectData,
  makeSelectSearch,
  makeSelectEnd,
  makeSelectStart,
  makeSelectIsPaid,
  makeSelectStatus,
  makeSelectRole,
};
