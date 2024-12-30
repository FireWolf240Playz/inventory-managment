import styled from "styled-components";
import MainNav from "./MainNav.tsx";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3.2rem;
  height: 100vh;

  &:last-child {
    margin-top: auto;
  }
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
