import axios from 'axios';
import { API_SERVER, API_DEL_DEVICE_TOKEN } from 'constants/api';
import { getAuthCookie, eraseAuthCookie } from 'utils/cookie';
import { logout } from 'utils/auth';
import qs from 'qs';
import jwt from 'jwt-decode';

// import { getToken } from '../firebaseInit';

function getLocalToken() {
  const token = window.localStorage.getItem('token');
  return token;
}

// get token o refreshToken
function getLocalRefreshToken() {
  const token = window.localStorage.getItem('refreshToken');
  return token;
}

function getLocalAccessTokenExpire() {
  const expiry = window.localStorage.getItem('exp');
  return expiry;
}

const cRequest = axios.create({
  baseURL: API_SERVER,
  headers: {
    Accept: '*/*',
  },
});

cRequest.defaults.headers.get['content-type'] =
  'application/json; charset=utf-8';
// cRequest.defaults.headers.post['Content-Type'] = 'multipart/form-data';
cRequest.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded; charset=UTF-8';

cRequest.interceptors.request.use(async config => {
  // console.log('Starting Request', JSON.stringify(config, null, 2));
  if (Date.now() > getLocalAccessTokenExpire() * 1000) {
    console.log('expired');
    const data = {
      client_id: 'backend',
      grant_type: 'refresh_token',
      refresh_token: getLocalRefreshToken(),
      scope: 'openid',
    };
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url: `${
        process.env.REACT_KEYCLOAK_API
      }/auth/realms/ve-sso/protocol/openid-connect/token`,
    };
    const result = await axios(options);
    if (result.status === 200) {
      window.localStorage.setItem('token', result.data.access_token);
      window.localStorage.setItem('exp', jwt(result.data.access_token).exp);
    }
  }
  const accessToken = getLocalToken();
  // checking if accessToken exists
  if (accessToken) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

cRequest.interceptors.response.use(
  response => response,
  async error => {
    // extracting response and config objects
    const { response } = error;
    // checking if error is Aunothorized error
    if (response.status === 401) {
      eraseAuthCookie();
      // const deviceToken = await getToken();
      // const formData = new FormData();
      // formData.append('firebase_register_token', deviceToken);
      // const fData = Object.fromEntries(formData.entries());
      // await cRequest.post(API_DEL_DEVICE_TOKEN, fData);
      //   let refreshToken = localStorage.getItem("refreshToken");
      //   if (refreshToken) {
      //     //if refresh token exists in local storage proceed
      //     try {
      //       //try refreshing token
      //       const data = await cRequest.post("/refresh/", {
      //         refresh: refreshToken,
      //       });
      //       let accessToken = data.data.accessToken;
      //       if (accessToken) {
      //         //if request is successiful and token exists in response data
      //         //store it in local storage
      //         localStorage.setItem("accessToken", accessToken);
      //         //with new token retry original request
      //         config.headers["Authorization"] = accessToken;
      //         return cRequest(config);
      //       }
      //     } catch (e) {
      //       console.log(e);
      //     }
      //   }
      logout();
    }

    if (response.status === 400) {
    }

    if (response.status === 500) {
      // setError(response);
      // refreshPage();
    }

    return Promise.resolve(response);
  },
);

export default cRequest;
