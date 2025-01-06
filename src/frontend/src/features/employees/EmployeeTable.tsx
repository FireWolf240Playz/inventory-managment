import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store.ts";
import Table from "../../ui/Table.tsx";
import Menus from "../../ui/Menus.tsx";
import Modal from "../../ui/Modal.tsx";
import { HiPencil, HiTrash, HiEye } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete.tsx";
import CreateEmployeeForm from "./CreateEmployee.tsx";
import AdvancedFilterSidebar from "../../ui/AdvancedFilterSidebar.tsx";
import AdvancedFilterFormEmployees from "./AdvancedFilterFormEmployees.tsx";
import Pagination from "../../ui/Pagination.tsx";
import ViewWindow from "../../ui/ViewWindow.tsx";

import { selectFilteredEmployees } from "../../store/slices/employees/selectors.ts";

import { toggleAdvancedFilterSidebarEmployees } from "../../store/slices/appSlice.ts";
import {
  editEmployee,
  setEmployees,
} from "../../store/slices/employees/employeeSlice.ts";

import { Employee } from "../../store/slices/employees/employeeSlice.ts";

import { getEmployees } from "../../services/apiEmployees.ts";
import { PAGE_SIZE } from "../../utils/constants.ts";
import { useSearchParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner.tsx";
import { useEffect, useMemo } from "react";
import { getDevices } from "../../services/apiDevices.ts";
import { getLicenses } from "../../services/apiLicenses.ts";
import { Device, setDevices } from "../../store/slices/devices/deviceSlice.ts";
import {
  License,
  setLicenses,
} from "../../store/slices/licenses/licensesSlice.ts";
import {
  selectDevicesMap,
  selectFilteredDevices,
} from "../../store/slices/devices/selectors.ts";
import {
  selectLicenses,
  selectLicensesMap,
} from "../../store/slices/licenses/selectors.ts";
function EmployeesTable() {
  const dispatch = useDispatch();

  const { data: employees, isLoading: isEmployeesLoading } = useQuery<
    Employee[],
    Error
  >({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  // Fetch devices
  const { data: devices, isLoading: isDevicesLoading } = useQuery<
    Device[],
    Error
  >({
    queryKey: ["devices"],
    queryFn: getDevices,
  });

  // Fetch licenses
  const { data: licenses, isLoading: isLicensesLoading } = useQuery<
    License[],
    Error
  >({
    queryKey: ["licenses"],
    queryFn: getLicenses,
  });

  useEffect(() => {
    if (employees) dispatch(setEmployees(employees));
  }, [dispatch, employees]);

  useEffect(() => {
    if (employees) {
      dispatch(setEmployees(employees));
    }
  }, [dispatch, employees]);

  useEffect(() => {
    if (devices) {
      dispatch(setDevices(devices));
    }
  }, [dispatch, devices]);

  useEffect(() => {
    if (licenses) {
      dispatch(setLicenses(licenses));
    }
  }, [dispatch, licenses]);

  const filteredEmployeesAdvanced = useSelector(selectFilteredEmployees);
  const devicesMap = useSelector(selectDevicesMap);
  const licenseMap = useSelector(selectLicensesMap);

  const isCollapsedAdvancedSidebar = useSelector(
    (state: RootState) => state.app.isCollapsedAdvancedSidebarEmployees,
  );

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = currentPage * PAGE_SIZE;

  const paginatedEmployees = filteredEmployeesAdvanced
    ? filteredEmployeesAdvanced.slice(startIndex, endIndex)
    : [];

  const handleCloseFilterSidebar = () => {
    dispatch(toggleAdvancedFilterSidebarEmployees());
  };

  if (isDevicesLoading || isLicensesLoading || isEmployeesLoading)
    return <Spinner />;

  return (
    <>
      {isCollapsedAdvancedSidebar && (
        <AdvancedFilterSidebar
          isOpen={isCollapsedAdvancedSidebar}
          onClose={handleCloseFilterSidebar}
        >
          <AdvancedFilterFormEmployees />
        </AdvancedFilterSidebar>
      )}

      <Menus>
        <Table columns="0.6fr 1fr 1fr 1.8fr 1.8fr 1.2fr 1fr 0.6fr">
          <Table.Header>
            <div>ID</div>
            <div>Name</div>
            <div>Department</div>
            <div>Assigned Devices</div>
            <div>Assigned Licenses</div>
            <div>Location</div>
            <div>Role</div>
            <div>Actions</div>
          </Table.Header>

          <Table.Body
            data={paginatedEmployees}
            render={(employee) => (
              <Table.Row key={employee.employeeId}>
                <div data-label="ID:">{employee.employeeId}</div>
                <div data-label="Name:">{employee.employeeName}</div>
                <div data-label="Department:">{employee.department}</div>
                <div data-label="Assigned Devices:">
                  {employee.assignedDevices
                    ? employee.assignedDevices
                        ?.map(
                          (devId) =>
                            (devicesMap !== undefined &&
                              devicesMap[devId]?.model) ||
                            "Unknown device",
                        )
                        .join(", ")
                    : "No assigned devices"}
                </div>
                <div data-label="Assigned Licenses:">
                  {employee.assignedLicenses
                    ? employee.assignedLicenses
                        ?.map(
                          (licId) =>
                            licenseMap[licId]?.licenseName || "Unknown device",
                        )
                        .join(", ")
                    : "No assigned licenses"}
                </div>
                <div data-label="Location:">{employee.location}</div>
                <div data-label="Role:">{employee.role}</div>
                <div data-label="Actions:">
                  <Modal>
                    <Menus.Menu>
                      <Menus.Toggle id={employee.employeeId} />

                      <Menus.List id={employee.employeeId}>
                        <Modal.Open opens="edit">
                          <Menus.Button
                            icon={<HiPencil />}
                            onClick={() => dispatch(editEmployee(employee))}
                          >
                            Edit
                          </Menus.Button>
                        </Modal.Open>

                        <Modal.Open opens="delete">
                          <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                        </Modal.Open>

                        <Modal.Open opens="view">
                          <Menus.Button icon={<HiEye />}>View</Menus.Button>
                        </Modal.Open>
                      </Menus.List>

                      <Modal.Window name="edit">
                        <CreateEmployeeForm employeeToEdit={employee} />
                      </Modal.Window>

                      <Modal.Window name="delete">
                        <ConfirmDelete
                          resourceName="employees"
                          id={employee.employeeId}
                        />
                      </Modal.Window>

                      <Modal.Window name="view">
                        <ViewWindow
                          details={{
                            "Employee ID": employee.employeeId,
                            Name: employee.employeeName,
                            Department: employee.department,
                            Role: employee.role,
                            Location: employee.location,
                            "Assigned Devices": employee.assignedDevices
                              ? employee.assignedDevices
                                  ?.map(
                                    (devId) =>
                                      (devicesMap !== undefined &&
                                        devicesMap[devId]?.model) ||
                                      "Unknown device",
                                  )
                                  .join(", ")
                              : "No assigned devices",

                            "Assigned Licenses": employee.assignedLicenses
                              ? employee.assignedLicenses
                                  ?.map(
                                    (licId) =>
                                      (licenseMap !== undefined &&
                                        licenseMap[licId]?.licenseName) ||
                                      "Unknown license",
                                  )
                                  .join(", ")
                              : "No assigned licenses",
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
            <Pagination count={filteredEmployeesAdvanced.length} />
          </Table.Footer>
        </Table>
      </Menus>
    </>
  );
}

export default EmployeesTable;
