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
import {
  Container,
  Box,
  VStack,
  HStack,
  Divider,
  Grid,
  GridItem,
  Text,
  Link,
  Tab,
  TabList,
  Tabs,
  Progress,
} from '@chakra-ui/react';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { CardListHorizontal } from 'components/Cards';
import { ImageSliderWithPreview, CommentCarousel } from 'components/Carousel';
import Buttons from 'components/Buttons';
import Metadata from 'components/Metadata';
import { NormalProfile } from 'components/Profile';
import Dropdown from 'components/Accordian';
import CommentBox from 'components/Comment';
import { PRI_TEXT_COLOR } from 'constants/styles';

// import { loadNFTFilter } from 'containers/NFTFilterProvider/actions';

// import { isAuthor } from 'utils/auth';

// import { InputCustom, SelectCustom, ButtonCustom } from 'components/Controls';

import {} from 'constants/routes';
import {} from './styles';

import {} from './actions';
import saga from './saga';
import reducer from './reducer';
import {} from './selectors';

const key = 'ArtistDetailPage';
export function ArtistDetailPage({ match }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    console.log(match.params.id);
  }, [match.params.id]);

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
    <div>
      <Metadata />
      <Divider />
      <Tabs mb="12">
        <TabList
          color="red.500"
          _hover={{ fontWeight: '900' }}
          _selected={{ fontWeight: '900' }}
        >
          <Tab>One</Tab>
          <Tab>Two</Tab>
          <Tab>Three</Tab>
        </TabList>
      </Tabs>
      <Grid templateColumns="repeat(5, 1fr)">
        <GridItem colSpan={3}>
          <VStack align="flex-start">
            <ImageSliderWithPreview slides={SlideData} />
            <HStack
              justifyContent="space-between"
              w="100%"
              style={{ marginTop: '2rem', marginBottom: '1rem' }}
            >
              <Text color={PRI_TEXT_COLOR} as="h1" fontWeight={700}>
                Nhận xét của khách hàng về talent
              </Text>
              <Link href={`/all-comment/${match.params.id}`}>
                <Text color="red.500" as="h1" fontWeight={700}>
                  Nhận xét của khách hàng về talent
                </Text>
              </Link>
            </HStack>
            <CommentCarousel />
            <Text color={PRI_TEXT_COLOR} as="h1" fontWeight={700} py="6">
              Thông tin dịch vụ cung cấp
            </Text>
            <Container color={PRI_TEXT_COLOR}>
              This is for the rich text field <b>vloz</b>
            </Container>
            <Text color={PRI_TEXT_COLOR} as="h1" fontWeight={700} py="6">
              Thông tin cơ bản về talent
            </Text>
            <NormalProfile />
            <Text color={PRI_TEXT_COLOR} as="h1" fontWeight={700} py="6">
              Câu hỏi thường gặp
            </Text>
            <Dropdown />
            <Text color={PRI_TEXT_COLOR} as="h1" fontWeight={700} py="6">
              120 Reviews
            </Text>
            <Container color={PRI_TEXT_COLOR}>
              5 sao <Progress value={50} size="xs" colorScheme="pink" /> 100
            </Container>
            <Container color={PRI_TEXT_COLOR}>
              4 sao <Progress value={50} size="xs" colorScheme="pink" /> 100
            </Container>
            <Container color={PRI_TEXT_COLOR}>
              3 sao <Progress value={50} size="xs" colorScheme="pink" /> 100
            </Container>
            <Container color={PRI_TEXT_COLOR}>
              2 sao <Progress value={50} size="xs" colorScheme="pink" /> 100
            </Container>
            <Container color={PRI_TEXT_COLOR}>
              1 sao <Progress value={50} size="xs" colorScheme="pink" /> 100
            </Container>
            <Text color={PRI_TEXT_COLOR} as="h1" fontWeight={700} py="6">
              Review
            </Text>
            <CommentBox />
            <CommentBox />
            <CommentBox />
            <Container>
              <Text color="red" fontSize="18px">
                + See more
              </Text>
            </Container>
          </VStack>
        </GridItem>
      </Grid>
      <Divider />
    </div>
  );
}

ArtistDetailPage.propTypes = {
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ArtistDetailPage);
