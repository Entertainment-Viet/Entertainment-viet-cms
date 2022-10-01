import React from 'react';
import { Box, Image, Divider, Container, Link } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { PRI_TEXT_COLOR } from 'constants/styles';
import PropTypes from 'prop-types';
import { numberWithCommas } from 'utils/helpers';

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
    <Container centerContent maxW="100%">
      <Image
        src={property.imageUrl}
        alt={property.imageAlt}
        boxSize="110px"
        borderRadius="10%"
        zIndex={99}
      />
      <Link href={`/artist/${props.data.uid}`}>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          bg="#2D3748"
          color={PRI_TEXT_COLOR}
          pos="relative"
          bottom="10%"
          w={[200, 200, 200, 250]}
        >
          <Box p="6">
            <Box
              mt="1"
              fontWeight="500"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
              w={[200, 200, 200, 250]}
            >
              {props.data.displayName}
            </Box>
            <Box>{property.title}</Box>
            <Box display="flex" mt="2" alignItems="center">
              <StarIcon color="#E53E3E" />
              <Box as="span" ml="2" color={PRI_TEXT_COLOR} fontSize="sm">
                {property.rating} ({property.reviewCount})
              </Box>
            </Box>
          </Box>
          <Divider orientation="horizontal" />
          <Box p="2" maxW="sm" bg="#2D3748" color={PRI_TEXT_COLOR}>
            <Box
              mt="1"
              ml="2"
              fontWeight="500"
              lineHeight="tight"
              noOfLines={3}
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
