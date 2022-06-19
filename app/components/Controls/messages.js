/*
 * NFTPage Messages
 *
 * This contains all the text for the NFTPage container.
 */

import { translations } from 'locales/translations';
import { t } from 'utils/messages';

export const messages = {
  email: () => t(translations.controls.email),
  password: () => t(translations.controls.password),
  required: () => t(translations.controls.required),
  btn_login: () => t(translations.controls.btn_login),
  btn_register: () => t(translations.controls.btn_register),
};
