import DashboardLayout from "../features/dashboard/DashboardLayout.tsx";
import Row from "../ui/Row.tsx";
import Heading from "../ui/Heading.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../store/store.ts";

function Dashboard() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { name } = user;
  return (
    <>
      <Row type="vertical">
        <Heading as="h1">Dashboard</Heading>
        <Heading as="h2">
          Welcome back, <span>{name}</span> 👋
        </Heading>
      </Row>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
