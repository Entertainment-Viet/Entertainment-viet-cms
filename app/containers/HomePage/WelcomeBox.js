import * as React from 'react';
import { Box } from '@chakra-ui/react';
import { PRI_TEXT_COLOR, SEC_TEXT_COLOR, LIGHT_GRAY } from 'constants/styles';
import Buttons from 'components/Buttons';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';

export default function WelcomeBox() {
  const { t } = useTranslation();

  return (
    <Box
      w="100%"
      paddingInlineStart="0"
      maxW="100%"
      mb={{ base: '1rem', lg: '0px' }}
    >
      <Box
        width="100%"
        height="17.5rem"
        borderWidth="1px"
        borderRadius="lg"
        bg={LIGHT_GRAY}
        color={PRI_TEXT_COLOR}
        position="relative"
      >
        <Box
          p={6}
          display="flex"
          flexDirection="column"
          alignItems="baseline"
          position="absolute"
          top="25%"
        >
          <Box mt="1" fontWeight="500" as="h1" lineHeight="tight" noOfLines={1}>
            {t(messages.welcome())}
          </Box>
          <Box as="span" color={SEC_TEXT_COLOR}>
            Looking for talent for your event ?
          </Box>
          {/* <Button mt="12" colorScheme="orange">
                Post a job
              </Button> */}
          <Buttons mt="12">{t(messages.postJob())}</Buttons>
        </Box>
      </Box>
    </Box>
  );
}
