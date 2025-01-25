import styled from "styled-components";
import Heading from "../../ui/Heading.tsx";
import Stats from "./Stats.tsx";
import DevicesChart from "./DevicesChart.tsx";
import LicenseChart from "./LicenseChart.tsx";

const StyledDashboardLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

function DashboardLayout() {
  return (
    <StyledDashboardLayout>
      <Stats />

      <Heading as="h2">Devices per department </Heading>
      <DevicesChart />
      <Heading as="h2">Licenses per department </Heading>
      <LicenseChart />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
