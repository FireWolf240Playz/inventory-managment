import { useDispatch, useSelector } from "react-redux";

import { toggleSidebar } from "../store/slices/appSlice.ts";
import styled from "styled-components";

import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { RootState } from "../store/store.ts";

const StyledToggleButton = styled.button<{ isCollapsed: boolean }>`
  background: none;
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 1rem;
  right: ${(props) => (props.isCollapsed ? "50%" : "0")};
  transform: ${(props) => (props.isCollapsed ? "translateX(50%)" : "none")};
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  color: var(--color-grey-600);

  &:hover {
    background-color: var(--color-grey-100);
    color: var(--color-grey-800);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

function ToggleButton() {
  const dispatch = useDispatch();
  const isCollapsed = useSelector(
    (state: RootState) => state.app.isCollapsedSidebar,
  );
  return (
    <StyledToggleButton
      isCollapsed={isCollapsed}
      onClick={() => dispatch(toggleSidebar())}
    >
      {isCollapsed ? <HiChevronRight /> : <HiChevronLeft />}
    </StyledToggleButton>
  );
}

export default ToggleButton;
