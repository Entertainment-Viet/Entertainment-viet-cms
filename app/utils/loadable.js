import React, { lazy, Suspense } from 'react';
import Loading from 'components/LoadingIndicator';
import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100%;
  min-width: 100%;
  z-index: 99999;
  position: fixed;
  background-color: rgba(255,255,255,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const loadable = (importFunc, { fallback = null } = { fallback: null }) => {
  const LazyComponent = lazy(importFunc);

  return props => (
    <Suspense fallback={fallback ? fallback : <Wrapper><Loading /></Wrapper>}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;
