import * as React from 'react';

// Use Chakra Ui for create a custom component for display field data in table
import {
  Flex,
  Avatar,
  Text,
  Box,
  Icon,
  Button,
  Heading,
} from '@chakra-ui/react';

// Recommended for icons
import { FiTrash2, FiUser } from 'react-icons/fi';

import { Table } from 'react-chakra-pagination';
import './styles.css';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';

const Cell = styled.td`
  padding: 12px 10px;
  max-width: 180px;
  font-size: 12px;
  text-align: left;
`;
const StatusCell = styled(Text)`
  text-align: center;
  padding: 5px;
  background: ${props => {
    switch (props.type) {
      case 'UPCOMING':
        return '#00C2FF';
      case 'waiting':
        return '#999999';
      case 'pending':
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
const users = [
  {
    id: 1,
    bookedDate: new Date().toDateString(),
    performDate: new Date().toDateString(),
    package: 'Cơ bản',
    booker: 'Nguyễn Văn A',
    price: '3.000.000 VND',
    status: 'UPCOMING',
  },
  {
    id: 1,
    bookedDate: new Date().toDateString(),
    performDate: new Date().toDateString(),
    package: 'Cơ bản',
    booker: 'Nguyễn Văn A',
    price: '3.000.000 VND',
    status: 'UPCOMING',
  },
];

export default function MyTable() {
  // Control current Page
  const [page, setPage] = React.useState(1);
  const { t } = useTranslation();

  // Formatter for each user
  const tableData = users.map(user => ({
    bookedDate: (
      <Flex align="center">
        {/* <Avatar name={user.name} src={user.avatar_url} size="sm" mr="4" /> */}
        <Text>{user.bookedDate}</Text>
      </Flex>
    ),
    performDate: user.performDate,
    package: user.package,
    booker: user.booker,
    price: user.price,
    status: <StatusCell type={user.status}>{user.status}</StatusCell>,
    // status: user.status,
    // action: (
    //   <Button
    //     colorScheme="gray"
    //     onClick={() => console.log('remove user!')}
    //     size="sm"
    //   >
    //     <Icon as={FiTrash2} fontSize="20" />
    //   </Button>
    // ),
  }));

  // Accessor to get a data in user object
  const tableColumns = [
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
    {
      Header: 'STATUS',
      accessor: 'status',
    },
  ];

  return (
    <Box p="12">
      <Heading size="sm" as="h3">
        List of Users
      </Heading>

      <Box mt="6">
        <Table
          colorScheme="blue"
          // Fallback component when list is empty
          emptyData={{
            icon: FiUser,
            text: 'Nobody is registered here.',
          }}
          totalRegisters={users.length}
          page={page}
          // Listen change page event and control the current page using state
          onPageChange={page => setPage(page)}
          columns={tableColumns}
          data={tableData}
          styles={{ border: '1px solid' }}
        />
      </Box>
    </Box>
  );
}
