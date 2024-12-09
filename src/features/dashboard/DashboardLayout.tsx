import styled from "styled-components";
import Stats from "./Stats.tsx";
import DevicesChart from "./DevicesChart.tsx";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  return (
    <StyledDashboardLayout>
      <Stats />

      <DevicesChart />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
