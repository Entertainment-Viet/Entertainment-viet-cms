import React from 'react';

import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Header from 'components/Header';
// import Footer from 'components/Footer';
import { getLocalRole } from 'utils/auth';

import PageWrapper from 'components/PageWrapper';
import { Flex } from '@chakra-ui/react';
import { ENUM_ROLES } from 'constants/enums';
import Sidebar from '../Header/Sidebar/Sidebar';
function PrivateRoute({ children, isAuthenticated, roles, ...rest }) {
  const getRole = getLocalRole();
  return (
    <Flex>
      {/* <Sidebar /> */}
      <PageWrapper className="header-column">
        <Header />
        <Route
          {...rest}
          render={({ location, match }) => {
            if (roles) {
              if (isAuthenticated && roles.includes(getRole)) {
                return React.cloneElement(children, { match, location });
              }
              if (isAuthenticated && getRole === ENUM_ROLES.OA) {
                return (
                  <Redirect
                    to={{ pathname: '/oa-home', state: { from: location } }}
                  />
                );
              }
              if (isAuthenticated && getRole === ENUM_ROLES.BD) {
                return (
                  <Redirect
                    to={{ pathname: '/bd-home', state: { from: location } }}
                  />
                );
              }
              if (isAuthenticated && getRole === ENUM_ROLES.ACCOUNTANT) {
                return (
                  <Redirect
                    to={{ pathname: '/acc-home', state: { from: location } }}
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
          }}
        />
        {/* <Footer /> */}
      </PageWrapper>
    </Flex>
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.any.isRequired,
  isAuthenticated: PropTypes.bool,
  roles: PropTypes.array,
};

export default PrivateRoute;
