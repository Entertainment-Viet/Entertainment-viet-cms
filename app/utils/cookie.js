/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-escape */
import { COOKIE_TOKEN, COOKIE_EXPIRESDAYS } from 'constants/cookie';

// Cookie
export const setSecureCookie = (name, value, days = COOKIE_EXPIRESDAYS) => {
  setCookie(name, value, days, { secure: true, sameSite: true });
};

export const setCookie = (
  name,
  value,
  days = COOKIE_EXPIRESDAYS,
  options = {},
) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;

  options = {
    path: '/',
    expires,
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value,
  )}`;

  for (const optionKey in options) {
    updatedCookie += `; ${optionKey}`;
    const optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += `=${optionValue}`;
    }
  }

  document.cookie = updatedCookie;
};

export const getCookie = name => {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const eraseCookie = name => {
  setCookie(name, '', {
    'max-age': -999,
  });
};

// Access Token
export const setAuthCookie = (value, days = COOKIE_EXPIRESDAYS) => {
  if (value) {
    setCookie(
      COOKIE_TOKEN,
      value,
      days,
      // ,{
      //     httpOnly: true,
      //     secure: true,
      //     sameSite: true,
      // }
    );
  }
};

export const getAuthCookie = () => getCookie(COOKIE_TOKEN);

export const eraseAuthCookie = () => {
  eraseCookie('token');
  eraseCookie('refreshToken');
  window.localStorage.removeItem('exp');
};
