/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */
// import { defineMessages } from 'react-intl';

import { translations } from 'locales/translations';
import { t } from 'utils/messages';

export const messages = {
  profile: () => t(translations.TalentManagementPage.profile),
  myPackage: () => t(translations.TalentManagementPage.myPackage),
  orders: () => t(translations.TalentManagementPage.orders),
  schedule: () => t(translations.TalentManagementPage.schedule),
  myAccount: () => t(translations.TalentManagementPage.myAccount),
};
