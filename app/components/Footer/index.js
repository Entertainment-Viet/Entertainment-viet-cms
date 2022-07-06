import React from 'react';
// import { FormattedMessage } from 'react-intl';

// Components
// import Logo from 'components/Logo';
import { getCookie } from 'utils/cookie';
// import { DEFAULT_LOCALE } from 'i18n';
// import Icon, { IconWhite } from './Icon';
// import messages from './messages';
import { Flex, HStack, VStack, Box } from '@chakra-ui/react';
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

  return (
    <Flex>
      <HStack px={6}>
        <VStack mr="24vw">
          <Box
            color="white"
            fontWeight="900"
            as="h1"
            lineHeight="tight"
            noOfLines={1}
            mb={6}
            fontSize="18px"
          >
            Title
          </Box>
          <Box color="white" fontWeight="500" lineHeight="tight" noOfLines={1}>
            Test
          </Box>
          <Box color="white" fontWeight="500" lineHeight="tight" noOfLines={1}>
            Test
          </Box>
        </VStack>
        <VStack>
          <Box
            color="red.500"
            fontWeight="500"
            as="h1"
            lineHeight="tight"
            noOfLines={1}
          >
            Test
          </Box>
          <Box
            color="red.500"
            fontWeight="500"
            as="h1"
            lineHeight="tight"
            noOfLines={1}
          >
            Test
          </Box>
          <Box
            color="red.500"
            fontWeight="500"
            as="h1"
            lineHeight="tight"
            noOfLines={1}
          >
            Test
          </Box>
        </VStack>
      </HStack>
    </Flex>
  );
}

export default Footer;
