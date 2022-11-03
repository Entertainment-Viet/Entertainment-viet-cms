/*
 * NFTPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
// import { useTranslation } from 'react-i18next';
import { Flex } from '@chakra-ui/react';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Calendar from 'components/Calendar';
import { PRI_TEXT_COLOR } from 'constants/styles';
// import { loadNFTFilter } from 'containers/NFTFilterProvider/actions';

// import { isAuthor } from 'utils/auth';

// import { InputCustom, SelectCustom, ButtonCustom } from 'components/Controls';

import {} from 'constants/routes';
import {} from './styles';
import WeeklyCalendar from 'components/WeeklyCalendar';
// import { messages } from './messages';

import { loadInfo } from './actions';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectDetailLoading,
  makeSelectDetailError,
  makeSelectDetail,
} from './selectors';

// import { propTypes } from 'qrcode.react';

const key = 'Calendar';
export function BookManagementPage({ data, onLoadData, roles, uid }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [selectedDate, selectDate] = useState();
  useEffect(() => {
    onLoadData(roles, uid);
  }, []);
  // const { t } = useTranslation();

  return (
    <Flex color={PRI_TEXT_COLOR} gap={8} minWidth="max-content">
      {data && (
        <>
          <WeeklyCalendar toDate={selectedDate} data={data} />
          <Calendar onSelectDate={selectDate} data={data} />
        </>
      )}
    </Flex>
  );
}

BookManagementPage.propTypes = {
  onLoadData: PropTypes.func,
  roles: PropTypes.string,
  uid: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectDetailLoading(),
  error: makeSelectDetailError(),
  data: makeSelectDetail(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: (roles, uid) => {
      dispatch(loadInfo(roles, uid));
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
)(BookManagementPage);
