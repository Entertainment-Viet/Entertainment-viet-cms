/**
 * Wrapper a page
 */
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { device } from 'constants/styles';

const Wrapper = styled.div`
  @media ${device.mob}  {
    padding: 0px 2rem;
    margin: 0 auto;
  }
  @media ${device.tab}  {
    padding: 0px 2rem;
    margin: 4rem auto;
  }
  @media ${device.lap} {
    max-width: calc(1180px + 1rem * 2);
    margin: 0px auto 2rem auto;
  }
`;

function PageWrapper(props) {
  return <Wrapper className={props.className}>{Children.toArray(props.children)}</Wrapper>;
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageWrapper;