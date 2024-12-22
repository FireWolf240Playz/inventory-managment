import React from "react";
import { useEffect } from "react";
import { setDevices } from "../../store/slices/devices/deviceSlice.ts";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { setAdvancedFilterSidebarStateDevices } from "../../store/slices/appSlice";
import { selectFilteredDevices } from "../../store/slices/devices/selectors";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal.tsx";
import { HiEye, HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import AdvancedFilterSidebar from "../../ui/AdvancedFilterSidebar.tsx";
import AdvancedFilterDevices from "./AdvancedFilterDevices.tsx";
import ConfirmDelete from "../../ui/ConfirmDelete.tsx";
import CreateDeviceForm from "./CreateDevice.tsx";
import ViewWindow from "../../ui/ViewWindow.tsx";
import Tag from "../../ui/Tag.tsx";

const DeviceTable: React.FC = () => {
  const dispatch = useDispatch();

  const isCollapsedAdvancedSidebar = useSelector(
    (state: RootState) => state.app.isCollapsedAdvancedSidebarDevices,
  );

  const devices = useSelector(selectFilteredDevices); // Get filtered devices from Redux

  // Handlers for advanced filter sidebar
  const handleCloseSidebar = () =>
    dispatch(setAdvancedFilterSidebarStateDevices(false));

  useEffect(() => {
    // Simulate fetching devices from API
    dispatch(
      setDevices([
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
      ]),
    );
  }, [dispatch]);

  return (
    <>
      {/* Advanced Filter Sidebar */}
      {isCollapsedAdvancedSidebar && (
        <AdvancedFilterSidebar
          isOpen={isCollapsedAdvancedSidebar}
          onClose={handleCloseSidebar}
        >
          <AdvancedFilterDevices />
        </AdvancedFilterSidebar>
      )}

      {/* Devices Table */}
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
            data={devices}
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

                        <Modal.Open opens="view">
                          <Menus.Button icon={<HiEye />}>View</Menus.Button>
                        </Modal.Open>
                      </Menus.List>

                      <Modal.Window name="edit">
                        <CreateDeviceForm deviceToEdit={device} />
                      </Modal.Window>

                      <Modal.Window name="delete">
                        <ConfirmDelete
                          resourceName="devices"
                          onConfirm={() => console.log("delete")}
                        />
                      </Modal.Window>

                      <Modal.Window name="view">
                        <ViewWindow
                          details={{
                            "Device ID": device.deviceId,
                            Model: device.model,
                            Status: device.status.toString(),
                            "Assigned to": device.assignedTo,
                            Department: device.department,
                          }}
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
};

export default DeviceTable;
