import styled from "styled-components";
import Table from "../../ui/Table.tsx";
import Modal from "../../ui/Modal.tsx";
import Menus from "../../ui/Menus.tsx";
import { HiPencil, HiTrash } from "react-icons/hi2";

import ConfirmDelete from "../../ui/ConfirmDelete.tsx";
import CreateEmployee from "./CreateEmployee.tsx";

const EmployeeID = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const EmployeeName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Department = styled.div`
  font-family: "Sono";
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-grey-700);
`;

const AssignedDevices = styled.div`
  font-family: "Sono";
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-grey-700);
`;

const Location = styled.div`
  font-family: "Sono";
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-grey-700);
`;

interface EmployeeRowProps {
  employee: {
    employeeId: string;
    employeeName: string;
    assignedDevices: string[] | null;
    department: string;
    location: string;
  };
}

function EmployeeRow({ employee }: EmployeeRowProps) {
  const { employeeId, employeeName, assignedDevices, department, location } =
    employee;

  return (
    <Table.Row>
      <EmployeeID>{employeeId}</EmployeeID>
      <EmployeeName>{employeeName}</EmployeeName>
      <Department>{department}</Department>
      <AssignedDevices>
        {assignedDevices && assignedDevices.length > 0
          ? assignedDevices.join(", ")
          : "No devices assigned"}
      </AssignedDevices>
      <Location>{location}</Location>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={employeeId} />

            <Menus.List id={employeeId}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateEmployee employeeToEdit={employee} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="devices"
                disabled={false}
                onConfirm={() => console.log("delete")}
                onCloseModal={() => console.log("delete")}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default EmployeeRow;
