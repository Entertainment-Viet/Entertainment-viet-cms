export const API_SERVER = process.env.REACT_APP_API
  ? process.env.REACT_APP_API
  : 'https://boiling-shore-81192.herokuapp.com';
/* COMMON */
export const API_LOGIN = '/auth/realms/ve-sso/protocol/openid-connect/token';
export const API_LOGOUT = '/auth/realms/ve-sso/protocol/openid-connect/logout';
export const API_UPDATE = '/api/admins/:id1/bookings/:id2';
export const SEND_FILE_AWS = '/api/aws/files';
export const API_GET_FILE = 'api/aws/files/:key';
export const API_TALENT_DETAIL = '/api/admins/:id1/talents/:id2';
export const API_ORG_DETAIL = '/api/admins/:id1/organizers/:id2';
/* ACCOUNT */
export const API_ORG_LIST = '/api/admins/:id1/organizers';
export const API_TAL_LIST = '/api/admins/:id1/talents';
export const API_BOOKING_LIST = '/api/admins/:id1/bookings';
/* BD */
export const API_LIST_BOOKING_BD = '/api/admins/:id1/bookings';
/* ACHIEVEMENT */
export const API_ACHIEVEMENT = '/api/admin/:id1/scoreTypes';
