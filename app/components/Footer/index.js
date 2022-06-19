import React from 'react';
// import { FormattedMessage } from 'react-intl';

// Components
// import Logo from 'components/Logo';
import { getCookie } from 'utils/cookie';
// import { DEFAULT_LOCALE } from 'i18n';
// import Icon, { IconWhite } from './Icon';
// import messages from './messages';
import icoFacebook from './img/facebook.svg';
import icoInstagram from './img/instagram.svg';
import icoTwitter from './img/twitter.svg';
import icoYouTube from './img/youTube.svg';
import ctText from './img/CT TEXT 1.svg';
import ctTextEng from './img/skygateeng.svg';
import { FooterData } from './FooterData';

import {
  H1Element,
  CustomLink,
  LI,
  Wrapper,
  Inner,
  A,
  UL,
  CenterElement,
  FullCenterElement,
  CustomExternalLink,
} from './styles';
function Footer() {
  // const lang = getCookie('lang') || DEFAULT_LOCALE;
  const localStoreFilter = async filter => {
    localStorage.setItem('filter', filter);
  };

  return (
    <Wrapper>
      <Inner>
        <CenterElement>
          {/* <Logo /> */}
        </CenterElement>
        {FooterData.map((value, i) => (
          <UL key={`${i}_ul`}>
            <H1Element>
              <b>{value.h1}</b>
            </H1Element>
            {value.subtitle.map((sub, index) => (
              <LI key={`${index}_li`}>
                {sub.isExternal ? (
                  <CustomExternalLink href={sub.url}>
                    {sub.h2}
                  </CustomExternalLink>
                ) : (
                  <CustomLink
                    exact
                    to={sub.url}
                    onClick={() =>
                      sub.filter ? localStoreFilter(sub.filter) : null
                    }
                  >
                    {sub.h2}
                  </CustomLink>
                )}
              </LI>
            ))}
          </UL>
        ))}
      </Inner>
      <Inner style={{ marginBottom: '15px' }}>
        <FullCenterElement isTop>
          {/* <FormattedMessage {...messages.license} /> */}
        </FullCenterElement>
        <FullCenterElement>
          <CustomLink
            to="/term-of-service"
            color="white"
            style={{ marginRight: '70px' }}
          >
            {/* <FormattedMessage {...messages.term} /> */}
          </CustomLink>
          <CustomLink to="/privacy-policy" color="white">
            {/* <FormattedMessage {...messages.policy} /> */}
          </CustomLink>
        </FullCenterElement>
      </Inner>
    </Wrapper>
  );
}

export default Footer;
