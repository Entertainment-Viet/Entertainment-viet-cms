/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */
// import { defineMessages } from 'react-intl';

import { translations } from 'locales/translations';
import { t } from 'utils/messages';

export const messages = {
  orgInfo: () => t(translations.Modal.orgInfo),
  googleMap: () => t(translations.Modal.googleMap),
  postDesc: () => t(translations.Modal.postDesc),
  goToDetail: () => t(translations.Modal.goToDetail),
};
