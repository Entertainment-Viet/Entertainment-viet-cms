import React from 'react';
import PropTypes from 'prop-types';
import { SimpleGrid, Container } from '@chakra-ui/react';
import Card from './Card';

function CardListHorizontal() {
  const dataList = [
    {
      id: '1',
    },
    {
      id: '2',
    },
    {
      id: '3',
    },
    {
      id: '4',
    },
    {
      id: '5',
    },
  ];

  return (
    <Container maxW="100%" centerContent>
      <SimpleGrid maxW="100%" columns={[1, 3, 5]}>
        {dataList.map(function(data) {
          const { id } = data;
          return <Card key={id} />;
        })}
      </SimpleGrid>
    </Container>
  );
}

CardListHorizontal.propTypes = {};

export default CardListHorizontal;
