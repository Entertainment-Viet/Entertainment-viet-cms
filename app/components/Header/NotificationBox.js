import React from 'react';
import {
  Box,
  Container,
  HStack,
  Flex,
  Image,
  Text,
  Divider,
} from '@chakra-ui/react';

// If you want to use your own Selectors look up the Advancaed Story book examples
const NotificationBox = () => (
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
      <Flex>
        <Text fontWeight={600} fontSize={15}>
          Conor
        </Text>
        <Text fontWeight={400} fontSize={15}>
          &nbsp;vừa chấp nhận yêu cầu của bạn
        </Text>
      </Flex>
    </HStack>
    <Divider w="100%" ml="auto" mr="auto" mt="1rem" />
  </Container>
);

NotificationBox.propTypes = {};
export default NotificationBox;
