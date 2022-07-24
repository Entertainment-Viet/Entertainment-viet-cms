import cRequest from 'utils/server';
import { removeEmptyObj } from 'utils/helpers';
import axios from 'axios';
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  return response;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function get(url, params) {
  removeEmptyObj(params);
  return cRequest
    .get(url, { params })
    .then(checkStatus)
    .then(parseJSON);
}

export function del(url, params) {
  removeEmptyObj(params);
  return cRequest
    .delete(url, { params })
    .then(checkStatus)
    .then(parseJSON);
}

export function post(url, params) {
  return cRequest
    .post(url, params)
    .then(checkStatus)
    .then(parseJSON);
}

export function put(url, params) {
  return cRequest
    .put(url, params)
    .then(checkStatus)
    .then(parseJSON);
}

export function getUrl(url, params) {
  return axios
    .get(url, params)
    .then(checkStatus)
    .then(parseJSON);
}
