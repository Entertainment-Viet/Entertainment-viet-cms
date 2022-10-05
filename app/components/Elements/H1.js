import React from 'react';
import { Text } from '@chakra-ui/react';
import { PRI_TEXT_COLOR } from 'constants/styles';
import PropTypes from 'prop-types';

// If you want to use your own Selectors look up the Advancaed Story book examples
const H1 = props => (
  <Text
    color={props.color ? props.color : PRI_TEXT_COLOR}
    fontSize={props.fontSize ? props.fontSize : '40px'}
    as="h1"
    fontWeight={600}
    py="6"
    {...props}
    letterSpacing="2px"
  >
    {props.children}
  </Text>
);

H1.propTypes = {
  slides: PropTypes.any,
  children: PropTypes.any,
  color: PropTypes.string,
  fontSize: PropTypes.string,
};
export default H1;
