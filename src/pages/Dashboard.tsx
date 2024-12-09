import DashboardLayout from "../features/dashboard/DashboardLayout.tsx";
import Row from "../ui/Row.tsx";
import Heading from "../ui/Heading.tsx";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
      </Row>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
