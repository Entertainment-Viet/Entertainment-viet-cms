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

// import { loadNFTFilter } from 'containers/NFTFilterProvider/actions';

// import { isAuthor } from 'utils/auth';

// import { InputCustom, SelectCustom, ButtonCustom } from 'components/Controls';

import {} from 'constants/routes';
import {} from './styles';

import {} from './actions';
import saga from './saga';
import reducer from './reducer';
import { makeSelectPaging } from './selectors';

const key = 'SearchResultPage';
export function SearchResultPage({ handlePageChange }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {}, []);

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

  const paging = {
    total: 56,
    page: 2,
    limit: 15,
  };

  return (
    <div style={{ width: '100%' }}>
      <Metadata />
      <H1>Result for "blablabla"</H1>
      <SimpleGrid columns={3} spacing={2} maxW="50%">
        <Box>
          <Select placeholder="Select option" color="black" bg="white">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </Box>
        <Box>
          <Select placeholder="Select option" color="black" bg="white">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </Box>
        <Box>
          <Select placeholder="Select option" color="black" bg="white">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </Box>
      </SimpleGrid>
      <Box color={SEC_TEXT_COLOR} my="6">
        300 results found
      </Box>
      <Container maxW="100%" centerContent>
        <SimpleGrid maxW="100%" columns={[1, 3, 5]} spacing="50px">
          {SlideData.map(function(data) {
            const { id } = data;
            return <Card key={id} />;
          })}
        </SimpleGrid>
      </Container>
      <Pagination {...paging} onPageChange={handlePageChange} />
    </div>
  );
}

SearchResultPage.propTypes = {
  paging: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  handlePageChange: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  paging: makeSelectPaging(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handlePageChange: page => {
      dispatch();
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
