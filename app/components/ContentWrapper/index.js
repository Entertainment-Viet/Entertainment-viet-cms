/**
 * Wrapper a content
 */
import React, { Children } from 'react';
import PropTypes from 'prop-types';

import Wrapper from './Wrapper';
import Inner from './Inner';
function ContentWrapper(props) {
  return (
    <Wrapper>
      <Inner>{Children.toArray(props.children)}</Inner>
    </Wrapper>
  );
}

ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContentWrapper;
