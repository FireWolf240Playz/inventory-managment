import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import AdvancedFilterSidebar from "../../ui/AdvancedFilterSidebar.tsx";
import AdvancedFilterDevices from "./AdvancedFilterDevices.tsx";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { setAdvancedFilterSidebarStateDevices } from "../../store/slices/appSlice";
import Modal from "../../ui/Modal.tsx";
import ConfirmDelete from "../../ui/ConfirmDelete.tsx";
import CreateDeviceForm from "./CreateDevice.tsx";
import { Option } from "../../ui/Filter.tsx";
import Tag from "../../ui/Tag.tsx";

interface Device {
  deviceId: string;
  model: string;
  assignedTo: string | null;
  status: 0 | 1 | 2;
  department: string;
}

function DeviceTable() {
  const isCollapsedAdvancedSidebar = useSelector(
    (state: RootState) => state.app.isCollapsedAdvancedSidebarDevices,
  );
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  // Simulated data
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

  function statusToString(statusNum: 0 | 1 | 2): string {
    switch (statusNum) {
      case 0:
        return "available";
      case 1:
        return "in-use";
      case 2:
        return "under-maintenance";
      default:
        return "all";
    }
  }

  // Convert data -> Option[]
  const departmentOptions: Option[] = Array.from(
    new Set(devices.map((d) => d.department)),
  ).map((dept) => ({
    value: dept,
    label: dept,
  }));

  const idOptions: Option[] = devices.map((d) => ({
    value: d.deviceId,
    label: d.deviceId,
  }));

  const assignedToOptions: Option[] = Array.from(
    new Set(devices.map((d) => d.assignedTo || "Unassigned")),
  )
    .filter(Boolean)
    .map((user) => ({
      value: user,
      label: user,
    }));

  const modelOptions: Option[] = Array.from(
    new Set(devices.map((d) => d.model)),
  ).map((model) => ({
    value: model,
    label: model,
  }));

  const statusOptions: Option[] = [
    { value: "all", label: "All" },
    { value: "available", label: "Available" },
    { value: "in-use", label: "In Use" },
    { value: "under-maintenance", label: "Under Maintenance" },
  ];

  // Get filters from URL
  const filterStatus = searchParams.get("status") || "all";
  const filterDept = searchParams.get("department") || "all";
  const filterModel = searchParams.get("model") || "all";
  const filterAssigned = searchParams.get("assignedTo") || "all";
  const filterId = searchParams.get("deviceId") || "all";

  // Filter logic
  let filteredDevices = devices;

  if (filterStatus !== "all") {
    filteredDevices = filteredDevices.filter(
      (d) => statusToString(d.status) === filterStatus,
    );
  }
  if (filterDept !== "all") {
    filteredDevices = filteredDevices.filter(
      (d) => d.department === filterDept,
    );
  }
  if (filterModel !== "all") {
    filteredDevices = filteredDevices.filter((d) => d.model === filterModel);
  }
  if (filterAssigned !== "all") {
    filteredDevices = filteredDevices.filter(
      (d) => (d.assignedTo || "Unassigned") === filterAssigned,
    );
  }
  if (filterId !== "all") {
    filteredDevices = filteredDevices.filter((d) => d.deviceId === filterId);
  }

  // Handlers for apply/clear from the advanced filter form
  const handleApplyFilters = (filters: {
    deviceId?: string;
    model?: string;
    status?: string;
    department?: string;
    assignedTo?: string | null;
  }) => {
    const params: Record<string, string> = {};

    if (filters.status && filters.status !== "all") {
      params.status = filters.status;
    }
    if (filters.department && filters.department !== "all") {
      params.department = filters.department;
    }
    if (filters.model && filters.model !== "all") {
      params.model = filters.model;
    }
    if (filters.assignedTo && filters.assignedTo !== "all") {
      params.assignedTo = filters.assignedTo;
    }
    if (filters.deviceId && filters.deviceId !== "all") {
      params.deviceId = filters.deviceId;
    }

    setSearchParams(params);
    dispatch(setAdvancedFilterSidebarStateDevices(false));
  };

  const handleClearFilters = () => {
    setSearchParams({});
    dispatch(setAdvancedFilterSidebarStateDevices(false));
  };

  // Get initial filters from URL
  const initialFilters = {
    deviceId: searchParams.get("deviceId") || undefined,
    model: searchParams.get("model") || undefined,
    status: searchParams.get("status") || undefined,
    department: searchParams.get("department") || undefined,
    assignedTo: searchParams.get("assignedTo") || undefined,
  };

  return (
    <>
      {isCollapsedAdvancedSidebar && (
        <AdvancedFilterSidebar
          isOpen={isCollapsedAdvancedSidebar}
          onClose={() => dispatch(setAdvancedFilterSidebarStateDevices(false))}
        >
          <AdvancedFilterDevices
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
            idOptions={idOptions}
            departmentOptions={departmentOptions}
            modelOptions={modelOptions}
            assignedToOptions={assignedToOptions}
            statusOptions={statusOptions}
            initialFilters={initialFilters}
          />
        </AdvancedFilterSidebar>
      )}

      <Menus>
        <Table columns="0.5fr 1fr 1fr 1fr 1fr 0.5fr">
          <Table.Header>
            <div>ID</div>
            <div>Model</div>
            <div>Status</div>
            <div>Assigned To</div>
            <div>Department</div>
            <div>Actions</div>
          </Table.Header>

          <Table.Body
            data={filteredDevices}
            render={(device) => (
              <Table.Row key={device.deviceId}>
                <div data-label="ID:">{device.deviceId}</div>
                <div data-label="Model:">{device.model}</div>
                <div data-label="Status:">
                  <Tag status={device.status} />
                </div>
                <div data-label="Assigned To:">
                  {device.assignedTo || "Unassigned"}
                </div>
                <div data-label="Department:">{device.department}</div>

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
    </>
  );
}

export default DeviceTable;
