import React from 'react';
import {
  Image,
  Flex,
  Box,
  Input,
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
import { PRI_TEXT_COLOR, RED_COLOR } from 'constants/styles';

import PropTypes from 'prop-types';

// If you want to use your own Selectors look up the Advancaed Story book examples
const NormalProfile = ({ profile }) => (
  <Container>
    <HStack>
      <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" size="2xl" />
      <Center>
        <VStack align="flex-start" ml="12">
          <Link href="google">
            <Text fontSize="18px" fontWeight={700}>
              Anna 212
            </Text>
          </Link>
          <Box display="flex" ml="2" alignItems="center">
            <Box
              as="span"
              mr="2"
              color={PRI_TEXT_COLOR}
              fontSize="14px"
              fontWeight={500}
            >
              4 (120)
            </Box>
            <StarIcon color={RED_COLOR} />
          </Box>
          <Button>Contact me</Button>
        </VStack>
      </Center>
    </HStack>
  </Container>
);

NormalProfile.propTypes = {
  slides: PropTypes.any,
};
export default NormalProfile;
