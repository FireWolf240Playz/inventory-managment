import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi";
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
  color: #3333;
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
    background-color: var(--color-indigo-700);
    font-size: 1.2rem;
  }

  .arrow {
    width: 1.5rem;
    height: 1.5rem;
    color: #333;
  }
`;

const IconWrapper = styled.span`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.2rem;
  width: fit-content;
  color: #333;
  background-color: #ececec;

  border-radius: 1rem;

  box-shadow: var(--shadow-lg);
  z-index: 100;

  li {
    padding: 1rem 2rem;
    cursor: pointer;

    &:hover {
      background-color: var(--color-indigo-100);
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
      <IconWrapper>
        <Icon />
      </IconWrapper>
      <span className="label">{label}</span>
    </Link>
  </li>
);

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { icon: HiOutlineUser, label: "Account", path: "/account" },
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
