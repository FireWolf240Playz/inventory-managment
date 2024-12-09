import DeviceTableRow from "./DeviceTableRow.tsx";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

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
      assignedTo: "",
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
      <Table columns="0.6fr 1.1fr 1fr 1fr 1fr 0.5fr">
        <Table.Header>
          <div>ID</div>
          <div>Model</div>
          <div>Department</div>
          <div>Assigned To</div>
          <div>Status</div>
        </Table.Header>

        <Table.Body
          data={filteredDevices}
          render={(device) => (
            <DeviceTableRow device={device} key={device.deviceId} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default DeviceTable;
