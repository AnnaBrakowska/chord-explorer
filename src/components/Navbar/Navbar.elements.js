import styled from 'styled-components'
import { Row } from '../../globalStyles'
import { Link } from 'react-router-dom'

export const NavbarContainer = styled(Row)`
    height: 80px;
    width: 100%;
    ${Row}
`;

export const NavLogo = styled(Link)`
    justify-self: flex-start;
    color: black;
    cursor: pointer;
    text-decoration:none;
    font-size:2.5rem;
    display: flex;
    align-items: center;
    font-weight: 900;
`

export const MobileIcon = styled.div`
    display : none;

    @media screen and (max-width: 960px) {
        display:block;
        position: absolute;
        top: 0;
        right: 0px;
        transform: translate(-100%, 60%);
        font-size: 2rem;
        cursor: pointer;
    }
`

export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;

    @media screen and (max-width: 960px) {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 90vh;
        position: absolute;
        top: 80px;
        left: ${({ click }) => click ? 0 : '-120%'};
        opacity: 1;
        transition: all 0.5s ease;
        background: white;
        z-index: 999;
    }
`
export const NavItem = styled.li`
  height: 80px;
  border-bottom: 2px solid transparent;
  &:hover {
    border-bottom: 2px solid orange
  }

  @media screen and (max-width: 960px) {
    width: 100%;
    &:hover {
      border: none;
    }
  }
`;

export const NavLink = styled(Link)`
  color: black;
  font-weight: 300;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  height: 100%;

  @media screen and (max-width: 960px) {
    padding: 2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    &:hover {
      color: #4b59f7;
      transition: all 0.3s ease;
    }
  }
`;

export const NavItemBtn = styled.li`
    @media screen and (max-width: 960px) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 120px;
    }
`

export const NavBtnLink = styled(Link)`
    display:flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    height: 100%;
    width: 100%;
    border: none;
`