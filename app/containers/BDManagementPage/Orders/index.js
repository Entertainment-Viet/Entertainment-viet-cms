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
import {
  PRI_TEXT_COLOR,
  TEXT_GREEN,
  RED_COLOR,
  TEXT_PURPLE,
} from 'constants/styles';
import styled from 'styled-components';
import AdvancedTable from 'components/AdvancedTable';
import { DateTimeCustom } from 'components/Controls';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import SelectCustom from 'components/Controls/SelectCustom';
// import { ROUTE_BOOKING_DETAIL_MANAGER } from 'constants/routes';
import { Link } from 'react-router-dom';
import { messages } from '../messages';
import {
  changePage,
  changeLimit,
  loadBookings,
  changeEnd,
  changeIspaid,
  changeSearch,
  changeStart,
  changeStatus,
  changeRole,
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
  makeSelectEnd,
  makeSelectIsPaid,
  makeSelectStart,
  makeSelectStatus,
  makeSelectRole,
} from './slice/selectors';
import { ENUM_BOOKING_STATUS } from '../../../constants/enums';
import { handleAddress, convertReadableTime } from '../../../utils/helpers';
// import { numberWithCommas } from '../../../utils/helpers';
const StatusCell = styled(Text)`
  text-align: center;
  padding: 5px;
  background: ${props => {
    switch (props.type) {
      case 'UPCOMING':
        return '#00C2FF';
      case 'waiting':
        return '#999999';
      case 'booking.status.talent-pending':
        return '#DBB325';
      case 'booking.status.organizer-pending':
        return '#DBB325';
      case 'pendingTransaction':
        return '#4527A0';
      case 'request-user':
        return 'rgb(225 29 72)';
      default:
        return 'transparent';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'disable':
        return `${RED_COLOR}!important`;
      case 'active':
        return `${TEXT_GREEN}!important`;
      default:
        return 'black !important';
    }
  }};
`;
const bookingsColumns = [
  {
    Header: 'Confirm At',
    accessor: 'confirmAt',
  },
  {
    Header: 'Perform date',
    accessor: 'performDate',
  },
  {
    Header: 'Location',
    accessor: 'location',
  },
  {
    Header: 'Organizer',
    accessor: 'org',
  },
  {
    Header: 'Talent',
    accessor: 'talent',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Is paid',
    accessor: 'paid',
  },
  {
    Header: '',
    accessor: 'actions',
  },
];

const key = 'AllBookings';
const AllBookings = ({
  data,
  paging,
  handlePageChange,
  handleLimitChange,
  // eslint-disable-next-line no-shadow
  loadBookings,
  handleSearchChange,
  handleStartChange,
  handleEndChange,
  handleStatusChange,
  handleIspaidChange,
  handleRoleChange,
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
      confirmAt: <Text>{booking.confirmedAt}</Text>,
      performDate: (
        <Text>
          {convertReadableTime(booking.jobDetail.performanceStartTime)}-
          {convertReadableTime(booking.jobDetail.performanceEndTime)}
        </Text>
      ),
      location: <Text>{handleAddress(booking.jobDetail.location)}</Text>,
      org: <Text>{booking.organizerName}</Text>,
      talent: <Text>{booking.talentName}</Text>,
      paid: <Text>{booking.isPaid.toString()}</Text>,
      status: <Text>{booking.status}</Text>,
      actions: (
        <HStack>
          <Link to="#">
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
        <HStack gap={4}>
          <InputGroup w="50%">
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
          <Box>
            <SelectCustom
              placeholder="Role"
              isSearchable
              onChange={val => handleRoleChange(val.target.value)}
            >
              <option value="talent">Talent</option>
              <option value="organizer">Company</option>
            </SelectCustom>
          </Box>
          <Box>
            <SelectCustom
              placeholder="Status"
              isSearchable
              onChange={val => handleStatusChange(val.target.value)}
            >
              <option value={ENUM_BOOKING_STATUS.TALENT_PENDING}>
                Talent pending
              </option>
              <option value={ENUM_BOOKING_STATUS.ORG_PENDING}>
                Org pending
              </option>
              <option value={ENUM_BOOKING_STATUS.CONFIRMED}>Confirmed</option>
              <option value={ENUM_BOOKING_STATUS.CANCELLED}>Cancelled</option>
              <option value={ENUM_BOOKING_STATUS.FINISHED}>Finished</option>
            </SelectCustom>
          </Box>
          <Box>
            <SelectCustom
              placeholder="Ispaid"
              isSearchable
              onChange={val => handleIspaidChange(val.target.value)}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </SelectCustom>
          </Box>
          <Text>Start time</Text>
          <Box>
            <DateTimeCustom
              template="datetime-picker right"
              name="end_vip_date"
              type="hm"
              message="Start date"
              handleDateChange={handleStartChange}
            />
          </Box>
          <Text>End time</Text>
          <Box>
            <DateTimeCustom
              template="datetime-picker right"
              name="end_vip_date"
              type="hm"
              message="End date"
              handleDateChange={handleEndChange}
            />
          </Box>
        </HStack>
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

AllBookings.propTypes = {
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
  isPaid: makeSelectIsPaid(),
  status: makeSelectStatus(),
  start: makeSelectStart(),
  end: makeSelectEnd(),
  role: makeSelectRole(),
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
    handleRoleChange: role => {
      dispatch(changeRole(role));
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
)(AllBookings);
