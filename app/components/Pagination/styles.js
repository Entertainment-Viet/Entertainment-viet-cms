import styled from 'styled-components';
import { PRI_TEXT_COLOR, TEXT_GREEN, TEXT_PURPLE } from 'constants/styles';
export const Container = styled.ul`
  display: flex;
  list-style-type: none;
  justify-content: end;
`;

export const Item = styled.li`
  padding: 0 12px 0 13px;
  height: 32px;
  text-align: center;
  margin: auto 4px;
  color: ${TEXT_PURPLE};
  display: flex;
  box-sizing: border-box;
  align-items: center;
  letter-spacing: 0.01071em;
  border-radius: 5px;
  line-height: 32px;
  font-size: 13px;
  min-width: 32px;
  border: 1px solid ${TEXT_PURPLE};

  &.dots:hover {
    background-color: transparent;
    cursor: default;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    cursor: pointer;
  }

  &.selected {
    background-color: ${TEXT_GREEN};
  }

  &.disabled {
    pointer-events: none;
    display: none;

    .arrow::before {
      border-right: 0.12em solid rgba(0, 0, 0, 0.43);
      border-top: 0.12em solid rgba(0, 0, 0, 0.43);
    }

    &:hover {
      background-color: transparent;
      cursor: default;
    }
  }
`;

export const Arrow = styled.div`
  &::before {
    position: relative;
    content: '';
    display: inline-block;
    width: 0.4em;
    height: 0.4em;
    border-right: 0.12em solid ${PRI_TEXT_COLOR};
    border-top: 0.12em solid ${PRI_TEXT_COLOR};
  }

  &.left {
    transform: rotate(-135deg) translate(-50%);
  }

  &.right {
    transform: rotate(45deg);
  }
`;
