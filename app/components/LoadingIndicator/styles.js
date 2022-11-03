import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 0 auto;
  z-index: 99;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Inner = styled.div`
  width: ${props => props.width ? props.width : '3em'};
  height: ${props => props.height ? props.height : '3em'};
  position: absolute;
`;

