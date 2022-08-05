export const API_SERVER = process.env.REACT_APP_API
  ? process.env.REACT_APP_API
  : 'https://boiling-shore-81192.herokuapp.com';
/* COMMON */
export const API_LOGIN = '/auth/realms/ve-sso/protocol/openid-connect/token';
export const API_LOGOUT = '/auth/realms/ve-sso/protocol/openid-connect/logout';
/* NEWS */
export const API_NEWS_LIST = '/news/list';
export const API_NEWS_DETAIL = '/news/detail/'; // :id

/* CONTACT FORM */
export const API_SEND_QNA = '/qna/send';

/* NOTIFICATION */
export const API_SEND_DEVICE_TOKEN = '/user/firebase/register-token';
export const API_DEL_DEVICE_TOKEN = '/user/firebase/remove-token';
export const API_GET_UNREAD_NOTI = '/user/get-userinfo';
