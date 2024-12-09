import EmployeeTableRow from "./EmployeeTableRow.tsx";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

interface Employee {
  employeeId: string;
  employeeName: string;
  department: string;
  assignedDevices: string[] | null;
  location: string;
}

function EmployeesTable() {
  // Simulated data (replace with real API data when back-end is ready)
  const employees: Employee[] = [
    {
      employeeId: "1",
      employeeName: "John Doe",
      department: "IT",
      assignedDevices: ["Laptop-123", "Monitor-456"],
      location: "New York",
    },
    {
      employeeId: "2",
      employeeName: "Jane Smith",
      department: "HR",
      assignedDevices: null,
      location: "Los Angeles",
    },
  ];

  return (
    <Menus>
      <Table columns="0.6fr 1fr 1fr 2fr 1.5fr 0.5fr">
        <Table.Header>
          <div>ID</div>
          <div>Name</div>
          <div>Department</div>
          <div>Assigned Devices</div>
          <div>Location</div>
        </Table.Header>

        <Table.Body
          data={employees}
          render={(employee) => (
            <EmployeeTableRow employee={employee} key={employee.employeeId} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default EmployeesTable;
