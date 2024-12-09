import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { useOutsideClick } from "../hooks/useOutsideClick.ts";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
}

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
`;

const AvatarContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-radius: 1rem;
  color: white;
`;

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    color: white;
    border-radius: 50%;
    background-color: var(--color-silver-700);
    font-size: 1.2rem;
  }

  .arrow {
    width: 1.5rem;
    height: 1.5rem;
    color: #333;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.2rem;
  width: fit-content;

  background-color: var(--color-indigo-700);

  border: 1px solid var(--color-silver-100: #374151;);

  box-shadow: var(--shadow-lg);
  z-index: 100;

  li {
    padding: 1.75rem 2rem;
    cursor: pointer;

    &:hover {
      background-color: var(--color-indigo-100);
      color: #333;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;

      .icon {
        width: 1.5rem;
        height: 1.5rem;
      }

      .label {
        font-size: 1.5rem;

        margin-left: 0.75rem;
      }

      &:focus {
        outline: none;
      }
    }
  }
`;

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, path }) => (
  <li>
    <Link to={path}>
      <Icon className="icon" />
      <span className="label">{label}</span>
    </Link>
  </li>
);

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { icon: FaRegUser, label: "Account", path: "/account" },
    { icon: HiArrowLeftOnRectangle, label: "Log out", path: "/login" },
  ];
  //

  const close = () => setDropdownOpen(false);
  const ref = useOutsideClick(close, false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <StyledNav>
      <div onClick={toggleDropdown}>
        <AvatarContainer ref={ref}>
          <AvatarWrapper>
            <div className="avatar">A</div> {/* Placeholder */}
            {dropdownOpen ? (
              <FaChevronUp className="arrow" />
            ) : (
              <FaChevronDown className="arrow" />
            )}
          </AvatarWrapper>
          {dropdownOpen && (
            <DropdownMenu>
              {navItems.map((item, index) => (
                <NavItem
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                />
              ))}
            </DropdownMenu>
          )}
        </AvatarContainer>
      </div>
    </StyledNav>
  );
}

export default Header;
