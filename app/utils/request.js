// TODO: resolve dependency cycle
// eslint-disable-next-line import/no-cycle
import cRequest from 'utils/server';
// eslint-disable-next-line import/no-cycle
import { removeEmptyObj } from 'utils/helpers';
import axios from 'axios';
import { SEND_FILE_AWS, API_GET_FILE } from 'constants/api';
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
  return response.status;
  // const error = new Error(response.statusText);
  // error.response = response;
  // throw error;
}

export function get(url, params, id1, id2, id3) {
  removeEmptyObj(params);
  let replaceUrl = url;
  if (id1 || id2 || id3) {
    // eslint-disable-next-line no-param-reassign
    replaceUrl = url.replace(':id1', id1);
    replaceUrl = replaceUrl.replace(':id2', id2);
    replaceUrl = replaceUrl.replace(':id3', id3);
  }
  return cRequest
    .get(replaceUrl, { params })
    .then(checkStatus)
    .then(parseJSON);
}

export function del(url, params, id1, id2, id3) {
  removeEmptyObj(params);
  let replaceUrl = url;
  if (id1 || id2 || id3) {
    // eslint-disable-next-line no-param-reassign
    replaceUrl = url.replace(':id1', id1);
    replaceUrl = replaceUrl.replace(':id2', id2);
    replaceUrl = replaceUrl.replace(':id3', id3);
  }
  return cRequest
    .delete(replaceUrl, params)
    .then(checkStatus)
    .then(parseJSON);
}

export function post(url, params, id1, id2, id3) {
  removeEmptyObj(params);
  let replaceUrl = url;
  if (id1 || id2 || id3) {
    // eslint-disable-next-line no-param-reassign
    replaceUrl = url.replace(':id1', id1);
    replaceUrl = replaceUrl.replace(':id2', id2);
    replaceUrl = replaceUrl.replace(':id3', id3);
  }
  return cRequest
    .post(replaceUrl, params)
    .then(checkStatus)
    .then(parseJSON);
}

export function put(url, params, id1, id2, id3) {
  removeEmptyObj(params);
  let replaceUrl = url;
  if (id1 || id2 || id3) {
    // eslint-disable-next-line no-param-reassign
    replaceUrl = url.replace(':id1', id1);
    replaceUrl = replaceUrl.replace(':id2', id2);
    replaceUrl = replaceUrl.replace(':id3', id3);
  }
  return cRequest
    .put(replaceUrl, params)
    .then(checkStatus)
    .then(parseJSON);
}

export function sendFileToAWS(file, isPublic = true) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('public', isPublic);
  return post(`${SEND_FILE_AWS}`, formData);
}

export function getUrl(url, params) {
  return axios
    .get(url, params)
    .then(checkStatus)
    .then(parseJSON);
}

export async function getFile(key) {
  const url = `${process.env.REACT_APP_API}/${API_GET_FILE}`;
  let replaceUrl = url;
  if (key) {
    replaceUrl = url.replace(':key', key);
  }
  // eslint-disable-next-line no-return-await
  return await cRequest
    .get(replaceUrl, { responseType: 'arraybuffer' })
    .then(parseJSON);
}

export async function getFileFromAWS(keyFile) {
  const response = await getFile(keyFile);
  const base64Image = Buffer.from(response.data, 'binary').toString('base64');
  return `data:image/*;base64,${base64Image}`;
}
