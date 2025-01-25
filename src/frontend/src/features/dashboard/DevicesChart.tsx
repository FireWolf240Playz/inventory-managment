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
import { useDevicesByDepartment } from "../../hooks/hooks/useDevicesByDepartment.ts";
import Spinner from "../../ui/Spinner.tsx";

const ChartContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledDeviceChart = styled(DashboardBox)`
  grid-column: 1 / -1;
  height: fit-content;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

function DepartmentBarChart() {
  const { data, isLoading, error } = useDevicesByDepartment();
  console.log(data);

  if (isLoading) return <Spinner />;

  if (error) return <StyledDeviceChart>Error: {error}</StyledDeviceChart>;

  return (
    <StyledDeviceChart>
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
                value: "Number of Devices",
                angle: -90,
                position: "insideLeft",
              }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip />
            <Bar dataKey="value" fill="#3730a3" name="Devices" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </StyledDeviceChart>
  );
}

export default DepartmentBarChart;
