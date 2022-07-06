import React, { useState } from 'react';
// import { FormattedMessage } from 'react-intl';

// import LocaleToggle from 'containers/LocaleToggle';
// import UserDropdown from 'containers/UserDropdown';
// import Notification from '../Notification';
// import Logo from 'components/Logo';
import {
  ROUTE_ABOUT,
  ROUTE_NFT,
  ROUTE_NEWS,
  ROUTE_METAVERSE,
  ROUTE_CONTACT,
  ROUTE_ALL_AUTHOR,
} from 'constants/routes';
import {
  Flex,
  Box,
  Input,
  Center,
  Spacer,
  HStack,
  Link,
  Avatar,
  Divider,
  InputGroup,
  InputRightElement,
  FormControl,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { RightBar, NavBar, Wrapper } from './styles';
import HeaderLink from './HeaderLink';
// import messages from './messages';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <Wrapper>
      <Flex justify="space-between">
        <Flex alignItems="center">
          <Box
            color="red.500"
            fontWeight="500"
            as="h1"
            lineHeight="tight"
            noOfLines={1}
            mr="8"
          >
            Entertainment Viet
          </Box>
          <Box width="50%">
            <form
              style={{}}
              onSubmit={e => {
                e.preventDefault();
                window.alert(searchTerm);
              }}
            >
              <InputGroup>
                <Input
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  bg="white"
                  placeholder="Basic usage"
                />
                <InputRightElement
                  children={<SearchIcon color="green.500" />}
                />
              </InputGroup>
            </form>
          </Box>
        </Flex>
        <Box>
          <HStack spacing={4}>
            <Box
              color="red.500"
              fontWeight="500"
              as="h1"
              lineHeight="tight"
              noOfLines={1}
            >
              sao ko cách ra
            </Box>
            <Box
              color="red.500"
              fontWeight="500"
              as="h1"
              lineHeight="tight"
              noOfLines={1}
            >
              sao ko cách ra
            </Box>
            <Link href="https://google.com" isExternal>
              <Box
                color="red.500"
                fontWeight="500"
                as="h1"
                lineHeight="tight"
                noOfLines={1}
              >
                sao ko cách ra
              </Box>
            </Link>
            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          </HStack>
        </Box>
      </Flex>
      <Divider my={4} />
      <HStack spacing={4}>
        <Box
          color="red.500"
          fontWeight="500"
          as="h1"
          lineHeight="tight"
          noOfLines={1}
        >
          sao ko cách ra
        </Box>
        <Box
          color="red.500"
          fontWeight="500"
          as="h1"
          lineHeight="tight"
          noOfLines={1}
        >
          sao ko cách ra
        </Box>
        <Box
          color="red.500"
          fontWeight="500"
          as="h1"
          lineHeight="tight"
          noOfLines={1}
        >
          sao ko cách ra
        </Box>
        <Box
          color="red.500"
          fontWeight="500"
          as="h1"
          lineHeight="tight"
          noOfLines={1}
        >
          sao ko cách ra
        </Box>
        <Box
          color="red.500"
          fontWeight="500"
          as="h1"
          lineHeight="tight"
          noOfLines={1}
        >
          sao ko cách ra
        </Box>
      </HStack>
    </Wrapper>
  );
}

export default Header;
