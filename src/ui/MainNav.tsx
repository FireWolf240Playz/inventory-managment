import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { HiOutlineCalendarDays, HiOutlineHome } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa6";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
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
`;
const StyledImageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5rem 0;
  gap: 0.5rem;
`;

const StyledImage = styled.img`
  width: 50%; /* Limits image width to half of the container width */
  max-width: 10rem; /* Ensures it doesn't grow too large */
  height: auto; /* Maintains aspect ratio */
  object-fit: contain; /* Ensures image fits nicely within the bounds */
`;

const StyledText = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  color: #333;
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <NavLink to="/">
            <StyledImageBox>
              <StyledImage src="/inventory.png" alt="Logo" />
              <StyledText> Inventory system</StyledText>
            </StyledImageBox>
          </NavLink>
        </li>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/devices">
            <HiOutlineCalendarDays />
            <span>Devices</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/employees">
            <FaUsers />
            <span>Employees</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
