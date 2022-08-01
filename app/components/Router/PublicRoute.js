import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';
// import Logo from 'components/Logo';

import PageWrapper from 'components/PageWrapper';

function PublicRoute({ children, isAuthenticated, ...rest }) {
  return (
    <PageWrapper className="header-row">
      <Route
        {...rest}
        render={({ location, match }) =>
          !isAuthenticated ? (
            React.cloneElement(children, { match, location })
          ) : (
            <Redirect to={{ pathname: '/', state: { from: location } }} />
          )
        }
      />
    </PageWrapper>
  );
}

PublicRoute.propTypes = {
  children: PropTypes.any.isRequired,
  isAuthenticated: PropTypes.any,
};

export default PublicRoute;
