/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */
// import { defineMessages } from 'react-intl';

import { translations } from 'locales/translations';
import { t } from 'utils/messages';

export const messages = {
  overview: () => t(translations.preCheckout.overview),
  overviewDesc: () => t(translations.preCheckout.overviewDesc),
  method: () => t(translations.preCheckout.method),
  methodDesc: () => t(translations.preCheckout.methodDesc),
  instantPay: () => t(translations.preCheckout.instantPay),
  laterPay: () => t(translations.preCheckout.laterPay),
};
