/*
 * NFTPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  Container,
  Box,
  HStack,
  Divider,
  SimpleGrid,
  Select,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { ImageSlider } from 'components/Carousel';
import Buttons from 'components/Buttons';
import Metadata from 'components/Metadata';
import { PRI_TEXT_COLOR, SEC_TEXT_COLOR } from 'constants/styles';
import { Card } from 'components/Cards';
import { H1 } from 'components/Elements';
import Pagination from 'components/Pagination';
import { DateTimeCustom } from 'components/Controls';

// import { loadNFTFilter } from 'containers/NFTFilterProvider/actions';

// import { isAuthor } from 'utils/auth';

// import { InputCustom, SelectCustom, ButtonCustom } from 'components/Controls';

import {} from 'constants/routes';
import {} from './styles';

import {
  loadData,
  changePage,
  changeCity,
  changeBudget,
  changeStart,
  changeEnd,
  changeCategory,
  changeSearch,
} from './actions';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectPaging,
  makeSelectDataLoading,
  makeSelectDataError,
  makeSelectData,
  makeSelectPage,
  makeSelectSearch,
  makeSelectBudget,
  makeSelectCategory,
  makeSelectCity,
  makeSelectStart,
  makeSelectEnd,
} from './selectors';

const key = 'SearchResultPage';
export function SearchResultPage({
  page,
  paging,
  loading,
  data,
  error,
  handlePageChange,
  handleCategoryChange,
  handleCityChange,
  handleBudgetChange,
  handleSearchChange,
  handleStartChange,
  handleEndChange,
  onLoadData,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const search = urlParams.get('search');
  const category = urlParams.get('category');
  useEffect(() => {
    if (category) handleCategoryChange(category);
    else if (search) handleSearchChange(search);
    else onLoadData();
  }, []);

  const SlideData = [
    {
      id: '1',
    },
    {
      id: '1',
    },
    {
      id: '1',
    },
    {
      id: '1',
    },
    {
      id: '1',
    },
    {
      id: '1',
    },
    {
      id: '1',
    },
    {
      id: '1',
    },
    {
      id: '1',
    },
    {
      id: '1',
    },
  ];

  const pageProps = paging || {
    total: 0,
    page,
    limit: 5,
  };

  return (
    <div style={{ width: '100%' }}>
      <Metadata />
      <H1>Result for "blablabla"</H1>
      <SimpleGrid columns={5} spacing={2} maxW="100%">
        <Box>
          <Select
            isSearchable
            placeholder="Categories"
            color="black"
            bg="white"
            onChange={val => handleCategoryChange(val.target.value)}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </Box>
        <Box>
          <Select
            isSearchable
            placeholder="City"
            color="black"
            bg="white"
            onChange={val => handleCityChange(val.target.value)}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </Box>
        <Box>
          <NumberInput
            color="black"
            bg="white"
            onChange={val => handleBudgetChange(val)}
          >
            <NumberInputField placeholder="Budget" />
          </NumberInput>
        </Box>
        <Box>
          <DateTimeCustom
            template="datetime-picker right"
            name="end_vip_date"
            type="hm"
            message="Start date"
            handleDateChange={handleStartChange}
          />
        </Box>
        <Box>
          <DateTimeCustom
            template="datetime-picker right"
            name="end_vip_date"
            type="hm"
            message="End date"
            handleDateChange={handleEndChange}
          />
        </Box>
      </SimpleGrid>
      <Box color={SEC_TEXT_COLOR} my="6">
        300 results found
      </Box>
      <Container maxW="100%" centerContent>
        <SimpleGrid maxW="100%" columns={[1, 3, 5]} spacing="50px">
          {SlideData.map(function(tempt) {
            const { id } = tempt;
            return <Card key={id} />;
          })}
        </SimpleGrid>
      </Container>
      <Pagination {...pageProps} onPageChange={handlePageChange} />
    </div>
  );
}

SearchResultPage.propTypes = {
  paging: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  handlePageChange: PropTypes.func,
  handleCategoryChange: PropTypes.func,
  handleCityChange: PropTypes.func,
  handleBudgetChange: PropTypes.func,
  handleSearchChange: PropTypes.func,
  handleStartChange: PropTypes.func,
  handleEndChange: PropTypes.func,
  onLoadData: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  page: PropTypes.number,
  search: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  category: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  city: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  budget: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  start: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  end: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  paging: makeSelectPaging(),
  loading: makeSelectDataLoading(),
  error: makeSelectDataError(),
  data: makeSelectData(),
  page: makeSelectPage(),
  search: makeSelectSearch(),
  category: makeSelectCategory(),
  city: makeSelectCity(),
  budget: makeSelectBudget(),
  start: makeSelectStart(),
  end: makeSelectEnd(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handlePageChange: page => {
      dispatch(changePage(page));
      dispatch(loadData());
    },
    handleSearchChange: search => {
      dispatch(changeSearch(search));
      dispatch(loadData());
    },
    handleCityChange: city => {
      dispatch(changeCity(city));
      dispatch(loadData());
    },
    handleBudgetChange: budget => {
      dispatch(changeBudget(budget));
      dispatch(loadData());
    },
    handleStartChange: start => {
      dispatch(changeStart(start));
      dispatch(loadData());
    },
    handleEndChange: end => {
      dispatch(changeEnd(end));
      dispatch(loadData());
    },
    handleCategoryChange: category => {
      dispatch(changeCategory(category));
      dispatch(loadData());
    },
    onLoadData: category => {
      dispatch(loadData(category));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SearchResultPage);
