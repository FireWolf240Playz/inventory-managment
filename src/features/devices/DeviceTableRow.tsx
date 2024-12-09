import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";

import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete.tsx";
import CreateDeviceForm from "./CreateDevice.tsx";
import Tag from "../../ui/Tag.tsx";

const Device = styled.div`
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

const AssignedTo = styled.div`
  font-family: "Sono";
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-grey-700);
`;

const Status = styled.div`
  font-family: "Sono";
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-grey-700);
`;

interface DeviceRowProps {
  device: {
    deviceId: string;
    model: string;
    assignedTo: string | null;
    status: 0 | 1 | 2;
    department: string;
  };
}

function DeviceRow({ device }: DeviceRowProps) {
  const { deviceId, model, department, status, assignedTo } = device;

  return (
    <Table.Row>
      <div>{deviceId}</div>
      <Device>{model}</Device>
      <Department>{department}</Department>
      <AssignedTo>{assignedTo || "Unassinged"} </AssignedTo>{" "}
      <Status>
        <Tag status={status} />
      </Status>
      {/* Will remove this later*/}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={deviceId} />

            <Menus.List id={deviceId}>
              <Menus.Button icon={<HiSquare2Stack />}>Duplicate</Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateDeviceForm deviceToEdit={device} />
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

export default DeviceRow;
