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

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }

  &[data-theme="dark"] .recharts-cartesian-grid-horizontal line,
  &[data-theme="dark"] .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-700);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

function LicensesBarChart() {
  const { data, isLoading, error } = useLicensesByDepartment();

  const isDarkMode = document.documentElement.classList.contains("dark-mode");

  console.log("License data:", data);

  if (isLoading) return <Spinner />;
  if (error) return <StyledLicenseChart>Error: {error}</StyledLicenseChart>;

  return (
    <StyledLicenseChart data-theme={isDarkMode ? "dark" : "light"}>
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
              tick={{
                fontSize: 12,
                fill: isDarkMode
                  ? "var(--color-grey-100)"
                  : "var(--color-grey-900)",
              }}
            />

            <YAxis
              label={{
                value: "Number of Licenses",
                angle: -90,
                position: "insideLeft",
              }}
              tick={{
                fontSize: 12,
                fill: isDarkMode
                  ? "var(--color-grey-100)"
                  : "var(--color-grey-900)",
              }}
            />

            <Tooltip
              cursor={{
                fill: isDarkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.1)",
              }}
              contentStyle={{
                backgroundColor: isDarkMode
                  ? "var(--color-grey-800)"
                  : "var(--color-grey-100)",
                borderRadius: "8px",
                border: `1px solid ${
                  isDarkMode ? "var(--color-grey-600)" : "var(--color-grey-300)"
                }`,
                color: isDarkMode
                  ? "var(--color-grey-100)"
                  : "var(--color-grey-900)",
              }}
              itemStyle={{
                color: isDarkMode
                  ? "var(--color-grey-100)"
                  : "var(--color-grey-900)",
              }}
            />

            <Bar
              dataKey="value"
              fill={isDarkMode ? "#3b82f6" : "#2563eb"}
              name="Licenses"
              onMouseOver={(e) => console.log("Hovered:", e)}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </StyledLicenseChart>
  );
}

export default LicensesBarChart;
