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
const PackagesBox = () => {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return (
    <Container>
      <HStack align="flex-start">
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
          <Text color={PRI_TEXT_COLOR}>Gói cơ bản</Text>
          <Text color={THIRD_TEXT_COLOR}>Lana</Text>
          <Text color={THIRD_TEXT_COLOR}>Thời gian: 23/08/2022 2pm</Text>
          <Text color={THIRD_TEXT_COLOR}>Địa điểm: nhà hàng</Text>
        </Box>
        <VStack
          justify="space-between"
          height="7rem"
          style={{ marginLeft: 'auto' }}
        >
          <Text color={PRI_TEXT_COLOR}>{numberWithCommas(400000)} VND</Text>
          <HStack justify="space-between">
            <Button bg="transparent" color={PRI_TEXT_COLOR} fontSize="14px">
              Chỉnh sửa
            </Button>
            <Divider orientation="vertical" height="14px" />
            <Button bg="transparent" color={PRI_TEXT_COLOR} fontSize="14px">
              Xóa
            </Button>
          </HStack>
        </VStack>
      </HStack>
      <Divider w="100%" ml="auto" mr="auto" mb="0.5rem" />
    </Container>
  );
};

PackagesBox.propTypes = {};
export default PackagesBox;
