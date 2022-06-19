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
import {
  ROUTE_FORGOTPASSWORD,
  ROUTE_VERIFYCODE,
  ROUTE_REGISTER,
} from 'constants/routes';
import { API_LOGIN } from 'constants/api';
import { ENUM_USER_ROLE, ENUM_LOGINSTATE } from 'constants/enums';

// import KardiachainLogin from 'components/KardiachainLogin';
// import MetamaskLogin from 'components/MetamaskLogin';
import ContentWrapper from 'components/ContentWrapper';
import Form from 'components/Form';
import { Line, H1 } from 'components/Elements';
import { ButtonCustom, LinkCustom, InputCustom } from 'components/Controls';
import { messages } from './messages';
// import { getToken } from '../../firebaseInit';

function LoginPage(props) {
  const { t } = useTranslation();
  console.log(t(messages.password()));
  // const [isTokenFound, setTokenFound] = useState(false);

  const [email, setEmail] = useState('');
  const handleEmailChange = val => setEmail(val);

  const [emailError, setEmailError] = useState(true);
  const handleEmailError = val => setEmailError(!!val);

  const [passError, setPassError] = useState(true);
  const handlePassError = val => setPassError(!!val);

  const handleSubmit = e => {
    if (!emailError && !passError) {
      const formData = new FormData(e.currentTarget);
      formData.append('role', props.role ? props.role : ENUM_USER_ROLE.CUS);
      const data = Object.fromEntries(formData.entries());

      return cRequest
        .post(API_LOGIN, data)
        .then(async res => {
          const status = getResStatus(res);
          if (status === 200) {
            setUserLoginStat(ENUM_LOGINSTATE.kaibase);
            setUserData(res);
            Noti.showNotiSuccess(t(messages.success()), {
              onClose: () => redirectHome(),
            });
            // const deviceToken = await getToken(setTokenFound);
            // if (deviceToken) {
            //   const formData1 = new FormData();
            //   formData1.append('firebase_register_token', deviceToken);
            //   const fData = Object.fromEntries(formData1.entries());
            //   cRequest.post(API_SEND_DEVICE_TOKEN, fData).then(res1 => {
            //     const status1 = getResStatus(res1);
            //     if (status1 === '200') {
            //       console.log('sent');
            //     } else if (status1 === '400') {
            //       console.log('fail');
            //     } else {
            //       cacthResponse(res1);
            //     }
            //   });
            // }
          } else if (status === 400) {
            if (getResErrorCode(res) === ERROR_PARAMETERS) {
              Noti.showNotiError(t(messages.error()));
            }
            if (getResErrorCode(res) === ERROR_USER_NOT_ACTIVE) {
              Noti.showNotiError(t(messages.errorUser()));
            }
          } else {
            cacthResponse(res);
          }
        })
        .catch(err => cacthError(err));
    }
    return false;
  };

  return (
    <ContentWrapper>
      <H1>{t(messages.header())}</H1>
      <Form mySubmit={handleSubmit}>
        <InputCustom
          template="inp-l"
          isError={handleEmailError}
          isChange={handleEmailChange}
          pressKey={handleSubmit}
          type="email"
          name="email"
          message={t(messages.email())}
          required
        />
        <InputCustom
          template="inp-l"
          isError={handlePassError}
          pressKey={handleSubmit}
          type="password"
          name="password"
          message={t(messages.password())}
          required
          novalidate
        />
        <LinkCustom href={ROUTE_FORGOTPASSWORD} title={t(messages.forgot())}>
          {t(messages.forgot())}
        </LinkCustom>

        <LinkCustom href={ROUTE_VERIFYCODE + (email ? `?email=${email}` : '')}>
          {t(messages.resendActive())}
        </LinkCustom>
        <ButtonCustom
          disabled={!(!emailError && !passError)}
          type="submit"
          template="btn-pri btn-l btn-icon btn-round btn-spec"
          name="btn_login"
        />
        <ButtonCustom
          template="btn-sec btn-l btn-icon btn-round btn-spec"
          name="btn_register"
          href={ROUTE_REGISTER}
        />
      </Form>
      <Line />
      {/* <KardiachainLogin />
      <MetamaskLogin /> */}
    </ContentWrapper>
  );
}

LoginPage.propTypes = { role: PropTypes.any };

export default LoginPage;
