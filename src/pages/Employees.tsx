import Row from "../ui/Row.tsx";
import Heading from "../ui/Heading.tsx";
import EmployeesTable from "../features/employees/EmployeeTable.tsx";
import Modal from "../ui/Modal.tsx";
import Button from "../ui/Button.tsx";
import CreateEmployee from "../features/employees/CreateEmployee.tsx";

function Employees() {
  return (
    <Modal>
      <Row>
        <Heading as="h1">All Employees</Heading>
      </Row>

      <Modal.Open opens="createEmployee">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            style={{
              width: "fit-content",
            }}
          >
            Add employee
          </Button>
        </div>
      </Modal.Open>

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
