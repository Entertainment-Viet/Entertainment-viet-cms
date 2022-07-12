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
import { isLoggedIn, isAuthor } from 'utils/auth';
import * as Paths from 'constants/routes';

// Page
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LoginPage from 'containers/LogInPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import ArtistDetailPage from 'containers/ArtistDetailPage/Loadable';
import CreateEventPage from 'containers/CreateEventPage/Loadable';
import SearchResultPage from 'containers/SearchResultPage/Loadable';
// Components
import GlobalFonts from 'components/GlobalFonts';
import Banner from 'components/DevelopmentBanner';

// Routes
import CommonRoute from 'components/Router/CommonRoute';
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
  // const isAuthenticated = isLoggedIn();
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
          <LoginPage />
        </PublicRoute>
        <CommonRoute
          exact
          path={Paths.ROUTE_HOME}
          // isAuthenticated={isAuthenticated}
        >
          <HomePage />
        </CommonRoute>
        <CommonRoute
          exact
          path={Paths.ROUTE_ARTIST_DETAIL}
          // isAuthenticated={isAuthenticated}
        >
          <ArtistDetailPage />
        </CommonRoute>
        <CommonRoute
          exact
          path={Paths.ROUTE_CREATE_EVENT}
          // isAuthenticated={isAuthenticated}
        >
          <CreateEventPage />
        </CommonRoute>
        <CommonRoute
          exact
          path={Paths.ROUTE_SEARCH_RESULT}
          // isAuthenticated={isAuthenticated}
        >
          <SearchResultPage />
        </CommonRoute>
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
