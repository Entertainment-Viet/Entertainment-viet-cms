/*
 * NFTPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Box,
  VStack,
  Divider,
  Grid,
  GridItem,
  Text,
  Image,
} from '@chakra-ui/react';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { CardListHorizontal } from 'components/Cards';
import { ImageSlider } from 'components/Carousel';
import Buttons from 'components/Buttons';
import PackagesBox from 'components/PackageBox';
import Metadata from 'components/Metadata';
import { H1 } from 'components/Elements';
import { PRI_TEXT_COLOR, SEC_TEXT_COLOR, LIGHT_GRAY } from 'constants/styles';
import CardImg from './assets/payment_card.svg';
import Arrow from './assets/arrow.svg';

// import { loadNFTFilter } from 'containers/NFTFilterProvider/actions';

// import { isAuthor } from 'utils/auth';

// import { InputCustom, SelectCustom, ButtonCustom } from 'components/Controls';

import {} from 'constants/routes';
import {} from './styles';
import { messages } from './messages';

import { loadInfo } from './actions';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectDetailLoading,
  makeSelectDetailError,
  makeSelectDetail,
} from './selectors';
// import { propTypes } from 'qrcode.react';

const key = 'PreCheckout';
export function PreCheckout({ loading, error, data, onLoadData }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    onLoadData();
  }, []);
  const { t } = useTranslation();
  console.log(data, loading, error);

  return (
    <div style={{ width: '100%' }}>
      <Metadata />
      <Grid templateColumns="repeat(6,1fr)" my={6} gap={12}>
        <GridItem colSpan={3}>
          <H1>{t(messages.overview())}</H1>
          <Text>{t(messages.overviewDesc())}</Text>
          <Box border="1px solid #718096" py={4} my={6}>
            <PackagesBox />
            <PackagesBox />
            <PackagesBox />
          </Box>
        </GridItem>
        <GridItem colStart={5} colEnd={7}>
          <H1>{t(messages.method())}</H1>
          <Text>{t(messages.methodDesc())}</Text>
          <Box py={4}>
            <Box bg={LIGHT_GRAY} position="relative" p={4}>
              <VStack align="flex-start">
                <Text>{t(messages.instantPay())}</Text>
                <Image src={CardImg} alt="card image" pt={2} />
              </VStack>
              <Image
                src={Arrow}
                alt="card image"
                position="absolute"
                top="50%"
                right="0"
                transform="translate(-50%, -50%)"
              />
            </Box>
            <Box bg={LIGHT_GRAY} position="relative" p={4} mt={4}>
              <VStack align="flex-start">
                <Text>{t(messages.laterPay())}</Text>
                <Image src={CardImg} alt="card image" pt={2} />
              </VStack>
              <Image
                src={Arrow}
                alt="card image"
                position="absolute"
                top="50%"
                right="0"
                transform="translate(-50%, -50%)"
              />
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </div>
  );
}

PreCheckout.propTypes = {
  onLoadData: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectDetailLoading(),
  error: makeSelectDetailError(),
  data: makeSelectDetail(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () => {
      dispatch(loadInfo());
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
)(PreCheckout);
