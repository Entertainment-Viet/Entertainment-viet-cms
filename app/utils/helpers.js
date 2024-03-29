/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */

import * as Paths from 'constants/routes';
import * as Storages from 'constants/storage';
// TODO: resolve dependency cycle
// eslint-disable-next-line import/no-cycle
import { getFile } from './request';
// import { useHistory } from 'react-router-dom';
// import { getCookie } from 'utils/cookie';

// import { DEFAULT_LOCALE } from 'i18n';

// Language
export const setLanguage = locale => {
  localStorage.setItem(Storages.STORAGE_LANG, locale);
};
// export const getLanguage = () => {
//     const lang = localStorage.getItem(Storages.STORAGE_LANG);
//     return lang ? lang : DEFAULT_LOCALE;
// }

// export const getLanguageText = (item, name="name") => {
//     const lang = getCookie('lang') || DEFAULT_LOCALE;
//     try{
//         return lang == DEFAULT_LOCALE ? item[name] : (item[name + '_' + lang] ? item[name + '_' + lang] : item[name]);
//     } catch(err){
//         return item[name];
//     }
// }

// Handle variables
export const removeEmptyObj = obj => {
  for (const propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === '' ||
      obj[propName].length === 0
    ) {
      delete obj[propName];
    }
  }
  return obj;
};
export const isEmptyObject = obj =>
  obj ? obj.constructor === Object && Object.keys(obj).length > 0 : false;
export const isArray = arr =>
  arr ? arr.constructor === Array && arr.length > 0 : false;
export const isEmptyVar = mVar => {
  if (!mVar) return true;
  return mVar === '' || mVar === '[]' || mVar === '{}';
};
export const getEmptyVar = mVar => {
  if (!mVar) return undefined;
  switch (mVar.constructor) {
    case Object:
      return {};
    case Array:
      return [];
    default:
      return '';
  }
};
export const isJson = mStr => {
  try {
    JSON.parse(mStr);
  } catch (e) {
    return false;
  }
  return true;
};

export const getObjectValueByIds = (obj, ids) => {
  try {
    return ids.map(id => (obj[id] ? obj[id] : ''));
  } catch (err) {
    return '';
  }
};

export const getObjectValueById = (obj, id) => {
  try {
    return obj[id] ? obj[id] : '';
  } catch (err) {
    return '';
  }
};

// Handle urls
export const redirectTo = name => {
  window.location.href = name;
};
// export const redirectBack = value => {
//   const history = useHistory();
//   history.goBack();
// };
export const redirectHome = () => {
  redirectTo(Paths.ROUTE_HOME);
};
export const redirectLogin = () => {
  redirectTo(Paths.ROUTE_LOGIN);
};
export const redirectRegister = () => {
  redirectTo(Paths.ROUTE_REGISTER);
};

export const refreshPage = () => {
  window.location.reload(false);
};

export const getParamUrl = (name, cUrl = '') => {
  try {
    const url = cUrl || window.location.search;
    const queryParams = new URLSearchParams(url);
    return queryParams.get(name);
  } catch (err) {
    return '';
  }
};

export const setParamUrl = (
  param,
  route = window.location.pathname,
  sep = '?',
  title = '',
) => {
  try {
    window.history.replaceState(null, title, route + sep + param);
  } catch (err) {
    console.log(err);
  }
};

export const mapRouteParam = (route, value, param = ':id', fallback = '') => {
  try {
    return route.replace(param, value);
  } catch (err) {
    return fallback || '#';
  }
};

// Handle Errors
export const setError = error => {
  localStorage.setItem(Storages.STORAGE_ERROR, JSON.stringify(error));
};

export const cacthError = error => {
  console.log(error);
};

export const cacthResponse = res => {
  console.log(res);
};

export const getError = () => {
  try {
    const error = localStorage.getItem(Storages.STORAGE_ERROR);
    return JSON.parse(error);
  } catch (err) {
    return '';
  }
};

export const getResErrorCode = res => {
  try {
    return res.data.error_code;
  } catch (err) {
    return 'DEFAULT';
  }
};

export const getResStatus = res => {
  try {
    return res.status;
  } catch (err) {
    return '';
  }
};

export const getErrorCode = () => {
  try {
    const error = getError();
    return getError(error.data.error_code);
  } catch (err) {
    return '';
  }
};

export const removeError = () => {
  localStorage.removeItem(Storages.STORAGE_ERROR);
};

export function toIsoString(date) {
  const tzo = -date.getTimezoneOffset();
  const dif = tzo >= 0 ? '+' : '-';
  const pad = function(num) {
    return (num < 10 ? '0' : '') + num;
  };

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds(),
  )}${dif}${pad(Math.floor(Math.abs(tzo) / 60))}:${pad(Math.abs(tzo) % 60)}`;
}
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function handleAddress(addr) {
  if (addr)
    return `${addr.name}, ${addr.parent.name}, ${addr.parent.parent.name}`;
  return null;
}

export function convertReadableTime(timestamp) {
  return new Date(timestamp).toLocaleString();
}

export async function downloadBase64File(fileKey) {
  const imgExtensions = ['png', 'jpeg', 'jpg'];
  const applicationExtensions = ['pdf'];
  const extensionConfig = {
    image: {
      type: 'image',
      extensions: imgExtensions,
      extension: null,
    },
    application: {
      type: 'application',
      extensions: applicationExtensions,
      extension: null,
    },
  };

  const getBase64FileFromAWS = async keyFile => {
    const response = await getFile(keyFile);
    return Buffer.from(response.data, 'binary').toString('base64');
  };

  const downloadFile = (fileBase64, fileConfig, fileName) => {
    const linkSource = `data:${fileConfig.type}/${
      fileConfig.extension
    };base64,${fileBase64}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const base64Str = await getBase64FileFromAWS(fileKey);
  const [name, extension] = fileKey.split('.');
  let fileConfig = extensionConfig.application;
  if (imgExtensions.includes(extension)) fileConfig = extensionConfig.image;
  fileConfig.extension = extension;
  // triggerBase64Download(base64File, name);
  downloadFile(base64Str, fileConfig, name);
}
