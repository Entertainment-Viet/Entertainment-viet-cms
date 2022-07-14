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
import NormalProfile from './NormalProfile';

// import { loadNFTFilter } from 'containers/NFTFilterProvider/actions';

// import { isAuthor } from 'utils/auth';

// import { InputCustom, SelectCustom, ButtonCustom } from 'components/Controls';

import {} from 'constants/routes';
import {} from './styles';
import { messages } from './messages';
import {} from './actions';
import saga from './saga';
import reducer from './reducer';
import {} from './selectors';
const CustomTab = chakra(Tab, {
  baseStyle: {
    fontWeight: '500',
    fontSize: '18px',
    // mt: '-4',
    _hover: { color: PRI_TEXT_COLOR },
    _focus: { color: RED_COLOR },
  },
});
const key = 'ArtistDetailPage';
export function ArtistDetailPage({ match }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { t } = useTranslation();

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
      <Tabs mb="12">
        <TabList color={RED_COLOR}>
          <CustomTab>{t(messages.overview())}</CustomTab>
          <CustomTab>{t(messages.about())}</CustomTab>
          <CustomTab>{t(messages.review())}</CustomTab>
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
              {parserHtml('This is for the rich text field <b>vloz</b>')}
            </Container>
            <H1>{t(messages.basicInfo())}</H1>
            <NormalProfile />
            <H1>{t(messages.questions())}</H1>
            <Dropdown />
            <H1>120 Reviews</H1>
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
            <H1>Review</H1>
            <CommentBox />
            <CommentBox />
            <CommentBox />
            <Container>
              <Text color={RED_COLOR} fontSize="18px">
                {t(messages.seeMore())}
              </Text>
            </Container>
          </VStack>
        </GridItem>
      </Grid>
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
