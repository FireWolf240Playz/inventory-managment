import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import {
  selectFilteredDevices,
  selectStatusOptions,
} from "../../store/slices/devices/selectors.ts";
import { RootState } from "../../store/store.ts";

import { setAdvancedFilterSidebarStateDevices } from "../../store/slices/appSlice.ts";
import {
  statusMapToStringDevices,
  setDevices,
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
import { useQuery } from "@tanstack/react-query";
import { getDevices } from "../../services/apiDevices.ts";
import Spinner from "../../ui/Spinner.tsx";
import { getEmployees } from "../../services/apiEmployees.ts";
import { setEmployees } from "../../store/slices/employees/employeeSlice.ts";

const DeviceTable: React.FC = () => {
  const { data: devices, isLoading } = useQuery({
    queryKey: ["devices"],
    queryFn: () => getDevices(),
  });

  const { data: employees, isLoading: isEmployeesLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  const dispatch = useDispatch();
  //Temporarily till the full backend service is done. Now only the barebones of the api is finished. Will refactor later.

  useEffect(() => {
    if (devices) dispatch(setDevices(devices));
  }, [dispatch, devices]);

  useEffect(() => {
    if (employees) dispatch(setEmployees(employees));
  }, [dispatch, employees]);

  const [searchParams] = useSearchParams();

  const isCollapsedAdvancedSidebar = useSelector(
    (state: RootState) => state.app.isCollapsedAdvancedSidebarDevices,
  );
  const filteredDevicesAdvanced = useSelector(selectFilteredDevices);
  const employeesMap = useSelector(selectEmployeesMap);

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

  const filteredDevices =
    statusCode === null
      ? filteredDevicesAdvanced
      : filteredDevicesAdvanced !== undefined &&
        filteredDevicesAdvanced.filter(
          (device) => device.status === statusCode,
        );

  const paginatedDevices = filteredDevices
    ? filteredDevices.slice(startIndex, endIndex)
    : [];

  // Handlers for advanced filter sidebar
  const handleCloseSidebar = () =>
    dispatch(setAdvancedFilterSidebarStateDevices(false));

  if (isLoading || isEmployeesLoading) return <Spinner />;

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
                  {device.assignedTo && employeesMap[device.assignedTo]
                    ? employeesMap[device.assignedTo].employeeName
                    : "Not assigned"}
                </div>
                <div data-label="Department:">
                  {device.status === 0 ? "No department" : device.department}
                </div>

                <div data-label="Actions:">
                  <Modal>
                    <Menus.Menu>
                      <Menus.Toggle id={device.deviceId} />

                      <Menus.List id={device.deviceId}>
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
                          id={device.deviceId}
                        />
                      </Modal.Window>

                      <Modal.Window name="view">
                        <ViewWindow
                          details={{
                            "Device ID": device.deviceId,
                            Model: device.model,
                            Status: statusMapToStringDevices[device.status],
                            "Assigned to":
                              device.assignedTo &&
                              employeesMap[device.assignedTo]
                                ? employeesMap[device.assignedTo].employeeName
                                : "Not assigned",
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
            <Pagination count={filteredDevicesAdvanced.length} />
          </Table.Footer>
        </Table>
      </Menus>
    </>
  );
};

export default DeviceTable;
