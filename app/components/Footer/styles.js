import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
export const NavBarContainer = styled.div`
  background: #f8f8f8;
  height: 90%;
  width: 15%;
  position: absolute;
  left: 0;
  bottom: 0;
  border-right: 1px solid black;
`;
export const Wrapper = styled.footer`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 3em 5em;
  background: linear-gradient(90deg, #ffffff -25.39%, #2f4797 40.59%);
  @media only screen and (max-width: 1023px) {
    background: linear-gradient(180deg, #ffffff -35.96%, #2f4797 37.04%);
  }
`;
export const Inner = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  color: white;
  @media only screen and (max-width: 1023px) {
    flex-wrap: wrap;
  }
`;
export const LI = styled.li`
  list-style-type: none;
  line-height: 25px;
`;

export const UL = styled.ul`
  margin-top: 112px;
  margin-bottom: 68px;
  @media only screen and (max-width: 1023px) {
    width: 40%;
    margin-top: 25px;
    margin-bottom: 20px;
  }
  @media only screen and (max-width: 500px) {
    padding: 0;
  }
`;
export const CenterElement = styled.div`
  align-self: center;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media only screen and (max-width: 1023px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;
export const FullCenterElement = styled.div`
  align-self: center;
  @media only screen and (max-width: 1023px) {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    margin-top: ${props => (props.isTop ? '45px' : 0)};
  }
`;

export const Slogan = styled.p`
  font-style: normal;
  font-weight: bold;
  font-size: 3rem;
  color: white;
  text-align: center;
  padding-left: 10px;
  white-space: nowrap;
`;

export const H1Element = styled.h3`
  font-family: SVN-Gilroy;
  font-style: normal;
  font-weight: 1000;
  line-height: 17px;
  align-items: center;
  margin-top: 28px;
  margin-bottom: 28px;
  color: white;
  white-space: nowrap;
  font-size: 18px;
  @media screen and (min-width: 1919px) {
    margin-top: 28px;
    margin-bottom: 28px;
  }
  @media screen and (max-width: 1919px) {
    margin-top: 14px;
    margin-bottom: 14px;
  }
  @media screen and (max-width: 1400px) {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

export const A = styled.a`
  color: ${props => (props.color ? props.color : '#14142B')};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #f6a422;
  }
`;

export const DropDownContainer = styled('div')`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const CustomLink = styled(NavLink)`
  text-decoration: none;
  align-items: center;
  color: white;
  font-weight: 400;
  font-size: 16px;
  ${'' /* &:active,
  &:hover,
  &.active {
    color: black;
  } */}
`;

export const CustomExternalLink = styled.a`
  text-decoration: none;
  align-items: center;
  color: white;
  font-weight: 400;
  font-size: 16px;
  ${'' /* &:active,
  &:hover,
  &.active {
    color: black;
  } */}
`;
