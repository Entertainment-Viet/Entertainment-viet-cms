/*
 * LoginPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import cRequest from 'utils/server';
import {
  redirectHome,
  getResErrorCode,
  getResStatus,
  cacthError,
  cacthResponse,
} from 'utils/helpers';
import { setUserData, setUserLoginStat } from 'utils/auth';
import * as Noti from 'utils/notification';
import { ERROR_PARAMETERS, ERROR_USER_NOT_ACTIVE } from 'constants/errors';

import { API_LOGIN } from 'constants/api';
import { ROUTE_LOGIN } from 'constants/routes';
import { ENUM_USER_ROLE, ENUM_LOGINSTATE } from 'constants/enums';

import Metadata from 'components/Metadata';
import { H1 } from 'components/Elements';
import {
  SimpleGrid,
  Box,
  Image,
  FormLabel,
  Stack,
  HStack,
  FormControl,
  Input,
  Checkbox,
  Button,
  Divider,
  Text,
  Center,
  Link,
} from '@chakra-ui/react';
import { PRI_TEXT_COLOR, LIGHT_GRAY, RED_COLOR } from 'constants/styles';
import OAuthButtonGroup from './OAuthButtonGroup';
import PasswordField from './PasswordField';
import { messages } from './messages';
// import { getToken } from '../../firebaseInit';
import background from './image/register-background.png';

function RegisterPage(props) {
  const { t } = useTranslation();
  // const [isTokenFound, setTokenFound] = useState(false);

  // const [email, setEmail] = useState('');
  // const handleEmailChange = val => setEmail(val);

  // const [emailError, setEmailError] = useState(true);
  // const handleEmailError = val => setEmailError(!!val);

  // const [passError, setPassError] = useState(true);
  // const handlePassError = val => setPassError(!!val);

  // const handleSubmit = e => {
  //   if (!emailError && !passError) {
  //     const formData = new FormData(e.currentTarget);
  //     formData.append('role', props.role ? props.role : ENUM_USER_ROLE.CUS);
  //     const data = Object.fromEntries(formData.entries());

  //     return cRequest
  //       .post(API_LOGIN, data)
  //       .then(async res => {
  //         const status = getResStatus(res);
  //         if (status === 200) {
  //           setUserLoginStat(ENUM_LOGINSTATE.kaibase);
  //           setUserData(res);
  //           Noti.showNotiSuccess(t(messages.success()), {
  //             onClose: () => redirectHome(),
  //           });
  //           // const deviceToken = await getToken(setTokenFound);
  //           // if (deviceToken) {
  //           //   const formData1 = new FormData();
  //           //   formData1.append('firebase_register_token', deviceToken);
  //           //   const fData = Object.fromEntries(formData1.entries());
  //           //   cRequest.post(API_SEND_DEVICE_TOKEN, fData).then(res1 => {
  //           //     const status1 = getResStatus(res1);
  //           //     if (status1 === '200') {
  //           //       console.log('sent');
  //           //     } else if (status1 === '400') {
  //           //       console.log('fail');
  //           //     } else {
  //           //       cacthResponse(res1);
  //           //     }
  //           //   });
  //           // }
  //         } else if (status === 400) {
  //           if (getResErrorCode(res) === ERROR_PARAMETERS) {
  //             Noti.showNotiError(t(messages.error()));
  //           }
  //           if (getResErrorCode(res) === ERROR_USER_NOT_ACTIVE) {
  //             Noti.showNotiError(t(messages.errorUser()));
  //           }
  //         } else {
  //           cacthResponse(res);
  //         }
  //       })
  //       .catch(err => cacthError(err));
  //   }
  //   return false;
  // };

  return (
    <SimpleGrid columns={2}>
      <Metadata />
      <Box>
        <Image
          // boxSize="100%"
          width="100%"
          height="100vh"
          objectFit="cover"
          src={background}
          alt="Dan Abramov"
        />
      </Box>
      <Box
        py={{ base: '0', sm: '8' }}
        px={{ base: '4', sm: '10' }}
        position="relative"
      >
        <Stack
          spacing="6"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="50%"
        >
          <Center>
            <Box color={RED_COLOR} fontWeight="700" fontSize="36px">
              Entertainment Viet
            </Box>
          </Center>
          <Center>
            <Text color="gray.200">{t(messages.welcome())}</Text>
          </Center>
          <Stack spacing="5">
            <FormControl isRequired>
              <FormLabel htmlFor="name" color={PRI_TEXT_COLOR}>
                {t(messages.name())}
              </FormLabel>
              <Input
                id="name"
                type="name"
                bg="white"
                placeholder="Enter your name"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="email" color={PRI_TEXT_COLOR}>
                {t(messages.email())}
              </FormLabel>
              <Input
                id="email"
                type="email"
                bg="white"
                placeholder="Enter your email"
              />
            </FormControl>
            <PasswordField />
          </Stack>
          <HStack justify="space-between">
            <Button variant="link" colorScheme="red" size="sm">
              {t(messages.forgotPassword())}
            </Button>
          </HStack>
          <Stack spacing="6">
            <Button variant="primary" bg={RED_COLOR} color={PRI_TEXT_COLOR}>
              {t(messages.signup())}
            </Button>
            <HStack>
              <Divider />
              <Text fontSize="sm" whiteSpace="nowrap" color={PRI_TEXT_COLOR}>
                {t(messages.continueWith())}
              </Text>
              <Divider />
            </HStack>
            <OAuthButtonGroup />
            <HStack spacing="1" justify="center">
              <Text color={PRI_TEXT_COLOR}>{t(messages.haveAccount())}</Text>
              <Button variant="link" color={RED_COLOR}>
                <Link href={ROUTE_LOGIN}>{t(messages.signin())}</Link>
              </Button>
            </HStack>
          </Stack>
        </Stack>
      </Box>
    </SimpleGrid>
  );
}

RegisterPage.propTypes = { role: PropTypes.any };

export default RegisterPage;
