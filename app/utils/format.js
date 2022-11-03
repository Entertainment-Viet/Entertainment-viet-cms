// import moment from 'moment';

export function getDate(date) {
  try {
    // return moment(date).format('DD/MM/YYYY');
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  } catch (err) {
    return '';
  }
}

export function getTime(date) {
  try {
    // return moment(date).format('h:mm');
    const d = new Date(date);
    const h = d.getHours() > 9 ? d.getHours() : `0${d.getHours()}`;
    const m = d.getMinutes() > 9 ? d.getMinutes() : `0${d.getMinutes()}`;
    return `${h}:${m}`;
  } catch (err) {
    return '';
  }
}

export function getDatetime(date) {
  try {
    // return moment(date).format('DD/MM/YYYY - h:mm');
    return `${getDate(date)} - ${getTime(date)}`;
  } catch (err) {
    return '';
  }
}

export function getRemainingTime(date) {
  try {
    const d = new Date();
    const d2 = new Date(date);
    const milSec = d2 - d;
    const d3 = new Date(milSec);
    let nrDays = Math.floor(d3 / 1000 / 60 / 60 / 24);
    let nrHours = Math.floor(d3 / 1000 / 60 / 60) % 24;
    let nrMin = Math.floor(d3 / 1000 / 60) % 60;
    let nrSec = Math.floor(d3 / 1000) % 60;

    nrDays = nrDays > 0 ? nrDays : 0;
    nrHours = nrHours > 0 ? nrHours : 0;
    nrMin = nrMin > 0 ? nrMin : 0;
    nrSec = nrSec > 0 ? nrSec : 0;
    return [nrDays, nrHours, nrMin, nrSec];
    // return arrRemaining.join(':');
  } catch (err) {
    return [];
  }
}

export function isDateBetween(minDate, maxDate) {
  try {
    const min = new Date(minDate);
    const max = new Date(maxDate);
    const now = new Date();
    if (min.getTime() <= now.getTime() <= max.getTime()) {
      return true;
    }
    return false;
    // return moment().isBetween(minDate, maxDate);
  } catch (err) {
    return false;
  }
}

export function currencyFormat(num) {
  try {
    // return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return num ? new Intl.NumberFormat('de-DE').format(parseFloat(num)) : null;
  } catch (err) {
    return '';
  }
}

export function tokenFormat(token) {
  try {
    return token
      ? `${token.toString().slice(0, 6)}...${token.toString().slice(-4)}`
      : token;
  } catch (err) {
    return '';
  }
}
