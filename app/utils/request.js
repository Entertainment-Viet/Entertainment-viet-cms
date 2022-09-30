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

export function get(url, params, id) {
  removeEmptyObj(params);
  let replaceUrl = url;
  if (id) {
    // eslint-disable-next-line no-param-reassign
    replaceUrl = url.replace(':id', id);
  }
  return cRequest
    .get(replaceUrl, { params })
    .then(checkStatus)
    .then(parseJSON);
}

export function del(url, params, id) {
  removeEmptyObj(params);
  console.log(url, id);
  if (id) {
    // eslint-disable-next-line no-param-reassign
    url = url.replace(':id', id);
  }
  return cRequest
    .delete(url, { params })
    .then(checkStatus)
    .then(parseJSON);
}

export function post(url, params, id) {
  removeEmptyObj(params);
  console.log(id);
  let replaceUrl = url;
  if (id) {
    // eslint-disable-next-line no-param-reassign
    replaceUrl = url.replace(':id', id);
  }
  return cRequest
    .post(replaceUrl, params)
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
