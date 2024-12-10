import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Tag from "../../ui/Tag.tsx";
import Modal from "../../ui/Modal.tsx";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import CreateDeviceForm from "./CreateDevice.tsx";
import ConfirmDelete from "../../ui/ConfirmDelete.tsx";

interface Device {
  deviceId: string;
  model: string;
  assignedTo: string | null;
  status: 0 | 1 | 2;
  department: string;
}

function DeviceTable() {
  const [searchParams] = useSearchParams();

  // Get the filter value from searchParams or default to "all"
  const filterValue = searchParams.get("status") || "all";

  // Simulated data (replace with real API data when back-end is ready)
  const devices: Device[] = [
    {
      deviceId: "1",
      model: "Laptop-123",
      assignedTo: "John Doe",
      status: 1,
      department: "IT",
    },
    {
      deviceId: "2",
      model: "Monitor-456",
      assignedTo: null,
      status: 2,
      department: "HR",
    },
    {
      deviceId: "3",
      model: "Keyboard-789",
      assignedTo: null,
      status: 0,
      department: "IT",
    },
  ];

  // Apply filtering based on the `filterValue`
  let filteredDevices = devices;
  if (filterValue === "all") filteredDevices = devices;
  if (filterValue === "available")
    filteredDevices = devices.filter((device) => device.status === 0);
  if (filterValue === "in-use")
    filteredDevices = devices.filter((device) => device.status === 1);
  if (filterValue === "under-maintenance")
    filteredDevices = devices.filter((device) => device.status === 2);

  return (
    <Menus>
      <Table columns="0.6fr 1.1fr 1fr 1fr  0.5fr">
        <Table.Header>
          <div>ID</div>
          <div>Model</div>
          <div>Status</div>
          <div>Assigned To</div>
          <div>Actions</div>
        </Table.Header>

        <Table.Body
          data={filteredDevices}
          render={(device) => (
            <Table.Row key={device.deviceId}>
              <div data-label="ID:">{device.deviceId}</div>
              <div data-label="Model Name:">{device.model}</div>
              <div data-label="Status:">
                <Tag status={device.status} />
              </div>
              <div data-label="Assigned To:">
                {device.assignedTo ?? "Unassigned"}
              </div>

              <div data-label="Actions:">
                <Modal>
                  <Menus.Menu>
                    <Menus.Toggle id={device.deviceId} />

                    <Menus.List id={device.deviceId}>
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
          )}
        />
      </Table>
    </Menus>
  );
}

export default DeviceTable;
