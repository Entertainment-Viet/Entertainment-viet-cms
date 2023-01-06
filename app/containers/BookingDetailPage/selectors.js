import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = state => state.BookingDetailPage || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectState,
    State => State.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectState,
    State => State.error,
  );

const makeSelectData = () =>
  createSelector(
    selectState,
    State => State.data,
  );

export { makeSelectError, makeSelectLoading, makeSelectData };
