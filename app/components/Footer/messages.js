/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */
// import { defineMessages } from 'react-intl';

import { translations } from 'locales/translations';
import { t } from 'utils/messages';
import {} from 'constants/routes';

export const messages = {
  categories: () => t(translations.header.categories),
  soloSinger: () => t(translations.header.soloSinger),
  band: () => t(translations.header.band),
  dancer: () => t(translations.header.dancer),
  instru: () => t(translations.header.instru),
  dj: () => t(translations.header.dj),
  stylish: () => t(translations.header.stylish),
  makeup: () => t(translations.header.makeup),
  bartender: () => t(translations.header.bartender),
  about: () => t(translations.footer.about),
  career: () => t(translations.footer.career),
  news: () => t(translations.footer.news),
  partner: () => t(translations.footer.partner),
  privacy: () => t(translations.footer.privacy),
  service: () => t(translations.footer.service),
  support: () => t(translations.footer.support),
  help: () => t(translations.footer.help),
  trust: () => t(translations.footer.trust),
  becomeTalent: () => t(translations.footer.becomeTalent),
  becomeBuyer: () => t(translations.footer.becomeBuyer),
  faq: () => t(translations.footer.faq),
};
