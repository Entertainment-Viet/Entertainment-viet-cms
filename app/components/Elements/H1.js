import React from 'react';
import { Text } from '@chakra-ui/react';
import { PRI_TEXT_COLOR, LIGHT_GRAY } from 'constants/styles';
import PropTypes from 'prop-types';

// If you want to use your own Selectors look up the Advancaed Story book examples
const H1 = props => (
  <Text color={PRI_TEXT_COLOR} as="h1" fontWeight={700} py="6" {...props}>
    {props.children}
  </Text>
);

H1.propTypes = {
  slides: PropTypes.any,
  children: PropTypes.any,
};
export default H1;
