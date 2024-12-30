import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.tsx";
import Header from "./Header.tsx";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../store/store.ts";

interface StyledAppLayoutProps {
  isCollapsed: boolean;
}

const StyledAppLayout = styled.div<StyledAppLayoutProps>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isCollapsed ? "6rem 1fr" : "26rem 1fr"};
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  const isCollapsed = useSelector(
    (state: RootState) => state.app.isCollapsedSidebar,
  );
  return (
    <StyledAppLayout isCollapsed={isCollapsed}>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
