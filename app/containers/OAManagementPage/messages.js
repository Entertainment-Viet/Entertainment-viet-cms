/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */
// import { defineMessages } from 'react-intl';

import { translations } from 'locales/translations';
import { t } from 'utils/messages';

export const messages = {
  header: () => t(translations.OAManagementPage.header),
  talent: () => t(translations.OAManagementPage.talent),
  organizer: () => t(translations.OAManagementPage.organizer),
  approve: () => t(translations.OAManagementPage.approve),
  decline: () => t(translations.OAManagementPage.decline),
  delete: () => t(translations.OAManagementPage.delete),
};
