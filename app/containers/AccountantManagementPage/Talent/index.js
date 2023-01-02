import React, { memo, useEffect } from 'react';
import {
  HStack,
  Text,
  Flex,
  Box,
  Button,
  InputGroup,
  Input,
  InputLeftElement,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import PageSpinner from 'components/PageSpinner';
import { PRI_TEXT_COLOR, TEXT_PURPLE } from 'constants/styles';
import { ROUTE_ACC_HOME } from 'constants/routes';
import AdvancedTable from 'components/AdvancedTable';
// import { DateTimeCustom } from 'components/Controls';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
// import SelectCustom from 'components/Controls/SelectCustom';
// import { ROUTE_BOOKING_DETAIL_MANAGER } from 'constants/routes';
import { Link } from 'react-router-dom';
import { messages } from '../messages';
import {
  changePage,
  changeLimit,
  loadBookings,
  changeEnd,
  changeIspaid,
  changeRole,
  changeSearch,
  changeStart,
  changeStatus,
} from './slice/actions';
import saga from './slice/saga';
import reducer from './slice/reducer';
import {
  makeSelectDetailLoading,
  makeSelectDetailError,
  makeSelectPaging,
  makeSelectData,
  makeSelectPage,
  makeSelectLimit,
  makeSelectSearch,
} from './slice/selectors';
// import { numberWithCommas } from '../../../utils/helpers';
const bookingsColumns = [
  {
    Header: 'Tên',
    accessor: 'name',
  },
  {
    Header: 'Liên hệ',
    accessor: 'contact',
  },
  {
    Header: 'Số điện thoại',
    accessor: 'phone',
  },
  {
    Header: 'Công ty',
    accessor: 'company',
  },
  {
    Header: '',
    accessor: 'actions',
  },
];

const key = 'Talent';
const Talent = ({
  data,
  paging,
  handlePageChange,
  handleLimitChange,
  // eslint-disable-next-line no-shadow
  loadBookings,
  handleSearchChange,
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { t } = useTranslation();

  useEffect(() => {
    loadBookings();
  }, []);

  let tableBookings;
  if (data) {
    tableBookings = data.map(booking => ({
      name: <Text>{booking.displayName}</Text>,
      contact: <Text>{booking.email}</Text>,
      phone: <Text>{booking.phoneNumber}</Text>,
      company: <Text>{booking.companyName}</Text>,
      actions: (
        <HStack>
          <Link to={`${ROUTE_ACC_HOME}/?role=talent&uid=${booking.uid}`}>
            <Button colorScheme="red" size="xs">
              {t(messages.detail())}
            </Button>
          </Link>
        </HStack>
      ),
    }));
  }
  const pageProps = {
    pageNumber: paging.pageNumber, // pageNumber
    limit: paging.pageSize, // pageSize
    isLast: paging.last,
  };

  return (
    <Box color={PRI_TEXT_COLOR}>
      <Box
        display="d-flex"
        justifyContent="space-between"
        sx={{
          marginBottom: '20px',
        }}
      >
        {/* <HStack gap={4}> */}
        <InputGroup w="100%">
          <Input
            // value={searchTerm}
            onChange={e => handleSearchChange(e.target.value)}
            bg="transparent"
            placeholder="Search"
            _placeholder={{ opacity: 1, color: `${TEXT_PURPLE}` }}
            border={`1px solid ${TEXT_PURPLE}`}
            borderRadius="2rem"
          />
          <InputLeftElement>
            <SearchIcon color={TEXT_PURPLE} />
          </InputLeftElement>
        </InputGroup>
        {/* </HStack> */}
      </Box>
      {!data ? (
        <PageSpinner />
      ) : (
        <Flex zIndex={1} position="relative" gap={4}>
          <Box w="100%" flexGrow={1}>
            <AdvancedTable
              columns={bookingsColumns}
              data={tableBookings || []}
              {...pageProps}
              handlePageChange={handlePageChange}
              setLimit={handleLimitChange}
            />
          </Box>
        </Flex>
      )}
    </Box>
  );
};

Talent.propTypes = {
  match: PropTypes.object,
  paging: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  handlePageChange: PropTypes.func,
  handleLimitChange: PropTypes.func,
  handleSearchChange: PropTypes.func,
  handleStartChange: PropTypes.func,
  handleEndChange: PropTypes.func,
  handleRoleChange: PropTypes.func,
  handleStatusChange: PropTypes.func,
  handleIspaidChange: PropTypes.func,
  loadBookings: PropTypes.func,
  bookings: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    PropTypes.array,
  ]),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  unpaidSum: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectDetailLoading(),
  error: makeSelectDetailError(),
  paging: makeSelectPaging(),
  data: makeSelectData(),
  page: makeSelectPage(),
  limit: makeSelectLimit(),
  search: makeSelectSearch(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handlePageChange: page => {
      dispatch(changePage(page));
      dispatch(loadBookings());
    },
    handleLimitChange: limit => {
      dispatch(changeLimit(limit));
      dispatch(loadBookings());
    },
    handleRoleChange: role => {
      dispatch(changeRole(role));
      dispatch();
    },
    handleStatusChange: stt => {
      dispatch(changeStatus(stt));
      dispatch(loadBookings());
    },
    handleSearchChange: search => {
      dispatch(changeSearch(search));
      dispatch(loadBookings());
    },
    handleStartChange: start => {
      dispatch(changeStart(start));
      dispatch(loadBookings());
    },
    handleEndChange: end => {
      dispatch(changeEnd(end));
      dispatch(loadBookings());
    },
    handleIspaidChange: isPaid => {
      dispatch(changeIspaid(isPaid));
      dispatch(loadBookings());
    },
    loadBookings: () => {
      dispatch(loadBookings());
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
)(Talent);
