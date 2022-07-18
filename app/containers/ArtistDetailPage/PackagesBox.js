import React from 'react';
import {
  Box,
  Link,
  Container,
  VStack,
  Text,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';
import Buttons from 'components/Buttons';
import { PRI_TEXT_COLOR, RED_COLOR, LIGHT_GRAY } from 'constants/styles';

import PropTypes from 'prop-types';

// If you want to use your own Selectors look up the Advancaed Story book examples
const PackagesBox = () => {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return (
    <Container>
      <VStack>
        <Box h={32} />
        <Box
          bg={LIGHT_GRAY}
          border="white 1px solid"
          borderRadius="5%"
          color={PRI_TEXT_COLOR}
        >
          <TableContainer>
            <Table
              variant="unstyled"
              overflowX="hidden"
              style={{
                tableLayout: 'fixed',
                width: '25rem',
                wordWrap: 'break-word',
              }}
            >
              <TableCaption>
                <Buttons width="100%">Gửi báo giá riêng</Buttons>
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Gói dịch vụ</Th>
                  <Th>Giá khởi điểm</Th>
                  <Th />
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <Link href="google.com">
                      <Text textDecoration="underline">Cơ bản</Text>
                      <Text fontSize="12px" whiteSpace="normal" noOfLines={3}>
                        Mô tả chi tiết về gói dịch vụ tôi đa 3 dòng. Lorem ipsum
                        no more text ...
                      </Text>
                    </Link>
                  </Td>
                  <Td>{numberWithCommas(3000000)} VND</Td>
                  <Td>
                    <Link href="google.com">
                      <Text color={RED_COLOR}>Chọn</Text>
                    </Link>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Link href="google.com">
                      <Text textDecoration="underline">Cơ bản</Text>
                      <Text fontSize="12px" whiteSpace="normal" noOfLines={3}>
                        Mô tả chi tiết về gói dịch vụ tôi đa 3 dòng. Lorem ipsum
                        no more text ...
                      </Text>
                    </Link>
                  </Td>
                  <Td>{numberWithCommas(3000000)} VND</Td>
                  <Td>
                    <Link href="google.com">
                      <Text color={RED_COLOR}>Chọn</Text>
                    </Link>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </VStack>
    </Container>
  );
};

PackagesBox.propTypes = {};
export default PackagesBox;
