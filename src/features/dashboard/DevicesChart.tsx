import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import DashboardBox from "./DashboardBox";
import styled from "styled-components";

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
  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

//TODO: This data will be dynamical once the back end service is ready.
const data = [
  { department: "IT", devices: 50 },
  { department: "HR", devices: 20 },
  { department: "Sales", devices: 30 },
  { department: "Marketing", devices: 10 },
  { department: "Finance", devices: 40 },
];

function DepartmentBarChart() {
  return (
    <StyledDeviceChart>
      <ChartContainer>
        <BarChart
          width={800}
          height={450}
          data={data}
          margin={{
            top: 20,
            right: 30,

            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="department"
            label={{
              value: "Department",
              position: "insideBottom",
              offset: -5,
            }}
          />
          <YAxis
            label={{
              value: "Number of Devices",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />

          <Bar dataKey="devices" fill="#3730a3" name="Devices" />
        </BarChart>
      </ChartContainer>
    </StyledDeviceChart>
  );
}

export default DepartmentBarChart;
