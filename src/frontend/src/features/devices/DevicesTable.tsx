import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { HiEye, HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import {
  selectFilteredDevices,
  selectStatusOptions,
} from "../../store/slices/devices/selectors.ts";
import { RootState } from "../../store/store.ts";

import { setAdvancedFilterSidebarStateDevices } from "../../store/slices/appSlice.ts";
import {
  duplicateDevice,
  deleteDevice,
  statusMapToStringDevices,
} from "../../store/slices/devices/deviceSlice.ts";

import { useSearchParams } from "react-router-dom";

import Table from "../../ui/Table.tsx";
import Pagination from "../../ui/Pagination.tsx";
import Menus from "../../ui/Menus.tsx";
import Modal from "../../ui/Modal.tsx";
import AdvancedFilterSidebar from "../../ui/AdvancedFilterSidebar.tsx";
import AdvancedFilterDevices from "./AdvancedFilterFormDevices.tsx";
import ConfirmDelete from "../../ui/ConfirmDelete.tsx";
import CreateDeviceForm from "./CreateDevice.tsx";
import ViewWindow from "../../ui/ViewWindow.tsx";
import Tag from "../../ui/Tag.tsx";

import { PAGE_SIZE } from "../../utils/constants.ts";
import { selectEmployeesMap } from "../../store/slices/employees/selectors.ts";

const DeviceTable: React.FC = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const isCollapsedAdvancedSidebar = useSelector(
    (state: RootState) => state.app.isCollapsedAdvancedSidebarDevices,
  );

  const currentFilter = searchParams.get("status") || "all";
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = currentPage * PAGE_SIZE;

  const statusOptions = selectStatusOptions();
  const statusOption = statusOptions.find(
    (option) => option.value === currentFilter,
  );
  const statusCode = statusOption?.statusCode;

  const devices = useSelector(selectFilteredDevices);
  const employeesMap = useSelector(selectEmployeesMap);

  const filteredDevices =
    statusCode === null
      ? devices
      : devices.filter((device) => device.status === statusCode);

  const paginatedDevices = filteredDevices.slice(startIndex, endIndex);

  // Handlers for advanced filter sidebar
  const handleCloseSidebar = () =>
    dispatch(setAdvancedFilterSidebarStateDevices(false));

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
            data={paginatedDevices}
            render={(device) => (
              <Table.Row key={device.deviceId}>
                <div data-label="ID:">{device.deviceId}</div>
                <div data-label="Model:">{device.model}</div>
                <div data-label="Status:">
                  <Tag status={device.status} />
                </div>
                <div data-label="Assigned To:">
                  {device.assignedTo
                    ? employeesMap[device.assignedTo]?.employeeName ||
                      "Unknown employee"
                    : "Unassigned"}
                </div>
                <div data-label="Department:">
                  {device.status === 0 ? "No department" : device.department}
                </div>

                <div data-label="Actions:">
                  <Modal>
                    <Menus.Menu>
                      <Menus.Toggle id={device.deviceId} />

                      <Menus.List id={device.deviceId}>
                        <Menus.Button
                          icon={<HiSquare2Stack />}
                          onClick={() => dispatch(duplicateDevice(device))}
                        >
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
                          onConfirm={() =>
                            dispatch(deleteDevice(device.deviceId))
                          }
                        />
                      </Modal.Window>

                      <Modal.Window name="view">
                        <ViewWindow
                          details={{
                            "Device ID": device.deviceId,
                            Model: device.model,
                            Status: statusMapToStringDevices[device.status],
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
          <Table.Footer>
            <Pagination count={filteredDevices.length} />
          </Table.Footer>
        </Table>
      </Menus>
    </>
  );
};

export default DeviceTable;
