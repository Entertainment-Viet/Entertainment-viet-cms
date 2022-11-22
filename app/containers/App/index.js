/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
// Others
import { isLoggedIn } from 'utils/auth';
import * as Paths from 'constants/routes';
import { ENUM_ROLES } from 'constants/enums';

// Page
import ManagementPage from 'containers/BDManagementPage/Loadable';
import OAManagementPage from 'containers/OAManagementPage/Loadable';
import KYCVerifyTalentPage from 'containers/KYCVerifyTalentPage/Loadable';
import KYCVerifyOrgPage from 'containers/KYCVerifyOrgPage/Loadable';
import AccManagementPage from 'containers/AccountantManagementPage/Loadable';
import BookingDetailPage from 'containers/BookingDetailPage/Loadable';
import BillDetailPage from 'containers/BillDetailPage/Loadable';

// Components
import GlobalFonts from 'components/GlobalFonts';
import Banner from 'components/DevelopmentBanner';
import LoginPageV2 from 'containers/LoginPageV2/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

// Routes
import PublicRoute from 'components/Router/PublicRoute';
import PrivateRoute from 'components/Router/PrivateRoute';
// Styles
import GlobalStyle from 'global-styles';
import styled from 'styled-components';
import ScrollToTop from 'components/ScrollToTop';

import { requestFirebaseNotificationPermission } from '../../firebaseInit';
const AppWrapper = styled.div`
  margin: 0 auto;
`;

export default function App() {
  const { i18n } = useTranslation();
  const isAuthenticated = isLoggedIn();
  requestFirebaseNotificationPermission()
    .then(firebaseToken => {
      // eslint-disable-next-line no-console
      console.log(firebaseToken);
    })
    .catch(err => err);
  return (
    <AppWrapper>
      <GlobalFonts />
      <Helmet
        titleTemplate="%s - Viet entertainment"
        defaultTitle="Viet entertainment"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Viet entertainment" />
      </Helmet>
      <ScrollToTop />
      <Switch>
        <PublicRoute
          exact
          path={Paths.ROUTE_LOGIN}
          // isAuthenticated={isAuthenticated}
        >
          <LoginPageV2 />
        </PublicRoute>
        <PrivateRoute
          exact
          path={Paths.ROUTE_BD_HOME}
          isAuthenticated={isAuthenticated}
          roles={[ENUM_ROLES.BD]}
        >
          <ManagementPage />
        </PrivateRoute>
        <PrivateRoute
          exact
          path={Paths.ROUTE_OA_HOME}
          isAuthenticated={isAuthenticated}
          roles={[ENUM_ROLES.OA]}
        >
          <OAManagementPage />
        </PrivateRoute>
        <PrivateRoute
          exact
          path={Paths.ROUTE_OA_HOME_VERIFY_TALENT}
          isAuthenticated={isAuthenticated}
          roles={[ENUM_ROLES.OA]}
        >
          <KYCVerifyTalentPage />
        </PrivateRoute>
        <PrivateRoute
          exact
          path={Paths.ROUTE_OA_HOME_VERIFY_ORG}
          isAuthenticated={isAuthenticated}
          roles={[ENUM_ROLES.OA]}
        >
          <KYCVerifyOrgPage />
        </PrivateRoute>
        <PrivateRoute
          exact
          path={Paths.ROUTE_ACC_HOME}
          isAuthenticated={isAuthenticated}
          roles={[ENUM_ROLES.BD]}
        >
          <AccManagementPage />
        </PrivateRoute>
        <PrivateRoute
          exact
          path={Paths.ROUTE_CREATE_PACKAGE}
          isAuthenticated={isAuthenticated}
          roles={[ENUM_ROLES.BD]}
        >
          <BookingDetailPage />
        </PrivateRoute>
        <Route path="*" component={NotFoundPage} />
        <PrivateRoute
          exact
          path={Paths.ROUTE_CREATE_PACKAGE}
          isAuthenticated={isAuthenticated}
          roles={[ENUM_ROLES.ACCOUNTANT]}
        >
          <BillDetailPage />
        </PrivateRoute>
        <Route path="*" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
      <ToastContainer limit={5} autoClose={1500} />
      {(process.env.REACT_APP_ENV === 'dev' ||
        process.env.REACT_APP_ENV === 'stg') && (
        <Banner>{process.env.REACT_APP_ENV.toUpperCase()}</Banner>
      )}
    </AppWrapper>
  );
}
