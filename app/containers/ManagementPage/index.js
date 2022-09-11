import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import { Box, Flex, Text } from '@chakra-ui/react';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import MyTable from 'components/Table';
import { PRI_TEXT_COLOR } from 'constants/styles';
// import { loadNFTFilter } from 'containers/NFTFilterProvider/actions';

// import { isAuthor } from 'utils/auth';

// import { InputCustom, SelectCustom, ButtonCustom } from 'components/Controls';
import styled from 'styled-components';
import {} from 'constants/routes';
import {} from './styles';
import PageSpinner from 'components/PageSpinner';
import { messages } from './messages';

import { changePage, loadPackages, loadBookingPackages } from './actions';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectDetailLoading,
  makeSelectDetailError,
  makeSelectDetail,
  makeSelectPackage,
} from './selectors';
// import { propTypes } from 'qrcode.react';

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
const key = 'ManagementPage';
export function ManagementPage({
  loading,
  error,
  data,
  onLoadData,
  packageId,
  handlePackageChange,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

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

  useEffect(() => {
    onLoadData();
  }, []);
  const { t } = useTranslation();

  return (
    <Box color={PRI_TEXT_COLOR}>
      {!data ? (
        <PageSpinner />
      ) : (
        <MyTable
          data={tableData}
          title="List of packages"
          columns={tableColumns}
        />
      )}
    </Box>
  );
}

ManagementPage.propTypes = {
  onLoadData: PropTypes.func,
  handlePackageChange: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  packageId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectDetailLoading(),
  error: makeSelectDetailError(),
  data: makeSelectDetail(),
  packageId: makeSelectPackage(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () => {
      dispatch(loadPackages());
    },
    handlePageChange: page => {
      dispatch(changePage(page));
      dispatch(loadPackages());
    },
    handlePackageChange: id => {
      dispatch(loadBookingPackages(id));
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
)(ManagementPage);
