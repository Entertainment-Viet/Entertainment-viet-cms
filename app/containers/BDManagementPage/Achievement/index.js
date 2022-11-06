import React, { memo, useEffect, useState } from 'react';
import {
  HStack,
  Text,
  Flex,
  Box,
  Link,
  Button,
  SimpleGrid,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import PageSpinner from 'components/PageSpinner';
import { PRI_TEXT_COLOR, TEXT_GREEN, PRI_BACKGROUND } from 'constants/styles';
import styled from 'styled-components';
import AdvancedTable from 'components/AdvancedTable';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { API_GET_PACKAGE_INFO } from 'constants/api';
import { del } from 'utils/request';
import { useForm } from 'react-hook-form';
import {
  changePage,
  loadPackages,
  changeMode,
  changeLimit,
  loadPackageInfo,
} from './slice/actions';
import saga from './slice/saga';
import reducer from './slice/reducer';
import {
  makeSelectDetailLoading,
  makeSelectDetailError,
  makeSelectDetail,
  makeSelectPackage,
  makeSelectMode,
  makeSelectPaging,
  makeSelectPackageInfo,
} from './slice/selectors';
import { globalMessages } from '../../App/globalMessage';
import Form from '../../../components/Form';
import DynamicInput from '../../../components/DynamicInputFormV2';

const key = 'Achievement';
const Achievement = ({
  data,
  mode,
  onLoadData,
  handleModeChange,
  paging,
  handlePageChange,
  handleLimitchange,
  loadPackage,
  packageInfo,
}) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { t } = useTranslation();
  const [achievement, setAchievement] = useState();

  const onSubmit = async values => {
    console.log(achievement)
  };

  useEffect(() => {
    onLoadData();
  }, []);
  const userId = window.localStorage.getItem('uid');
  function handleDelete(id) {
    del(`${API_GET_PACKAGE_INFO}/${id}`, {}, userId).then(res1 => {
      console.log(res1);
      if (res1 > 300) {
        console.log('error');
      } else {
        onLoadData(userId);
      }
    });
  }

  return (
    <SimpleGrid
      sx={{
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form title="Achievement" isSubmitting={isSubmitting}>
          <DynamicInput setDynamicData={setAchievement} />
        </Form>
      </form>
    </SimpleGrid>
  );
};

Achievement.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  mode: PropTypes.number,
  onLoadData: PropTypes.func,
  loadPackage: PropTypes.func,
  handleModeChange: PropTypes.func,
  paging: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  handlePageChange: PropTypes.func,
  handleLimitchange: PropTypes.func,
  packageInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectDetailLoading(),
  error: makeSelectDetailError(),
  data: makeSelectDetail(),
  packageId: makeSelectPackage(),
  mode: makeSelectMode(),
  paging: makeSelectPaging(),
  packageInfo: makeSelectPackageInfo(),
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
    handleLimitchange: limit => {
      dispatch(changeLimit(limit));
      dispatch(loadPackages());
    },
    loadPackage: (id, talentId) => {
      dispatch(loadPackageInfo(id, talentId));
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
)(Achievement);
