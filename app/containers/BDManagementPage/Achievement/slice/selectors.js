import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = state => state.Achievement || initialState;
const makeSelectLoading = () =>
  createSelector(
    selectState,
    State => State.loading,
  );
const makeSelectData = () =>
  createSelector(
    selectState,
    State => State.data,
  );

const makeSelectError = () =>
  createSelector(
    selectState,
    State => State.error,
  );
export { makeSelectLoading, makeSelectError, makeSelectData };
