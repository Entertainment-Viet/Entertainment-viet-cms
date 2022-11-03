import React from 'react';
import {
  Box,
  Text,
  chakra,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { SUB_BLU_COLOR, TEXT_GREEN, TEXT_PURPLE } from 'constants/styles';
// import { H1 } from 'components/Elements';
import Buttons from 'components/Buttons';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import PageSpinner from 'components/PageSpinner';
import parserHtml from 'utils/html';
// import { numberWithCommas } from '../../../utils/helpers';
const GradientBox = chakra(Box, {
  baseStyle: {
    flex: 1,
    width: '100%',
    display: 'flex',
    maxWidth: '100%',
    overflowX: 'inherit',
    borderRadius: '4px',
    flexDirection: 'column',
    boxSizing: 'border-box',
    background: SUB_BLU_COLOR,
    position: 'relative',
    backgroundClip: 'padding-box',
    px: '2rem',
    py: '6rem',
    _before: {
      content: `""`,
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: -1,
      margin: '-2px',
      borderRadius: 'inherit',
      background:
        'linear-gradient(180deg, rgba(0, 35, 242, 0) 0%, #404B8D 100%)',
    },
  },
});
// If you want to use your own Selectors look up the Advancaed Story book examples
const CustomLink = styled(Link)`
  width: 90%;
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  margin: auto;
`;
const PositionDetailCard = ({ data }) => (
  <GradientBox>
    {!data ? (
      <PageSpinner />
    ) : (
      <>
        <Text color={TEXT_GREEN} as="h1" fontSize="30px">
          Position Detail
        </Text>
        <Text color={TEXT_PURPLE} mt={6}>
          Details
        </Text>
        <UnorderedList>
          <ListItem>
            <Text>Category: {data.jobOffer.jobDetail.category.name}</Text>
          </ListItem>
          <ListItem>
            <Text>
              Time:{' '}
              {new Date(
                data.jobOffer.jobDetail.performanceStartTime,
              ).toLocaleString()}{' '}
              -{' '}
              {new Date(
                data.jobOffer.jobDetail.performanceEndTime,
              ).toLocaleString()}
            </Text>
          </ListItem>
          <ListItem>
            <Text>Note: {parserHtml(data.jobOffer.jobDetail.note)} </Text>
          </ListItem>
        </UnorderedList>
        <CustomLink href="/#">
          <Buttons width="100%" bg={TEXT_PURPLE} color={SUB_BLU_COLOR}>
            Edit
          </Buttons>
        </CustomLink>
      </>
    )}
  </GradientBox>
);
PositionDetailCard.propTypes = {
  data: PropTypes.any,
};
export default PositionDetailCard;
