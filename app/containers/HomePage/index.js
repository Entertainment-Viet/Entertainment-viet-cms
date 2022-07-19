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
import { Container, Box, HStack, Divider } from '@chakra-ui/react';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { CardListHorizontal } from 'components/Cards';
import { ImageSlider } from 'components/Carousel';
import Buttons from 'components/Buttons';
import Metadata from 'components/Metadata';
import { PRI_TEXT_COLOR, SEC_TEXT_COLOR, LIGHT_GRAY } from 'constants/styles';

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

const key = 'HomePage';
export function HomePage({ loading, error, data, onLoadData }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    onLoadData();
  }, []);
  const { t } = useTranslation();
  console.log(data, loading, error);

  const SlideData = [
    {
      image:
        'https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      image:
        'https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1489&q=80',
    },
    {
      image:
        'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80',
    },
    {
      image:
        'https://images.unsplash.com/photo-1475189778702-5ec9941484ae?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80',
    },
    {
      image:
        'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80',
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <Metadata />
      <HStack mb={10}>
        <Container paddingInlineStart="0">
          <Box
            width="sm"
            height="17.5rem"
            borderWidth="1px"
            borderRadius="lg"
            bg={LIGHT_GRAY}
            color={PRI_TEXT_COLOR}
            position="relative"
          >
            <Box
              p={6}
              display="flex"
              flexDirection="column"
              alignItems="baseline"
              position="absolute"
              top="25%"
            >
              <Box
                mt="1"
                fontWeight="500"
                as="h1"
                lineHeight="tight"
                noOfLines={1}
              >
                {t(messages.welcome())}
              </Box>
              <Box as="span" color={SEC_TEXT_COLOR}>
                Looking for talent for your event ?
              </Box>
              {/* <Button mt="12" colorScheme="orange">
                Post a job
              </Button> */}
              <Buttons mt="12">{t(messages.postJob())}</Buttons>
            </Box>
          </Box>
        </Container>
        <ImageSlider slides={SlideData} />
      </HStack>
      <Box
        color={PRI_TEXT_COLOR}
        mt="6"
        mb="6"
        fontWeight="500"
        as="h1"
        lineHeight="tight"
        noOfLines={1}
      >
        {t(messages.popularTalent())}
      </Box>
      <CardListHorizontal />
      <Box
        color={PRI_TEXT_COLOR}
        mt="6"
        mb="6"
        fontWeight="500"
        as="h1"
        lineHeight="tight"
        noOfLines={1}
      >
        {t(messages.recentTalent())}
      </Box>
      <CardListHorizontal />
      <ImageSlider slides={SlideData} />
      <Box
        color={PRI_TEXT_COLOR}
        mt="6"
        mb="6"
        fontWeight="500"
        as="h1"
        lineHeight="tight"
        noOfLines={1}
      >
        {t(messages.editorChoice())}
      </Box>
      <CardListHorizontal />
      <Divider />
    </div>
  );
}

HomePage.propTypes = {
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
)(HomePage);
