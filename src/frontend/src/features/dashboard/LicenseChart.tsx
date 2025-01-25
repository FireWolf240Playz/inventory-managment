import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import DashboardBox from "./DashboardBox.tsx";
import styled from "styled-components";
import { useLicensesByDepartment } from "../../hooks/hooks/useLicensesByDepartment.ts";
import Spinner from "../../ui/Spinner.tsx";

const ChartContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLicenseChart = styled(DashboardBox)`
  grid-column: 1 / -1;
  height: fit-content;

  /* Customize grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

function LicensesBarChart() {
  const { data, isLoading, error } = useLicensesByDepartment();
  console.log("License data:", data);

  if (isLoading) return <Spinner />;
  if (error) return <StyledLicenseChart>Error: {error}</StyledLicenseChart>;

  return (
    <StyledLicenseChart>
      <ChartContainer>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              label={{
                value: "Department",
                position: "insideBottom",
                offset: -5,
              }}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              label={{
                value: "Number of Licenses",
                angle: -90,
                position: "insideLeft",
              }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip />
            <Bar dataKey="value" fill="#3730a3" name="Licenses" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </StyledLicenseChart>
  );
}

export default LicensesBarChart;
