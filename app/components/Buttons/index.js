import React from 'react';
import { chakra, Button } from '@chakra-ui/react';

export default chakra(Button, {
  baseStyle: {
    backgroundColor: 'red.500',
    _hover: { backgroundColor: 'yellow.500' },
  },
});
