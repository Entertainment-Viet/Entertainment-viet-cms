import styled, { css } from 'styled-components';
import { INACTIVE_COLOR, PRI_FONTCOLOR } from 'constants/styles';
import icoSearch from './img/Search.svg';
import icoArrowDown from './img/ArrowDown.svg';
import icoCalendar from './img/Calendar.svg';

export const Control = css`
  background: #eff0f6;

  font-style: normal;
  font-weight: normal;
  color: ${PRI_FONTCOLOR};
  letter-spacing: 0.75px;

  padding: 0.75rem 1.5rem;
  border-radius: 12px;

  border: 0px;
  width: 100%;

  &:hover,
  &:active {
    opacity: 0.8;
  }
`;

export const Wrapper = styled.div`
  display: block;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  user-select: none;
  margin-bottom: 1rem;

  &.inline{
    margin-right: 1rem;
    display: inline-block;
  }

  &.inline.last-child{
      margin-right: 0px;
  }

  &.inp-l>*{
    padding: 1.25rem 1.5rem;
    margin-bottom: 0.5rem;
  }

  &.inp-s>*{
    padding: 0.5rem 1rem;
  }
  
  &.inp-round>* {
    border-radius: 16px;
  }

  &.inp-rounded>* {
    border-radius: 32px;
  }

  &.left::before,&.right::before{
    content: '';
    position: absolute;

    width: 24px;
    height: 24px;
    top: 50%;
    transform: translateY(-50%);
    background-position: center;
    background-repeat: no-repeat;
    z-index: 2;
  }
  &.left::before{left: 1.5rem;}
  &.right::before{right: 1.5rem;}
  &.left>input, &.left>a, &.left>button, &.left>select{padding-left: 4rem !important;}
  &.right>input, &.right>a, &.right>button, &.right>select{padding-right: 4rem !important;}
  &.search::before{
    background-image: url("${icoSearch}");
  }
  &.select::before{
    background-image: url("${icoArrowDown}");
  }
  &.datetime-picker::before{
    background-image: url("${icoCalendar}");
  }

  &.disabled>input, &.disabled>textarea {
    background-color: ${INACTIVE_COLOR};
  }
`;
