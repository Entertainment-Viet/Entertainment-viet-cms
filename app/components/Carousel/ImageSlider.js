import React from 'react';
import { Image } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './style.css';
import PropTypes from 'prop-types';

// If you want to use your own Selectors look up the Advancaed Story book examples
const ImageSlider = ({ slides }) => (
  <Carousel
    infiniteLoop
    autoPlay
    style={{ display: 'inherit' }}
    className="slider-1"
  >
    {slides.map(slide => (
      <Image src={slide.image} height="auto" width="800px" />
    ))}
  </Carousel>
);

ImageSlider.propTypes = {
  slides: PropTypes.any,
};
export default ImageSlider;
