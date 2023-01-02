/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */
// import { defineMessages } from 'react-intl';

import { translations } from 'locales/translations';
import { t } from 'utils/messages';

export const messages = {
  profile: () => t(translations.BDManagementPage.profile),
  talentTab: () => t(translations.AccountManagementPage.talentTab),
  orgTab: () => t(translations.AccountManagementPage.orgTab),
  allBookings: () => t(translations.AccountManagementPage.allBookings),
  schedule: () => t(translations.BDManagementPage.schedule),
  myAccount: () => t(translations.BDManagementPage.myAccount),
  back: () => t(translations.BDManagementPage.back),
  createPackage: () => t(translations.BDManagementPage.createPackage),
  delete: () => t(translations.BDManagementPage.delete),
  edit: () => t(translations.BDManagementPage.edit),
  done: () => t(translations.BDManagementPage.done),
  contact: () => t(translations.BDManagementPage.contact),
  cancel: () => t(translations.BDManagementPage.cancel),
  all: () => t(translations.BDManagementPage.all),
  upcoming: () => t(translations.BDManagementPage.upcoming),
  pending: () => t(translations.BDManagementPage.pending),
  canceled: () => t(translations.BDManagementPage.canceled),
  budget: () => t(translations.BDManagementPage.budget),
  detail: () => t(translations.BDManagementPage.detail),
  achievement: () => t(translations.BDManagementPage.achievement),
};
