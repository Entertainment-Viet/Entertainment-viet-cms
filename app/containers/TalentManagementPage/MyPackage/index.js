import React, { memo } from 'react';
import {
  Container,
  VStack,
  HStack,
  Text,
  Flex,
  Box,
  Link,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import MyTable from 'components/Table';
import PageSpinner from 'components/PageSpinner';
import { PRI_TEXT_COLOR } from 'constants/styles';
import styled from 'styled-components';

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
        return 'white';
    }
  }};
`;
const packageColumns = [
  {
    Header: 'Ngày đặt',
    accessor: 'bookedDate',
  },
  {
    Header: 'Ngày biểu diễn',
    accessor: 'performDate',
  },
  {
    Header: 'Package',
    accessor: 'package',
  },
  {
    Header: 'Người đặt',
    accessor: 'booker',
  },
  {
    Header: 'Giá tiền',
    accessor: 'price',
  },
];
const bookingColumns = [
  {
    Header: 'Ngày đặt',
    accessor: 'bookedDate',
  },
  {
    Header: 'Người đặt',
    accessor: 'booker',
  },
  {
    Header: 'Giá tiền min',
    accessor: 'priceMin',
  },
  {
    Header: 'Giá tiền max',
    accessor: 'priceMax',
  },
  {
    Header: 'STATUS',
    accessor: 'status',
  },
];
const MyPackage = ({ data, mode }) => {
  let tablePackage;
  let tableBooking;
  if (data) {
    if (mode === 0)
      tablePackage = data.content.map(user => ({
        bookedDate: (
          <Flex align="center">
            {/* <Avatar name={user.name} src={user.avatar_url} size="sm" mr="4" /> */}
            <Text>{user.bookedDate}</Text>
          </Flex>
        ),
        performDate: user.performanceTime,
        package: (
          <Text
            onClick={() => {
              handleModeChange(1);
              onLoadData(user.uid);
            }}
          >
            {user.name}
          </Text>
        ),
        booker: user.booker,
        price: user.price,
        // status: <StatusCell type={user.status}>{user.status}</StatusCell>,
      }));
    else
      tableBooking = data.content.map(booking => {
        const { jobDetail } = booking;
        return {
          bookedDate: (
            <Flex align="center">
              {/* <Avatar name={user.name} src={user.avatar_url} size="sm" mr="4" /> */}
              <Link href={`/booking/${booking.uid}`}>
                <Text>{booking.createdAt}</Text>
              </Link>
            </Flex>
          ),
          booker: booking.booker.displayName,
          priceMin: jobDetail.price.min,
          priceMax: jobDetail.price.max,
          status: (
            <StatusCell type={booking.status}>{booking.status}</StatusCell>
          ),
          // action: (
          //   <Button
          //     colorScheme="gray"
          //     onClick={() => console.log('remove user!')}
          //     size="sm"
          //   >
          //     <Icon as={FiTrash2} fontSize="20" />
          //   </Button>
          // ),
        };
      });
  }
  const { t } = useTranslation();
  return (
    <Box color={PRI_TEXT_COLOR}>
      {!data ? (
        <PageSpinner />
      ) : (
        <MyTable
          data={mode === 0 ? tablePackage : tableBooking}
          title="Quản lý đơn đặt dịch vụ"
          columns={mode === 0 ? packageColumns : bookingColumns}
        />
      )}
    </Box>
  );
};

MyPackage.propTypes = {
  match: PropTypes.object,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  mode: PropTypes.number,
};
export default memo(MyPackage);
