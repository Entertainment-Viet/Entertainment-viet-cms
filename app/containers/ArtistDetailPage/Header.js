import React from 'react';
import {
  Box,
  HStack,
  Link,
  Avatar,
  Divider,
  InputGroup,
  InputRightElement,
  Container,
  VStack,
  Center,
  Text,
  Button,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import {
  PRI_TEXT_COLOR,
  RED_COLOR,
  LIGHT_GRAY,
  SEC_TEXT_COLOR,
} from 'constants/styles';
import { H1 } from 'components/Elements';

import PropTypes from 'prop-types';

// If you want to use your own Selectors look up the Advancaed Story book examples
const Header = ({ profile }) => (
  <Container marginInlineStart="inherit" paddingInlineStart="inherit" mb={6}>
    <VStack align="flex-start" spacing={4}>
      <Text color={SEC_TEXT_COLOR} fontWeight={400} fontSize={18}>
        Solo singer
      </Text>
      <Text as="h1" color={PRI_TEXT_COLOR} fontWeight={700} fontSize="20px">
        Nhận biểu diễn cho các quán cà fê, phòng trà
      </Text>
      <HStack>
        <Avatar
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
          size="sm"
        />
        <Text color={PRI_TEXT_COLOR}>Sundae</Text>
        <Divider orientation="vertical" color={LIGHT_GRAY} w="1px" h="24px" />
        <StarIcon color={RED_COLOR} />
        <Box
          as="span"
          mr="2"
          color={SEC_TEXT_COLOR}
          fontSize="14px"
          fontWeight={500}
        >
          4 (120)
        </Box>
      </HStack>
    </VStack>
  </Container>
);

Header.propTypes = {
  slides: PropTypes.any,
};
export default Header;