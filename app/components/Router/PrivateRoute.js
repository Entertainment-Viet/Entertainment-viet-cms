import React,{Fragment}  from "react"

import PropTypes from "prop-types"
import {Route, Redirect} from 'react-router-dom';
import Header from 'components/Header';
import Footer from 'components/Footer';

import PageWrapper from 'components/PageWrapper';
function PrivateRoute({ children, isAuthenticated, hasPermission, ...rest }) {
  return (
    <Fragment>
      <PageWrapper className="header-column">
        <Header />
        <Route
          {...rest}
          render={({ location, match }) => (
            isAuthenticated
            ? hasPermission ? React.cloneElement(children, {match: match, location: location}) : (<Redirect to={{ pathname: '/', state: { from: location } }} />)
            : (<Redirect to={{ pathname: '/login', state: { from: location } }} />)
            )
          }
        />
      </PageWrapper>
      <Footer />
    </Fragment>
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.any.isRequired,
}

export default PrivateRoute;