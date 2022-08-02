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
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { PRI_TEXT_COLOR } from 'constants/styles';
import { messages } from './messages';
import { Wrapper } from './styles';
import { HeaderData } from './HeaderData';
import { Cart, Notification, NumberedCart } from '../Icon';
import { NumWrapper } from './Wrapper';

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
          <HStack spacing={8}>
            <Box
              color={PRI_TEXT_COLOR}
              fontWeight="500"
              as="h1"
              lineHeight="tight"
              noOfLines={1}
            >
              {t(messages.findTalent())}
            </Box>
            <Box
              color={PRI_TEXT_COLOR}
              fontWeight="500"
              as="h1"
              lineHeight="tight"
              noOfLines={1}
            >
              {t(messages.postJob())}
            </Box>
            <Link href="https://google.com" isExternal>
              <Box
                color={PRI_TEXT_COLOR}
                fontWeight="500"
                as="h1"
                lineHeight="tight"
                noOfLines={1}
              >
                {t(messages.openJob())}
              </Box>
            </Link>
            <Notification />
            <Menu closeOnSelect={false}>
              <MenuButton colorScheme="blue">
                <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              </MenuButton>
              <MenuList minWidth="240px">
                <MenuOptionGroup defaultValue="asc" title="Order" type="radio">
                  <MenuItemOption value="asc">Ascending</MenuItemOption>
                  <MenuItemOption value="desc">Descending</MenuItemOption>
                </MenuOptionGroup>
                <MenuDivider />
                <MenuOptionGroup title="Country" type="checkbox">
                  <MenuItemOption value="email">Email</MenuItemOption>
                  <MenuItemOption value="phone">Phone</MenuItemOption>
                  <MenuItemOption value="country">Country</MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
            {/* <Cart /> */}
            <NumberedCart />
            <NumWrapper>{3}</NumWrapper>
          </HStack>
        </Box>
      </Flex>
      <Divider my={4} />
      <HStack spacing={4}>
        {HeaderData.map(value => (
          <>
            <Link href={value.url}>
              <Box
                color={PRI_TEXT_COLOR}
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
      <Divider mt={4} />
    </Wrapper>
  );
}

export default Header;
