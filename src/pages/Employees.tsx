import Row from "../ui/Row.tsx";
import Heading from "../ui/Heading.tsx";
import EmployeesTable from "../features/employees/EmployeeTable.tsx";
import Modal from "../ui/Modal.tsx";
import Button from "../ui/Button.tsx";
import CreateEmployee from "../features/employees/CreateEmployee.tsx";
import { useWindowSize } from "@uidotdev/usehooks";
import { useDispatch } from "react-redux";
import { toggleAdvancedFilterSidebarEmployees } from "../store/slices/appSlice.ts";

function Employees() {
  const { width } = useWindowSize();
  const dispatch = useDispatch();

  return (
    <Modal>
      <Row>
        <Heading as="h1">All Employees</Heading>
      </Row>
      <Row type={"horizontal"} style={{ justifyContent: "end", gap: "2rem" }}>
        <div style={{ marginRight: "auto" }}>
          <Heading as="h2"> Quick actions</Heading>
        </div>
        <Modal.Open opens="createEmployee">
          <Button
            style={{
              width: width !== null && width < 800 ? "100%" : "fit-content",
            }}
          >
            Add employee
          </Button>
        </Modal.Open>
        <Button
          style={{
            width: width !== null && width < 800 ? "100%" : "fit-content",
          }}
          onClick={() => dispatch(toggleAdvancedFilterSidebarEmployees())}
        >
          Advanced filter
        </Button>
      </Row>
      <Row>
        <EmployeesTable />
      </Row>

      <Modal.Window name="createEmployee">
        <CreateEmployee />
      </Modal.Window>
    </Modal>
  );
}

export default Employees;
