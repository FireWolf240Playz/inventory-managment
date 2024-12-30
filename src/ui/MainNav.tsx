import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiArrowLeftOnRectangle,
  HiOutlineCalendarDays,
  HiOutlineHome,
} from "react-icons/hi2";
import { FaUsers } from "react-icons/fa6";
import { GrLicense } from "react-icons/gr";
import ToggleButton from "./ToggleButton.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../store/store.ts";

interface NavProps {
  isCollapsed: boolean;
}

const StyledNav = styled.nav<NavProps>`
  position: relative;
  width: ${(props) => (props.isCollapsed ? "0" : "fit-content")};
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 4rem;
  height: 100%;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 2rem;
  flex: 1;

  li:last-child {
    margin-top: auto;
  }
`;

const StyledNavLink = styled(NavLink)<NavProps>`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    width: 100%;
    gap: ${(props) => (props.isCollapsed ? "0" : "1.2rem")};

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem ${(props) => (props.isCollapsed ? "1rem" : "2.4rem")};
    transition: all 0.3s;
    justify-content: ${(props) =>
      props.isCollapsed ? "center" : "flex-start"};
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }

  span {
    display: ${(props) => (props.isCollapsed ? "none" : "inline")};
    transition: all 0.3s;
  }
`;

function MainNav() {
  const isCollapsed = useSelector(
    (state: RootState) => state.app.isCollapsedSidebar,
  );

  return (
    <StyledNav isCollapsed={isCollapsed}>
      <ToggleButton />
      <NavList>
        <li>
          <StyledNavLink to="/dashboard" isCollapsed={isCollapsed}>
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/employees" isCollapsed={isCollapsed}>
            <FaUsers />
            <span>Employees</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/devices" isCollapsed={isCollapsed}>
            <HiOutlineCalendarDays />
            <span>Devices</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/licenses" isCollapsed={isCollapsed}>
            <GrLicense />
            <span>Licenses</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/login" isCollapsed={isCollapsed}>
            <HiArrowLeftOnRectangle />
            <span>Log out</span>
          </StyledNavLink>
        </li>
      </NavList>
    </StyledNav>
  );
}

export default MainNav;
