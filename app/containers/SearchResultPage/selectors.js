import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = state => state.SearchResultPage || initialState;

const makeSelectPage = () =>
  createSelector(
    selectState,
    NewsState => NewsState.page,
  );

const makeSelectDataLoading = () =>
  createSelector(
    selectState,
    State => State.loading,
  );

const makeSelectDataError = () =>
  createSelector(
    selectState,
    State => State.error,
  );

const makeSelectData = () =>
  createSelector(
    selectState,
    State => State.data,
  );
const makeSelectPaging = () =>
  createSelector(
    selectState,
    State => State.page,
  );
const makeSelectSearch = () =>
  createSelector(
    selectState,
    State => State.search,
  );
const makeSelectCategory = () =>
  createSelector(
    selectState,
    State => State.category,
  );
const makeSelectCity = () =>
  createSelector(
    selectState,
    State => State.city,
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
const makeSelectBudget = () =>
  createSelector(
    selectState,
    State => State.budget,
  );

export {
  makeSelectDataLoading,
  makeSelectDataError,
  makeSelectData,
  makeSelectPaging,
  makeSelectPage,
  makeSelectSearch,
  makeSelectCategory,
  makeSelectCity,
  makeSelectBudget,
  makeSelectStart,
  makeSelectEnd,
};
