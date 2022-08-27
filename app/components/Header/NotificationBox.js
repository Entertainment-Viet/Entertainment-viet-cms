import React from 'react';
import {
  Box,
  Link,
  Container,
  HStack,
  Image,
  Text,
  VStack,
  Button,
  Divider,
} from '@chakra-ui/react';
import Buttons from 'components/Buttons';
import {
  PRI_TEXT_COLOR,
  RED_COLOR,
  LIGHT_GRAY,
  THIRD_TEXT_COLOR,
} from 'constants/styles';

import PropTypes from 'prop-types';

// If you want to use your own Selectors look up the Advancaed Story book examples
const NotificationBox = () => {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return (
    <Container>
      <HStack align="center">
        <Box>
          <Image
            src="https://bit.ly/2Z4KKcF"
            alt="demo"
            boxSize="2rem"
            borderRadius="10%"
            zIndex={99}
          />
        </Box>
        <Box>
          <Text>Conor vừa chấp nhận yêu cầu của bạn</Text>
        </Box>
      </HStack>
    </Container>
  );
};

NotificationBox.propTypes = {};
export default NotificationBox;
