import React from 'react';

// Components
// import Logo from 'components/Logo';
import { Flex, HStack, VStack, Box, Link } from '@chakra-ui/react';
// import icoFacebook from './img/facebook.svg';
// import icoInstagram from './img/instagram.svg';
// import icoTwitter from './img/twitter.svg';
// import icoYouTube from './img/youTube.svg';
import { useTranslation } from 'react-i18next';
import { PRI_TEXT_COLOR, SEC_TEXT_COLOR } from 'constants/styles';
import { FooterData } from './FooterData';
import { messages } from './messages';

function Footer() {
  const { t } = useTranslation();
  return (
    <>
      <Flex alignItems="flex-start" justify="flex-start">
        <HStack
          pr={6}
          pt={6}
          align="flex-start"
          justify="flex-start"
          spacing="20vw"
        >
          {FooterData.map(value => (
            <VStack align="flex-start">
              <Box
                color={PRI_TEXT_COLOR}
                fontWeight="900"
                as="h1"
                lineHeight="tight"
                noOfLines={1}
                mb={4}
                fontSize="18px"
              >
                <b>{value.h1}</b>
              </Box>
              {value.subtitle.map(subVal => (
                <Link href={subVal.url}>
                  <Box
                    fontWeight="500"
                    lineHeight="tight"
                    noOfLines={1}
                    color={SEC_TEXT_COLOR}
                  >
                    {t(messages[subVal.h2]())}
                  </Box>
                </Link>
              ))}
            </VStack>
          ))}
        </HStack>
      </Flex>
      <HStack pr={6} mt={20} mb={6}>
        <Box
          color={PRI_TEXT_COLOR}
          mr="36"
          fontWeight="500"
          as="h1"
          lineHeight="tight"
          noOfLines={1}
        >
          Entertainment Viet
        </Box>
        <Box as="span" color={SEC_TEXT_COLOR}>
          Entertainment Viet Ltd. 2022
        </Box>
      </HStack>
    </>
  );
}

export default Footer;
