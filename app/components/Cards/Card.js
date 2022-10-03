import React from 'react';
import { Box, Image, Divider, Container, Link } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import {
  PRI_TEXT_COLOR,
  PRI_BACKGROUND,
  TEXT_PURPLE,
  TEXT_GREEN,
} from 'constants/styles';
import PropTypes from 'prop-types';
import { numberWithCommas } from 'utils/helpers';
import CardTop from './assets/CardTop.svg';
function Card(props) {
  const property = {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt: 'Rear view of modern home with pool',
    name: 'Sun Dae',
    title: 'Solo singer',
    reviewCount: 34,
    rating: 4,
    price: '300k-1M / performance',
  };

  return (
    <Container centerContent>
      <Image
        src={CardTop}
        alt={property.imageAlt}
        w={[200, 200, 200, 250]}
        maxW="inherit"
        pos="absolute"
        zIndex={51}
      />
      <Image
        src={property.imageUrl}
        alt={property.imageAlt}
        maxW={[200, 200, 200, 250]}
        style={{ aspectRatio: '1/1.2' }}
        zIndex={50}
      />
      <Link href={`/artist/${props.data.uid}`}>
        <Box
          borderRadius="md"
          overflow="hidden"
          bg={PRI_BACKGROUND}
          color={PRI_TEXT_COLOR}
          pos="relative"
          bottom="10%"
          w={[200, 200, 200, 250]}
        >
          <Box p="4">
            <Box
              fontSize="30px"
              fontWeight="600"
              as="h1"
              lineHeight="100%"
              noOfLines={1}
              w={[200, 200, 200, 250]}
              color={TEXT_PURPLE}
              mt={1}
            >
              {props.data.displayName}
            </Box>
            <Box>{property.title}</Box>
            <Box display="flex" alignItems="center">
              <StarIcon color={TEXT_PURPLE} />
              <Box as="span" ml="2" color={PRI_TEXT_COLOR} fontSize="sm">
                {property.rating} ({property.reviewCount})
              </Box>
            </Box>
          </Box>
          <Divider orientation="horizontal" borderColor="#26358F" />
          <Box p="2" maxW="sm" bg={PRI_BACKGROUND} color={TEXT_GREEN}>
            <Box
              mt="1"
              ml="2"
              fontWeight="500"
              lineHeight="tight"
              noOfLines={1}
            >
              {numberWithCommas(props.priceRange[0])} -{' '}
              {numberWithCommas(props.priceRange[1])} / performance
            </Box>
          </Box>
        </Box>
      </Link>
    </Container>
  );
}

Card.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  priceRange: PropTypes.array,
};

export default Card;
