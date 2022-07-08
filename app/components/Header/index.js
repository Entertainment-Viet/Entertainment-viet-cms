import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// import LocaleToggle from 'containers/LocaleToggle';
// import UserDropdown from 'containers/UserDropdown';
// import Notification from '../Notification';
// import Logo from 'components/Logo';
import {
  Flex,
  Box,
  Input,
  HStack,
  Link,
  Avatar,
  Divider,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { messages } from './messages';
import { Wrapper } from './styles';
import { HeaderData } from './HeaderData';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();
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
                <InputRightElement>
                  <SearchIcon color="green.500" />
                </InputRightElement>
              </InputGroup>
            </form>
          </Box>
        </Flex>
        <Box>
          <HStack spacing={4}>
            <Box
              color="white"
              fontWeight="500"
              as="h1"
              lineHeight="tight"
              noOfLines={1}
            >
              {t(messages.findTalent())}
            </Box>
            <Box
              color="white"
              fontWeight="500"
              as="h1"
              lineHeight="tight"
              noOfLines={1}
            >
              {t(messages.postJob())}
            </Box>
            <Link href="https://google.com" isExternal>
              <Box
                color="white"
                fontWeight="500"
                as="h1"
                lineHeight="tight"
                noOfLines={1}
              >
                {t(messages.openJob())}
              </Box>
            </Link>
            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          </HStack>
        </Box>
      </Flex>
      <Divider my={4} />
      <HStack spacing={4}>
        {HeaderData.map(value => (
          <>
            <Link href={value.url}>
              <Box
                color="white"
                fontWeight="500"
                as="h1"
                lineHeight="tight"
                noOfLines={1}
                key={`header_${value.url}`}
              >
                {t(messages[value.title]())}
              </Box>
            </Link>
          </>
        ))}
      </HStack>
    </Wrapper>
  );
}

export default Header;
