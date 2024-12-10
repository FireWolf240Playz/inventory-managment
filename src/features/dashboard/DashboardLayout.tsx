import styled from "styled-components";
import Stats from "./Stats.tsx";
import DevicesChart from "./DevicesChart.tsx";

const StyledDashboardLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
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
