import React from 'react';
import {
  HStack,
  Avatar,
  Text,
  Box,
  VStack,
  Container,
  Center,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './style.css';
import PropTypes from 'prop-types';

// If you want to use your own Selectors look up the Advancaed Story book examples
const arrowStyles = {
  position: 'absolute',
  zIndex: 2,
  top: 'calc(50% - 15px)',
  width: 30,
  height: 30,
  cursor: 'pointer',
  background: '#1A202C',
  color: '#E53E3E',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '50%',
};
const CommentCarousel = ({ slides }) => (
  <Carousel
    infiniteLoop
    autoPlay
    renderArrowPrev={(onClickHandler, hasPrev, label) =>
      hasPrev && (
        <button
          type="button"
          onClick={onClickHandler}
          title={label}
          style={{ ...arrowStyles, left: -15 }}
        >
          &#8826;
        </button>
      )
    }
    renderArrowNext={(onClickHandler, hasNext, label) =>
      hasNext && (
        <button
          type="button"
          onClick={onClickHandler}
          title={label}
          style={{ ...arrowStyles, right: -15 }}
        >
          &#8827;
        </button>
      )
    }
  >
    {/* {slides.map(slide => (
      <Image src={slide.image} height="auto" width="800px" />
    ))} */}
    <Box bg="gray.700" p="8">
      <VStack align="flex-start">
        <HStack align="flex-start">
          <Center>
            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            <Text color="white" ml="2" fontSize="18px" fontWeight={700}>
              Anna 212
            </Text>
            <Box display="flex" ml="2" alignItems="center">
              <Box
                as="span"
                mr="2"
                color="white"
                fontSize="18px"
                fontWeight={700}
              >
                4
              </Box>
              <StarIcon color="#E53E3E" />
            </Box>
          </Center>
        </HStack>
        <Container color="white" maxW="100%" p={0} textAlign="start">
          “Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer ...”
        </Container>
      </VStack>
    </Box>
    <Box bg="gray.700" p="8">
      <VStack align="flex-start">
        <HStack align="flex-start">
          <Center>
            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            <Text color="white" ml="2" fontSize="18px" fontWeight={700}>
              Anna 212
            </Text>
            <Box display="flex" ml="2" alignItems="center">
              <Box
                as="span"
                mr="2"
                color="white"
                fontSize="18px"
                fontWeight={700}
              >
                4
              </Box>
              <StarIcon color="#E53E3E" />
            </Box>
          </Center>
        </HStack>
        <Container color="white" maxW="100%" p={0} textAlign="start">
          “Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer ...”
        </Container>
      </VStack>
    </Box>
  </Carousel>
);

CommentCarousel.propTypes = {
  slides: PropTypes.any,
};
export default CommentCarousel;