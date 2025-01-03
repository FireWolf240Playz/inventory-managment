import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store.ts";
import Table from "../../ui/Table.tsx";
import Menus from "../../ui/Menus.tsx";
import Modal from "../../ui/Modal.tsx";
import { HiPencil, HiSquare2Stack, HiTrash, HiEye } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete.tsx";
import CreateEmployeeForm from "./CreateEmployee.tsx";
import AdvancedFilterSidebar from "../../ui/AdvancedFilterSidebar.tsx";
import AdvancedFilterFormEmployees from "./AdvancedFilterFormEmployees.tsx";
import Pagination from "../../ui/Pagination.tsx";
import ViewWindow from "../../ui/ViewWindow.tsx";

import { selectFilteredEmployees } from "../../store/slices/employees/selectors.ts";
import { selectDevicesMap } from "../../store/slices/devices/selectors.ts";

import { toggleAdvancedFilterSidebarEmployees } from "../../store/slices/appSlice.ts";
import {
  duplicateEmployee,
  editEmployee,
  deleteEmployee,
} from "../../store/slices/employees/employeeSlice.ts";

import { PAGE_SIZE } from "../../utils/constants.ts";
import { useSearchParams } from "react-router-dom";
import { selectLicensesMap } from "../../store/slices/licenses/selectors.ts";

function EmployeesTable() {
  const isCollapsedAdvancedSidebar = useSelector(
    (state: RootState) => state.app.isCollapsedAdvancedSidebarEmployees,
  );
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = currentPage * PAGE_SIZE;

  const employees = useSelector(selectFilteredEmployees);
  const deviceMap = useSelector(selectDevicesMap);
  const licenseMap = useSelector(selectLicensesMap);

  const paginatedEmployees = employees.slice(startIndex, endIndex);

  const handleCloseFilterSidebar = () => {
    dispatch(toggleAdvancedFilterSidebarEmployees());
  };

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
                  {employee.assignedDevices &&
                  employee.assignedDevices.length > 0
                    ? employee.assignedDevices
                        .map(
                          (deviceId) =>
                            deviceMap[deviceId]?.model ?? "Unknown device",
                        )
                        .join(", ")
                    : "No devices assigned"}
                </div>
                <div data-label="Assigned Licenses:">
                  {employee.assignedLicenses &&
                  employee.assignedLicenses.length > 0
                    ? employee.assignedLicenses
                        .map(
                          (licenseId) =>
                            licenseMap[licenseId]?.licenseName ??
                            "Unknown device",
                        )
                        .join(", ")
                    : "No licenses assigned"}
                </div>
                <div data-label="Location:">{employee.location}</div>
                <div data-label="Role:">{employee.role}</div>
                <div data-label="Actions:">
                  <Modal>
                    <Menus.Menu>
                      <Menus.Toggle id={employee.employeeId} />

                      <Menus.List id={employee.employeeId}>
                        <Menus.Button
                          icon={<HiSquare2Stack />}
                          onClick={() => dispatch(duplicateEmployee(employee))}
                        >
                          Duplicate
                        </Menus.Button>

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
                          disabled={false}
                          onConfirm={() =>
                            dispatch(deleteEmployee(employee.employeeId))
                          }
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
                            Assigned: employee.assignedDevices
                              ? employee.assignedDevices
                                  .map(
                                    (deviceId) =>
                                      deviceMap[deviceId]?.model ??
                                      "Unknown device",
                                  )
                                  .join(", ")
                              : "No devices assigned",
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
            <Pagination count={employees.length} />
          </Table.Footer>
        </Table>
      </Menus>
    </>
  );
}

export default EmployeesTable;
