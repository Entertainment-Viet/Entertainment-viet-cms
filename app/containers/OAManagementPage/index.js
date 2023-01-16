import React, { memo, useEffect, useState } from 'react';
import { HStack, Text, Flex, Box, Button, Link } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import PageSpinner from 'components/PageSpinner';
import {
  PRI_TEXT_COLOR,
  TEXT_GREEN,
  RED_COLOR,
  LIGHT_BLUE,
  TEXT_PURPLE,
} from 'constants/styles';
import styled from 'styled-components';
import AdvancedTable from 'components/AdvancedTable';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import InputCustomV2 from '../../components/Controls/InputCustomV2';
import { messages } from './messages';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectData,
  makeSelectDetailError,
  makeSelectDetailLoading,
  makeSelectPaging,
} from './selectors';
import { changeLimit, changePage, loadData, changeName } from './actions';
import { H1 } from '../../components/Elements';
import { globalMessages } from '../App/globalMessage';
const StatusCell = styled(Text)`
  text-align: center;
  padding: 5px;
  color: ${props => {
    switch (props.type) {
      case 'user.state.guest':
        return `${TEXT_PURPLE}!important`;
      case 'user.state.pending':
        return `${LIGHT_BLUE}!important`;
      case 'user.state.verified':
        return `${TEXT_GREEN}!important`;
      case 'user.state.unverified':
        return `${TEXT_PURPLE}!important`;
      case 'user.state.chargeable':
        return `${TEXT_PURPLE}!important`;
      case 'user.state.archived':
        return `${RED_COLOR}!important`;
      default:
        return 'black !important';
    }
  }};
`;

const talentColumns = [
  {
    Header: 'Tên',
    accessor: 'displayName',
  },
  {
    Header: 'Position',
    accessor: 'position',
  },
  {
    Header: 'Gmail',
    accessor: 'gmail',
  },
  {
    Header: 'SĐT',
    accessor: 'phoneNumber',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Thao tác',
    accessor: 'action',
  },
];

const organizerColumns = [
  {
    Header: 'Tên',
    accessor: 'displayName',
  },
  {
    Header: 'Người đại diện',
    accessor: 'representative',
  },
  {
    Header: 'Gmail',
    accessor: 'gmail',
  },
  {
    Header: 'SĐT',
    accessor: 'phoneNumber',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Thao tác',
    accessor: 'action',
  },
];

const key = 'OAManagementPage';
const OAManagementPage = ({
  data,
  paging,
  handlePageChange,
  handleLimitChange,
  // eslint-disable-next-line no-shadow
  loadData,
  handleNameChange,
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const [dataColumns, setDataColumns] = useState(talentColumns);
  // eslint-disable-next-line no-console

  useEffect(() => {
    const isGetDataTalent = active === 0;
    loadData(isGetDataTalent);
  }, [active]);

  useEffect(() => {
    if (active === 0) {
      setDataColumns(talentColumns);
    }
    if (active === 1) {
      setDataColumns(organizerColumns);
    }
  }, [active]);

  const handleChooseOrg = () => {
    setActive(1);
  };

  const handleChooseTalent = () => {
    setActive(0);
  };

  let tableData;
  if (data) {
    if (active === 1) {
      tableData = data.map(org => ({
        displayName: (
          <Link href={`oa-home/organizer/${org.uid}`} zIndex={1}>
            {org.displayName}
          </Link>
        ),
        representative: <Text>{org.representative}</Text>,
        gmail: <Text>{org.email}</Text>,
        phoneNumber: <Text>{org.phoneNumber}</Text>,
        status: (
          <StatusCell type={org.userState}>
            {t(globalMessages[org.userState])}
          </StatusCell>
        ),
        action: (
          <HStack>
            <Button bg={TEXT_GREEN} size="xs">
              {t(messages.approve())}
            </Button>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link href="#">
              <Button colorScheme="purple" size="xs">
                {t(messages.decline())}
              </Button>
            </Link>
            <Button colorScheme="red" size="xs">
              {t(messages.delete())}
            </Button>
          </HStack>
        ),
      }));
    }
    if (active === 0) {
      tableData = data.map(talent => ({
        displayName: (
          <Link href={`oa-home/talent/${talent.uid}`} zIndex={1}>
            {talent.displayName}
          </Link>
        ),
        position: <Text>{talent.userType}</Text>,
        gmail: <Text>{talent.email}</Text>,
        phoneNumber: <Text>{talent.phoneNumber}</Text>,
        status: (
          <StatusCell type={talent.userState}>
            {t(globalMessages[talent.userState])}
          </StatusCell>
        ),
        action: (
          <HStack>
            <Button bg={TEXT_GREEN} size="xs">
              {t(messages.approve())}
            </Button>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link href="#">
              <Button colorScheme="purple" size="xs">
                {t(messages.decline())}
              </Button>
            </Link>
            <Button colorScheme="red" size="xs">
              {t(messages.delete())}
            </Button>
          </HStack>
        ),
      }));
    }
  }
  const pageProps = {
    total: paging.totalElements,
    pageNumber: paging.pageNumber, // pageNumber
    limit: paging.pageSize, // pageSize
    isLast: paging.last,
  };

  return (
    <Box px={10}>
      <H1 color={TEXT_GREEN} fontSize="30px">
        {t(messages.header())}
      </H1>
      <InputCustomV2
        id="displayName"
        type="text"
        size="md"
        placeholder="Enter organizer name"
        onChange={e => handleNameChange(e.target.value)}
      />
      <Box color={PRI_TEXT_COLOR}>
        <Box
          display="d-flex"
          justifyContent="space-between"
          sx={{
            marginBottom: '20px',
          }}
        >
          <Box display="flex">
            <Button
              borderBottom="5px solid"
              bg="transparent"
              sx={{
                borderRadius: '0',
                borderColor: active === 0 ? TEXT_GREEN : 'transparent',
                fontWeight: '10px',
              }}
              onClick={() => handleChooseTalent()}
              color={active === 0 ? TEXT_PURPLE : 'white'}
            >
              {t(messages.talent())}
            </Button>
            <Button
              borderBottom="5px solid"
              bg="transparent"
              sx={{
                borderRadius: '0',
                borderColor: active === 1 ? TEXT_GREEN : 'transparent',
                fontWeight: '10px',
              }}
              onClick={() => handleChooseOrg()}
              color={active === 1 ? TEXT_PURPLE : 'white'}
            >
              {t(messages.organizer())}
            </Button>
          </Box>
        </Box>
        {!data ? (
          <PageSpinner />
        ) : (
          <Flex zIndex={1} position="relative" gap={4}>
            <Box w="100%" flexGrow={1}>
              <AdvancedTable
                columns={dataColumns}
                data={tableData || []}
                {...pageProps}
                handlePageChange={handlePageChange}
                setLimit={handleLimitChange}
              />
            </Box>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

OAManagementPage.propTypes = {
  match: PropTypes.object,
  paging: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  handlePageChange: PropTypes.func,
  handleLimitChange: PropTypes.func,
  handleNameChange: PropTypes.func,
  loadData: PropTypes.func,
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
});

export function mapDispatchToProps(dispatch) {
  return {
    handlePageChange: page => {
      dispatch(changePage(page));
      dispatch(loadData());
    },
    handleLimitChange: limit => {
      dispatch(changeLimit(limit));
      dispatch(loadData());
    },
    handleNameChange: name => {
      dispatch(changeName(name));
      dispatch(loadData());
    },
    loadData: isGetDataTalent => {
      dispatch(loadData(isGetDataTalent));
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
)(OAManagementPage);
