// import React from 'react';
import { toast } from 'react-toastify';
// import { useTranslation } from 'react-i18next';
// import messages from 'components/Error/messages';
// const { t } = useTranslation();

export const showNoti = (mText, options = {}) => toast(mText, options);
export const showNotiSuccess = (mText, options = {}) =>
  toast.success(mText, options);
export const showNotiInfo = (mText, options = {}) => toast.info(mText, options);
export const showNotiWarm = (mText, options = {}) => toast.warn(mText, options);
export const showNotiError = (mText, options = {}) =>
  toast.error(mText, options);
// export const showNotiErrorByCode = (mText, options = {}) =>
//   toast.error(<FormattedMessage {...messages[mText]} />, options);
export const removeAllNoti = () => {
  toast.dismiss();
};
export const removeNoti = mId => {
  toast.dismiss(mId);
};
export const isNotiActive = mId => {
  toast.isActive(mId);
};
