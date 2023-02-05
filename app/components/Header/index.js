import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { Flex, Box, Link, Text } from '@chakra-ui/react';

import { changeSearch, loadData } from 'containers/SearchResultPage/actions';
import {
  changeSearchEvent,
  loadDataEvent,
} from 'containers/EventSearchResultPage/actions';
import { makeSelectSearch } from 'containers/SearchResultPage/selectors';
import { TEXT_PURPLE, TEXT_GREEN } from 'constants/styles';
import { loadDataHeader } from './actions';
import reducer from './reducer';
import saga from './saga';

import { Wrapper } from './styles';
import { makeSelectCartData } from './selectors';
import { logout } from '../../utils/auth';
function HeaderButton({ text, href, isExternal = false }) {
  return (
    <Link href={href} isExternal={isExternal}>
      <Box
        color={TEXT_PURPLE}
        fontWeight="500"
        as="h1"
        lineHeight="tight"
        noOfLines={1}
        _hover={{ color: TEXT_GREEN }}
      >
        {text}
      </Box>
    </Link>
  );
}

const key = 'Header';
function Header() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <Wrapper>
      <Flex justify="space-between">
        <Flex alignItems="center">
          <Box width="50%" />
        </Flex>
        <Text onClick={logout}>Đăng xuất</Text>
        {/* <Box>
          <HStack spacing={8}>
            <form
              styles={{}}
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
                  bg="transparent"
                  placeholder="Search"
                  _placeholder={{ opacity: 1, color: `${TEXT_PURPLE}` }}
                  border={`1px solid ${TEXT_PURPLE}`}
                  borderRadius="2rem"
                />
                <InputLeftElement>
                  <SearchIcon color={TEXT_PURPLE} />
                </InputLeftElement>
              </InputGroup>
            </form>
            <HeaderButton text={t(messages.findTalent())} href="#" />
            <HeaderButton text={t(messages.postJob())} href="#" />
            <HeaderButton
              text={t(messages.openJob())}
              href="https://google.com"
              isExternal
            />
            <Notification />
            {cartData && <Cart data={cartData} />}
            <ProfileAvatar />
          </HStack>
        </Box> */}
      </Flex>
    </Wrapper>
  );
}

Header.propTypes = {};

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
      const role = localStorage.getItem('role');
      if (role === 'organizer') {
        dispatch(changeSearch(search));
        dispatch(loadData());
      } else {
        dispatch(changeSearchEvent(search));
        dispatch(loadDataEvent());
      }
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
