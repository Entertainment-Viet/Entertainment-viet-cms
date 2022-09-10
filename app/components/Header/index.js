import React, { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import qs from 'qs';
import axios from 'axios';
import PropTypes from 'prop-types';

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
  MenuGroup,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import {
  PRI_TEXT_COLOR,
  RED_COLOR,
  LIGHT_GRAY,
  PRI_BACKGROUND,
} from 'constants/styles';
import cRequest from 'utils/server';
import {
  getResStatus,
  redirectTo,
  cacthError,
  cacthResponse,
} from 'utils/helpers';
import PackagesBox from 'components/PackageBox';
import { logout } from 'utils/auth';
import { getCookie } from 'utils/cookie';

import { changeSearch, loadData } from 'containers/SearchResultPage/actions';
import { makeSelectSearch } from 'containers/SearchResultPage/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { messages } from './messages';
import { Wrapper } from './styles';
import { Notification, NumberedCart } from '../Icon';
import { NumWrapper } from './Wrapper';
import { API_LOGOUT } from '../../constants/api';
import NotificationBox from './NotificationBox';

function Header({ handleSubmit }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);

  const { t } = useTranslation();
  const logoutHandle = async () => {
    console.log(getCookie('refreshToken'));
    const data = {
      client_id: 'backend',
      refresh_token: getCookie('refreshToken'),
    };
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url: `${process.env.REACT_KEYCLOAK_API}${API_LOGOUT}`,
    };
    const result = await axios(options);
    if (result.status === 204) {
      logout();
    } else {
      console.log(`error ${result.status}`);
    }
  };

  useEffect(() => {
    cRequest
      .get('/api/categories')
      .then(res => {
        const status = getResStatus(res);
        if (status === 200) {
          setCategories(res.data);
          console.log(res.data);
        } else if (status === 400) {
          console.log('error while logging out 400');
        } else if (status === 500) {
          console.log('error while logging out 500');
        } else {
          cacthResponse(res);
        }
      })
      .catch(err => cacthError(err));
  }, []);
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
                if (window.location.pathname === '/search') {
                  // changeSearch(searchTerm);
                  handleSubmit(searchTerm);
                } else {
                  redirectTo(`/search?search=${searchTerm}`);
                }
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
            {/* <Notification /> */}
            <Menu onCloseSelect={false}>
              <MenuButton>
                <Notification />
                <NumWrapper>{3}</NumWrapper>
              </MenuButton>
              <MenuList
                minWidth="240px"
                bg={LIGHT_GRAY}
                h="30rem"
                overflow="auto"
                zIndex={999}
                pt={0}
              >
                <MenuGroup>
                  <MenuItem
                    bg={PRI_BACKGROUND}
                    w="100%"
                    h="100%"
                    _hover={{ bg: PRI_BACKGROUND }}
                  >
                    <Box
                      as="h1"
                      color={PRI_TEXT_COLOR}
                      fontSize="24px"
                      m="0.4rem"
                    >
                      Notification
                    </Box>
                    <Link
                      href="https://google.com"
                      right="1rem"
                      position="absolute"
                      borderBottom="1px solid #F7FAFC"
                      fontWeight={400}
                    >
                      <Box as="span" color={PRI_TEXT_COLOR}>
                        Mark all as read
                      </Box>
                    </Link>
                  </MenuItem>
                </MenuGroup>
                <MenuGroup>
                  <MenuItem _hover={{ bg: 'black' }}>
                    <NotificationBox />
                  </MenuItem>
                  <Divider w="88%" ml="auto" mr="auto" my="1rem" />
                </MenuGroup>
                <MenuGroup>
                  <MenuItem>
                    <NotificationBox />
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
            <Menu closeOnSelect={false}>
              <MenuButton colorScheme="blue">
                <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              </MenuButton>
              <MenuList minWidth="240px">
                <MenuOptionGroup title="Manager" type="button">
                  <Link href="/manager">
                    <MenuItemOption>My manager</MenuItemOption>
                  </Link>
                </MenuOptionGroup>
                <MenuDivider />
                <MenuOptionGroup title="Logout" type="button">
                  <MenuItemOption onClick={logoutHandle}>Logout</MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
            <Menu onCloseSelect={false}>
              <MenuButton>
                {/* <Cart /> */}
                <NumberedCart />
                <NumWrapper>{3}</NumWrapper>
              </MenuButton>
              <MenuList
                minWidth="240px"
                bg={LIGHT_GRAY}
                h="30rem"
                overflow="auto"
                zIndex={999}
              >
                <MenuGroup>
                  <MenuItem _hover={{ bg: 'none' }}>
                    <PackagesBox />
                  </MenuItem>
                </MenuGroup>
                <MenuGroup>
                  <MenuItem _hover={{ bg: 'none' }}>
                    <PackagesBox />
                  </MenuItem>
                </MenuGroup>
                <MenuGroup>
                  <MenuItem _hover={{ bg: 'none' }}>
                    <Button
                      w="100%"
                      bg={RED_COLOR}
                      color={PRI_TEXT_COLOR}
                      _hover={{ bg: 'orange' }}
                    >
                      Thanh toán
                    </Button>
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </HStack>
        </Box>
      </Flex>
      <Divider my={4} />
      <HStack spacing={4}>
        {categories.length > 0
          ? categories.map(value => (
              <>
                <Link href={`/search?category=${value.uid}`} key={value.uid}>
                  <Box
                    color={PRI_TEXT_COLOR}
                    fontWeight="500"
                    as="h1"
                    lineHeight="tight"
                    noOfLines={1}
                    key={`header_${value.url}`}
                  >
                    {/* {t(messages[value.title]())} */}
                    {value.name}
                  </Box>
                </Link>
              </>
              // eslint-disable-next-line indent
            ))
          : null}
      </HStack>
      <Divider mt={4} />
    </Wrapper>
  );
}

Header.propTypes = {
  handleSubmit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  search: makeSelectSearch(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleSubmit: search => {
      dispatch(changeSearch(search));
      dispatch(loadData());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Header);
