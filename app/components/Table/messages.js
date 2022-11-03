/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */
// import { defineMessages } from 'react-intl';

import { translations } from 'locales/translations';
import { t } from 'utils/messages';

export const messages = {
  overview: () => t(translations.artistDetailPage.overview),
  about: () => t(translations.artistDetailPage.about),
  review: () => t(translations.artistDetailPage.review),
  comment: () => t(translations.artistDetailPage.comment),
  description: () => t(translations.artistDetailPage.description),
  basicInfo: () => t(translations.artistDetailPage.basicInfo),
  questions: () => t(translations.artistDetailPage.questions),
  seeMore: () => t(translations.artistDetailPage.seeMore),
  allComment: () => t(translations.artistDetailPage.allComment),
};
