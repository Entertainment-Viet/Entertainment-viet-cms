import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { PRI_FONTCOLOR, PRI_COLOR } from 'constants/styles';

export default styled(NavLink)`
  display: inline-flex;
  padding: 0.5rem 1.5rem;
  margin: 0 auto;
  text-decoration: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  color:  ${PRI_FONTCOLOR};
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  
  &:active, &:hover, &.active {
    color: ${PRI_COLOR};
  }
`;
