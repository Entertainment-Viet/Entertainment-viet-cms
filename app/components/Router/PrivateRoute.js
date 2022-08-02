import React from 'react';

import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { getLocalRole } from 'utils/auth';

import PageWrapper from 'components/PageWrapper';
function PrivateRoute({ children, isAuthenticated, roles, ...rest }) {
  const getRole = getLocalRole();
  return (
    <>
      <PageWrapper className="header-column">
        <Header />
        <Route
          {...rest}
          render={
            ({ location, match }) => {
              if (roles) {
                if (isAuthenticated && roles.includes(getRole)) {
                  return React.cloneElement(children, { match, location });
                }
                if (isAuthenticated && roles.includes(getRole)) {
                  return (
                    <Redirect
                      to={{ pathname: '/', state: { from: location } }}
                    />
                  );
                }
                return (
                  <Redirect
                    to={{ pathname: '/login', state: { from: location } }}
                  />
                );
              }
              if (isAuthenticated) {
                return React.cloneElement(children, { match, location });
              }
              return (
                <Redirect
                  to={{ pathname: '/login', state: { from: location } }}
                />
              );
            }
            // isAuthenticated ? (
            //   React.cloneElement(children, { match, location })
            // ) : (
            //   <Redirect
            //     to={{ pathname: '/login', state: { from: location } }}
            //   />
            // )
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
  role: PropTypes.array,
};

export default PrivateRoute;
