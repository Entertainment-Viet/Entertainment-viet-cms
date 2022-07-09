import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types';
import {
  Box,
  Avatar,
  Container,
  Link,
  Text,
  HStack,
  VStack,
  Divider,
} from '@chakra-ui/react';
import { PRI_TEXT_COLOR } from 'constants/styles';

// If you want to use your own Selectors look up the Advancaed Story book examples
const CommentBox = ({ slides }) => (
  <Container maxW="100%">
    <HStack justify="flex-start" align="flex-start">
      <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      <VStack justify="flex-start" align="flex-start">
        <Container maxW="100%">
          <Link href="google">
            <Text color={PRI_TEXT_COLOR} fontSize="18px" fontWeight={700}>
              Anna 212
            </Text>
          </Link>
        </Container>
        <Container maxW="100%">
          <Text color={PRI_TEXT_COLOR} fontSize="14px">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            hendrerit tortor ac mattis gravida. Nulla quis eleifend nibh.
            Maecenas quis rutrum purus, id ornare turpis. Morbi quis odio
            posuere, euismod neque non, mattis justo. Ut a mauris mi. Maecenas
            posuere vitae nulla a tempor. Nullam euismod, orci nec hendrerit
            lacinia, quam tortor fringilla ligula, vitae sagittis nibh mauris
            luctus tellus. Morbi tincidunt nunc quis enim blandit, sed ultricies
            nisl dignissim. Praesent pharetra eros metus, non vehicula lectus
            malesuada ac. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Donec porta mauris vel euismod vulputate. Cras volutpat vitae
            augue eu bibendum. Curabitur libero nisi, elementum cursus finibus
            vel, laoreet vitae sem. Aenean nisl ipsum, efficitur et volutpat sit
            amet, maximus non libero.
          </Text>
        </Container>
        <Container>
          <Text color={PRI_TEXT_COLOR} fontSize="14px">
            Đánh giá từ 1 tuần trước
          </Text>
        </Container>
        <Container>
          <HStack>
            <Text
              color={PRI_TEXT_COLOR}
              fontSize="14px"
              _hover={{ color: 'green' }}
              onClick={() => alert('like')}
            >
              Đánh giá hữu ích
            </Text>
            <Text
              color={PRI_TEXT_COLOR}
              fontSize="14px"
              _hover={{ color: 'red' }}
              onClick={() => alert('dislike')}
            >
              Đánh giá không hữu ích
            </Text>
          </HStack>
        </Container>
      </VStack>
    </HStack>
    <Divider mt="6" mb="6" />
  </Container>
);

CommentBox.propTypes = {
  slides: PropTypes.any,
};
export default CommentBox;
