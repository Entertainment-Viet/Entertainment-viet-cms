import React from 'react';
import { Box, Image, Divider, Container } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

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
        // variant="borderRadius"
        zIndex={99}
      />
      <Box
        minW="280px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="#2D3748"
        color="white"
        pos="relative"
        bottom="10%"
      >
        <Box p="6">
          <Box mt="1" fontWeight="500" as="h4" lineHeight="tight" noOfLines={1}>
            {property.name}
          </Box>
          <Box>{property.title}</Box>
          <Box display="flex" mt="2" alignItems="center">
            <StarIcon color="#E53E3E" />
            <Box as="span" ml="2" color="white" fontSize="sm">
              {property.rating} ({property.reviewCount})
            </Box>
          </Box>
        </Box>
        <Divider orientation="horizontal" />
        <Box p="2" maxW="sm" bg="#2D3748" color="white">
          <Box mt="1" ml="2" fontWeight="500" lineHeight="tight" noOfLines={1}>
            {property.price}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Card;
