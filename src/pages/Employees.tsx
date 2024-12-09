import Row from "../ui/Row.tsx";
import Heading from "../ui/Heading.tsx";
import EmployeesTable from "../features/employees/EmployeeTable.tsx";

function Employees() {
  return (
    <>
      <Row>
        <Heading as="h1">All Employees</Heading>
      </Row>

      <Row>
        <EmployeesTable />
      </Row>
    </>
  );
}

export default Employees;
