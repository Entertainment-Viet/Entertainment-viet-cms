import React from 'react';
import { Box, Grid, GridItem, Image } from '@chakra-ui/react';
import PropsTypes from 'prop-types';
import SingleImageUpload from './SingleImageUpload';

const ImageUploadInput = ({ thumbnailComposable }) => {
  const {
    number,
    thumbnailImgs,
    mainImage,
    handleChangeMainImg,
  } = thumbnailComposable;

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={4}>
      <GridItem h="248px" colSpan="5">
        {mainImage ? (
          <Image boxSize="100%" objectFit="contain" src={mainImage.src} />
        ) : (
          <SingleImageUpload iconSize={12} />
        )}
      </GridItem>
      {[...Array(number)].map((_, i) => (
        <GridItem
          onClick={() => handleChangeMainImg(i)}
          /* eslint-disable-next-line react/no-array-index-key */
          key={i}
          position="relative"
          h="54px"
        >
          {thumbnailImgs[i] === null ? (
            <SingleImageUpload iconSize={5} />
          ) : (
            <Box w="100%" h="100%" position="relative">
              <Image
                boxSize="100%"
                objectFit="contain"
                src={thumbnailImgs[i].src}
              />
            </Box>
          )}
        </GridItem>
      ))}
    </Grid>
  );
};

ImageUploadInput.propTypes = {
  thumbnailComposable: PropsTypes.object,
};

export default ImageUploadInput;
