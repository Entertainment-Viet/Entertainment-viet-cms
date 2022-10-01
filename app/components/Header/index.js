import React, { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  Flex,
  Box,
  Input,
  HStack,
  Link,
  Divider,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { PRI_TEXT_COLOR } from 'constants/styles';
import cRequest from 'utils/server';
import {
  getResStatus,
  redirectTo,
  cacthError,
  cacthResponse,
} from 'utils/helpers';

import { changeSearch, loadData } from 'containers/SearchResultPage/actions';
import { makeSelectSearch } from 'containers/SearchResultPage/selectors';
import { loadDataHeader } from './actions';
import reducer from './reducer';
import saga from './saga';

import { messages } from './messages';
import { Wrapper } from './styles';
import Notification from './Notification';
import Categories from './Categories';
import Cart from './Cart';
import ProfileAvatar from './ProfileAvatar';
import { makeSelectCartData } from './selectors';

function HeaderButton({ text, href, isExternal = false }) {
  return (
    <Link href={href} isExternal={isExternal}>
      <Box
        color={PRI_TEXT_COLOR}
        fontWeight="500"
        as="h1"
        lineHeight="tight"
        noOfLines={1}
      >
        {text}
      </Box>
    </Link>
  );
}

const key = 'Header';
function Header({ handleSubmit, handleRefresh, cartData, search }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);

  const { t } = useTranslation();

  const orgId = window.localStorage.getItem('uid');

  useEffect(() => {
    handleRefresh(orgId);
  }, []);

  useEffect(() => {
    cRequest
      .get('/api/categories')
      .then(res => {
        const status = getResStatus(res);
        if (status === 200) {
          setCategories(res.data);
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
                  redirectTo(
                    `/search?search=${searchTerm.replace(/\s/g, '+')}`,
                  );
                }
              }}
            >
              <InputGroup>
                <Input
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  bg="white"
                  placeholder={search}
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
            <HeaderButton text={t(messages.findTalent())} href="#" />
            <HeaderButton text={t(messages.postJob())} href="#" />
            <HeaderButton
              text={t(messages.openJob())}
              href="https://google.com"
              isExternal
            />
            <Notification />
            <ProfileAvatar />
            <Cart data={cartData} />
          </HStack>
        </Box>
      </Flex>
      <Divider my={4} />
      <Categories categories={categories} />
      <Divider mt={4} />
    </Wrapper>
  );
}

Header.propTypes = {
  handleSubmit: PropTypes.func,
  handleRefresh: PropTypes.func,
  cartData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  search: PropTypes.string,
};

HeaderButton.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string,
  isExternal: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  search: makeSelectSearch(),
  cartData: makeSelectCartData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleSubmit: search => {
      dispatch(changeSearch(search));
      dispatch(loadData());
    },
    handleRefresh: id => {
      dispatch(loadDataHeader(id));
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
