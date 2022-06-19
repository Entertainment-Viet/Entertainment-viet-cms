import React from 'react';
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
import { RightBar, NavBar, Wrapper } from './styles';
import HeaderLink from './HeaderLink';
// import messages from './messages';

function Header() {
  return (
    <Wrapper>
      {/* <Logo /> */}
      <RightBar>
        {/* <LocaleToggle /> */}
        <Notification />
        <UserDropdown />
      </RightBar>
      <NavBar>
        <HeaderLink exact to={ROUTE_ABOUT}>
          
        </HeaderLink>
        <HeaderLink to={ROUTE_METAVERSE}>
        </HeaderLink>
        <HeaderLink exact to={ROUTE_NFT}>
        </HeaderLink>
        <HeaderLink to={ROUTE_NEWS}>
        </HeaderLink>
        <HeaderLink to={ROUTE_CONTACT}>
        </HeaderLink>
        <HeaderLink to={ROUTE_ALL_AUTHOR}>
        </HeaderLink>
      </NavBar>
    </Wrapper>
  );
}

export default Header;
