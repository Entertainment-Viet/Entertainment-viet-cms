import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Flex,
  Text,
  Link,
  Tab,
  TabList,
  Tabs,
  chakra,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import MyTable from 'components/Table';
import { TEXT_GREEN, TEXT_PURPLE } from 'constants/styles';
// import { loadNFTFilter } from 'containers/NFTFilterProvider/actions';

// import { isAuthor } from 'utils/auth';

// import { InputCustom, SelectCustom, ButtonCustom } from 'components/Controls';
import { H1 } from 'components/Elements';
import styled from 'styled-components';
import {} from 'constants/routes';
import {} from './styles';
import PageSpinner from 'components/PageSpinner';
import { messages } from './messages';

import { changePage, loadPackages, changeMode } from './actions';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectDetailLoading,
  makeSelectDetailError,
  makeSelectDetail,
  makeSelectPackage,
  makeSelectMode,
} from './selectors';
import MyPackage from './MyPackage';
// import { propTypes } from 'qrcode.react';

const key = 'ManagementPage';
export function ManagementPage({
  loading,
  error,
  data,
  onLoadData,
  handleModeChange,
  mode,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const CustomTab = chakra(Tab, {
    baseStyle: {
      fontWeight: '500',
      fontSize: '18px',
      _hover: { color: TEXT_GREEN },
      _focus: { color: TEXT_PURPLE },
    },
  });

  useEffect(() => {
    onLoadData();
  }, []);
  const { t } = useTranslation();

  return (
    <>
      <H1 color={TEXT_GREEN} fontSize="30px">
        {t(messages.myAccount())}
      </H1>
      <Tabs mb="12">
        <TabList color={TEXT_PURPLE}>
          <CustomTab>{t(messages.profile())}</CustomTab>
          <CustomTab>{t(messages.myPackage())}</CustomTab>
          <CustomTab>{t(messages.orders())}</CustomTab>
          <CustomTab>{t(messages.schedule())}</CustomTab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <MyPackage data={data} mode={mode} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

ManagementPage.propTypes = {
  onLoadData: PropTypes.func,
  handleModeChange: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  mode: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectDetailLoading(),
  error: makeSelectDetailError(),
  data: makeSelectDetail(),
  packageId: makeSelectPackage(),
  mode: makeSelectMode(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: id => {
      dispatch(loadPackages(id));
    },
    handlePageChange: page => {
      dispatch(changePage(page));
      dispatch(loadPackages());
    },
    handleModeChange: mode => {
      dispatch(changeMode(mode));
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
