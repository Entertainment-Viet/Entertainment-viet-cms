import {
  getAuthCookie,
  eraseAuthCookie,
  setAuthCookie,
  getCookie,
  setCookie,
  eraseCookie,
} from 'utils/cookie';
import { redirectLogin, isEmptyObject } from 'utils/helpers';
import { COOKIE_USER, COOKIE_TOKEN, COOKIE_LOGINSTATE } from 'constants/cookie';
import { ENUM_USER_ROLE } from 'constants/enums';

const isBrowser = typeof window !== `undefined`;

// User Object
// {
//   "request_id": "string",
//   "data": {
//     "name": "string",
//     "email": "string",
//     "role": "Customer",
//     "avatar": "string",
//     "created_at": "string",
//     "updated_at": "string",
//     "user_id": "string",
//     "active": false,
//     "is_extension": false
//   }
// }

export const getUser = () => {
  try {
    return JSON.parse(getCookie(COOKIE_USER));
  } catch (err) {
    return {};
  }
};

export const getUserInfoById = id => {
  try {
    const mUser = getUser();
    return mUser[id];
  } catch (err) {
    return '';
  }
};

export const getUserEmail = () => {
  const user = getUser();
  return user ? user.email : '';
};

export const getUserId = () => {
  const user = getUser();
  return user ? user.id : '';
};

export const getUserData = () => {
  const user = getUser();
  return user || '';
};

export const updateUser = data => {
  const mUser = getUser();
  setUser(Object.assign(data, mUser));
};

export const setUser = user =>
  isEmptyObject(user)
    ? setCookie(COOKIE_USER, JSON.stringify(user))
    : eraseCookie(COOKIE_USER);
export const setUserLoginStat = user =>
  user ? setCookie(COOKIE_LOGINSTATE, user) : eraseCookie(COOKIE_LOGINSTATE);
const getToken = () => getAuthCookie();
const setToken = accessToken =>
  accessToken ? setAuthCookie(accessToken) : eraseCookie(COOKIE_TOKEN);
export const getUserState = () => getCookie(COOKIE_LOGINSTATE);

export const isLoggedIn = () => {
  if (!isBrowser) return false;

  const Token = getToken();

  return !!Token;
};

export const isAuthor = () => {
  if (!isBrowser) return false;

  const mUser = getUser();
  return mUser.role === ENUM_USER_ROLE.AUT;
};

export const getCurrentUser = () => isBrowser && getUser();

export const getCurrentToken = () => isBrowser && getToken();

export const logout = () => {
  if (!isBrowser) return;
  setUser({});
  eraseAuthCookie();
  redirectLogin();
};

export const setUserData = res => {
  const user = res.data.data;
  const token = user.access_token;

  setUser(user);
  setToken(token, user.access_token_expire);
};
