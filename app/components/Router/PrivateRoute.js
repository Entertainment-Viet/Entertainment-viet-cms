import React from 'react';

import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Header from 'components/Header';
import Footer from 'components/Footer';

import PageWrapper from 'components/PageWrapper';
function PrivateRoute({ children, isAuthenticated, ...rest }) {
  return (
    <>
      <PageWrapper className="header-column">
        <Header />
        <Route
          {...rest}
          render={({ location, match }) =>
            isAuthenticated ? (
              React.cloneElement(children, { match, location })
            ) : (
              <Redirect
                to={{ pathname: '/login', state: { from: location } }}
              />
            )
          }
        />
        <Footer />
      </PageWrapper>
    </>
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.any.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default PrivateRoute;
