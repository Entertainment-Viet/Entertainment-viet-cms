import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuOptionGroup,
  MenuDivider,
  Link,
  MenuItemOption,
} from '@chakra-ui/react';
import { logout } from 'utils/auth';
import { getCookie } from 'utils/cookie';
import qs from 'qs';
import axios from 'axios';
import { API_LOGOUT } from '../../constants/api';
// If you want to use your own Selectors look up the Advancaed Story book examples
const ProfileAvatar = () => {
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
  return (
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
  );
};

ProfileAvatar.propTypes = {};
export default ProfileAvatar;
