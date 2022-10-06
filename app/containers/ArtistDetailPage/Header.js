import React from 'react';
import {
  Box,
  HStack,
  Avatar,
  Divider,
  Container,
  VStack,
  Text,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { LIGHT_GRAY, TEXT_PURPLE, TEXT_GREEN } from 'constants/styles';

import PropTypes from 'prop-types';

// If you want to use your own Selectors look up the Advancaed Story book examples
const Header = ({ profile }) => (
  <Container marginInlineStart="inherit" paddingInlineStart="inherit" mb={6}>
    <VStack align="flex-start" spacing={4} w="max-content">
      <Text as="h1" fontWeight={700} fontSize="30px" color={TEXT_PURPLE}>
        Singer performs for music festival, bar, club and pub
      </Text>
      <HStack>
        <Avatar
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
          size="sm"
        />
        <Text color={TEXT_PURPLE}>{profile.displayName}</Text>
        <Divider orientation="vertical" color={LIGHT_GRAY} w="1px" h="24px" />
        <StarIcon color={TEXT_GREEN} />
        <Box
          as="span"
          mr="2"
          color={TEXT_GREEN}
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
  profile: PropTypes.any,
};
export default Header;
