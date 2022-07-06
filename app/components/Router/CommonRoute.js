import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Header from 'components/Header';
import Footer from 'components/Footer';

import PageWrapper from 'components/PageWrapper';

function CommonRoute({ children, ...rest }) {
  return (
    <Fragment>
      <PageWrapper className="header-column">
        <Header />
        <Route
          {...rest}
          render={({ location, match }) =>
            React.cloneElement(children, {
              location,
              match,
            })
          }
        />
      </PageWrapper>
      <Footer />
    </Fragment>
  );
}

CommonRoute.propTypes = {
  children: PropTypes.any.isRequired,
};

export default CommonRoute;
