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
import { useTranslation } from 'react-i18next';
import { createStructuredSelector } from 'reselect';

import {
  Container,
  VStack,
  HStack,
  Grid,
  GridItem,
  Text,
  Link,
  Tab,
  TabList,
  Tabs,
  Progress,
  SimpleGrid,
  Button,
  chakra,
} from '@chakra-ui/react';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import parserHtml from 'utils/html';
import { ImageSliderWithPreview, CommentCarousel } from 'components/Carousel';
import Metadata from 'components/Metadata';
import Dropdown from 'components/Accordian';
import CommentBox from 'components/Comment';
import { H1 } from 'components/Elements';
import { PRI_TEXT_COLOR, RED_COLOR } from 'constants/styles';

import PageSpinner from 'components/PageSpinner';
import { loadData } from './actions';

import NormalProfile from './NormalProfile';
import Header from './Header';
import PackagesBox from './PackagesBox';

import {} from 'constants/routes';
import {} from './styles';
import { messages } from './messages';

import saga from './saga';
import reducer from './reducer';
import { makeSelectData, makeSelectPackages } from './selectors';
// import { BasicRating } from '../../components/Rating';
const CustomTab = chakra(Tab, {
  baseStyle: {
    fontWeight: '500',
    fontSize: '18px',
    _hover: { color: PRI_TEXT_COLOR },
    _focus: { color: RED_COLOR },
  },
});
const key = 'ArtistDetailPage';
export function ArtistDetailPage({ match, onLoadData, data, packages }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { t } = useTranslation();

  useEffect(() => {
    onLoadData(match.params.id);
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
      <Tabs mb="12">
        <TabList color={RED_COLOR}>
          <CustomTab>{t(messages.overview())}</CustomTab>
          <CustomTab>{t(messages.about())}</CustomTab>
          <CustomTab>{t(messages.review())}</CustomTab>
        </TabList>
      </Tabs>
      {!data ? (
        <PageSpinner />
      ) : (
        <Grid templateColumns="repeat(5, 1fr)">
          <GridItem>
            <VStack align="flex-start">
              <Header profile={data} />
              <ImageSliderWithPreview slides={SlideData} />
              <HStack
                justifyContent="space-between"
                w="100%"
                style={{ marginTop: '2rem', marginBottom: '1rem' }}
              >
                <Text as="h1" fontWeight={700}>
                  {t(messages.comment())}
                </Text>
                <Link href={`/all-comment/${match.params.id}`}>
                  <Text color={RED_COLOR} fontWeight={400}>
                    {t(messages.allComment())}
                  </Text>
                </Link>
              </HStack>
              <CommentCarousel />
              <H1>{t(messages.description())}</H1>
              <Container color={PRI_TEXT_COLOR}>
                {parserHtml(data.bio)}
              </Container>
              <H1>{t(messages.basicInfo())}</H1>
              <NormalProfile profile={data} />
              <H1>{t(messages.questions())}</H1>
              <Dropdown />
              <SimpleGrid columns={2}>
                <H1>120 Reviews</H1>
              </SimpleGrid>
              <HStack>
                <Text>5 sao</Text>{' '}
                <Progress value={50} size="xs" colorScheme="pink" w="20rem" />
                <Text>100</Text>
              </HStack>
              <HStack>
                <Text>4 sao</Text>{' '}
                <Progress value={50} size="xs" colorScheme="pink" w="20rem" />
                <Text>100</Text>
              </HStack>
              <HStack>
                <Text>3 sao</Text>{' '}
                <Progress value={50} size="xs" colorScheme="pink" w="20rem" />
                <Text>100</Text>
              </HStack>
              <HStack>
                <Text>2 sao</Text>{' '}
                <Progress value={50} size="xs" colorScheme="pink" w="20rem" />
                <Text>100</Text>
              </HStack>
              <HStack>
                <Text>1 sao</Text>{' '}
                <Progress value={50} size="xs" colorScheme="pink" w="20rem" />
                <Text>100</Text>
              </HStack>
              <H1>Review</H1>
              <CommentBox />
              <CommentBox />
              <CommentBox />
              <Container>
                <Button color={RED_COLOR} fontSize="18px" variant="ghost">
                  {t(messages.seeMore())}
                </Button>
              </Container>
            </VStack>
          </GridItem>
          <GridItem colSpan={2}>
            <PackagesBox data={packages} id={data.uid} />
          </GridItem>
        </Grid>
      )}
    </div>
  );
}

ArtistDetailPage.propTypes = {
  match: PropTypes.object,
  onLoadData: PropTypes.func,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  packages: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  packages: makeSelectPackages(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: id => {
      dispatch(loadData(id));
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
)(ArtistDetailPage);
