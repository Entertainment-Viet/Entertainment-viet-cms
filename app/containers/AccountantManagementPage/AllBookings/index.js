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
import { PDFDownloadLink } from '@react-pdf/renderer';
import { DateTimeCustom } from 'components/Controls';
import { SearchIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import PageSpinner from 'components/PageSpinner';
import SelectCustom from 'components/Controls/SelectCustom';
import PDFView from 'containers/PDFViewer/Accountant';
import {
  PRI_TEXT_COLOR,
  TEXT_GREEN,
  RED_COLOR,
  TEXT_PURPLE,
} from 'constants/styles';
import styled from 'styled-components';
import AdvancedTable from 'components/AdvancedTable';
// import { DateTimeCustom } from 'components/Controls';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { put } from 'utils/request';
// import SelectCustom from 'components/Controls/SelectCustom';
// import { ROUTE_BOOKING_DETAIL_MANAGER } from 'constants/routes';
// import { Link } from 'react-router-dom';
import { API_UPDATE } from '../../../constants/api';
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
  makeSelectEnd,
  makeSelectIsPaid,
  makeSelectStart,
  makeSelectStatus,
  makeSelectFee,
} from './slice/selectors';
import { numberWithCommas } from '../../../utils/helpers';
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
    Header: 'Booking code',
    accessor: 'bookingCode',
  },
  {
    Header: 'Booking date',
    accessor: 'createdAt',
  },
  {
    Header: 'Perform date and time',
    accessor: 'date',
  },
  {
    Header: 'Organizer',
    accessor: 'organizer',
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
    Header: 'Price',
    accessor: 'price',
  },
  {
    Header: '',
    accessor: 'action',
  },
];

const key = 'AllBookings';
const AllBookings = ({
  data,
  paging,
  fee,
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
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const role = urlParams.get('role');
  const entityUid = urlParams.get('uid');
  useEffect(() => {
    if (role) handleRoleChange(role);
    if (entityUid) handleSearchChange(entityUid);
    loadBookings();
  }, []);
  const handleChangeIsPaid = uid => {
    const myId = localStorage.getItem('uid');
    put(
      API_UPDATE,
      {
        isPaid: true,
      },
      myId,
      uid,
    );
  };
  let tableBookings;
  if (data) {
    tableBookings = data.map(booking => ({
      bookingCode: <Text>{booking.bookingCode}</Text>,
      createdAt: (
        <Text>{new Date(booking.createdAt).toLocaleDateString()}</Text>
      ),
      date: (
        <Box>
          <Box sx={{ marginBottom: '5px' }}>
            <Text>
              {new Date(
                booking.jobDetail.performanceStartTime,
              ).toLocaleDateString()}
            </Text>
          </Box>
          <Text>
            {`${new Date(
              booking.jobDetail.performanceStartTime,
            ).getHours()}:${new Date(
              booking.jobDetail.performanceStartTime,
            ).getMinutes()}:${new Date(
              booking.jobDetail.performanceStartTime,
            ).getSeconds()}`}{' '}
            -
            {`${new Date(
              booking.jobDetail.performanceEndTime,
            ).getHours()}:${new Date(
              booking.jobDetail.performanceEndTime,
            ).getMinutes()}:${new Date(
              booking.jobDetail.performanceEndTime,
            ).getSeconds()}`}
          </Text>
        </Box>
      ),
      organizer: <Text>{booking.organizerName}</Text>,
      talent: <Text>{booking.talentName}</Text>,
      status: (
        <StatusCell type={booking.isPaid ? 'active' : 'disable'}>
          {booking.isPaid ? 'Paid' : 'Unpaid'}
        </StatusCell>
      ),
      price: `${numberWithCommas(booking.jobDetail.price.min)}`,
      action: (
        <HStack>
          <Button
            colorScheme="purple"
            size="xs"
            onClick={() => handleChangeIsPaid(booking.uid)}
          >
            {t(messages.done())}
          </Button>
          {/* <Link>
            <Button colorScheme="gray" size="xs">
              {t(messages.detail())}
            </Button>
          </Link> */}
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
    <>
      {!data ? (
        <PageSpinner />
      ) : (
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
                  placeholder="Status"
                  isSearchable
                  onChange={val => handleStatusChange(val.target.value)}
                >
                  <option value="talent">Talent</option>
                  <option value="organizer">Company</option>
                </SelectCustom>
              </Box>
              <Box>
                <SelectCustom
                  placeholder="isPaid"
                  isSearchable
                  onChange={val => handleIspaidChange(val.target.value)}
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
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
              <PDFDownloadLink
                document={<PDFView bookings={data} fee={fee} />}
                fileName="test.pdf"
              >
                {({ loading }) =>
                  loading ? 'Loading document...' : 'Download now!'
                }
              </PDFDownloadLink>
            </HStack>
          </Box>

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
        </Box>
      )}
    </>
  );
};

AllBookings.propTypes = {
  match: PropTypes.object,
  fee: PropTypes.object,
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
  fee: makeSelectFee(),
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
)(AllBookings);
