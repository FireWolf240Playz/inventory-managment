import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

import Modal from "../../ui/Modal.tsx";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete.tsx";
import CreateEmployeeForm from "./CreateEmployee.tsx";

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
            <Table.Row key={employee.employeeId}>
              <div data-label="ID:">{employee.employeeId}</div>
              <div data-label="Employee Name:">{employee.employeeName}</div>
              <div data-label="Location:">
                <span>{employee.location}</span>
              </div>
              <div data-label="Assigned devices:">
                {employee.assignedDevices ?? "No devices"}
              </div>

              <div data-label="Actions:">
                <Modal>
                  <Menus.Menu>
                    <Menus.Toggle id={employee.employeeId} />

                    <Menus.List id={employee.employeeId}>
                      <Menus.Button icon={<HiSquare2Stack />}>
                        Duplicate
                      </Menus.Button>

                      <Modal.Open opens="edit">
                        <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                      </Modal.Open>

                      <Modal.Open opens="delete">
                        <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                      </Modal.Open>
                    </Menus.List>

                    <Modal.Window name="edit">
                      <CreateEmployeeForm employeeToEdit={employee} />
                    </Modal.Window>

                    <Modal.Window name="delete">
                      <ConfirmDelete
                        resourceName="employees"
                        disabled={false}
                        onConfirm={() => console.log("delete")}
                        onCloseModal={() => console.log("delete")}
                      />
                    </Modal.Window>
                  </Menus.Menu>
                </Modal>
              </div>
            </Table.Row>
          )}
        />
      </Table>
    </Menus>
  );
}

export default EmployeesTable;
