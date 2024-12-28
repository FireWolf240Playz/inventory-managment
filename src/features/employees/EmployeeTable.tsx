import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import { HiPencil, HiSquare2Stack, HiTrash, HiEye } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateEmployeeForm from "./CreateEmployee";
import AdvancedFilterSidebar from "../../ui/AdvancedFilterSidebar";
import AdvancedFilterFormEmployees from "./AdvancedFilterFormEmployees";
import ViewWindow from "../../ui/ViewWindow";
import { selectFilteredEmployees } from "../../store/slices/employees/selectors";
import { selectDevicesMap } from "../../store/slices/devices/selectors.ts";

import { toggleAdvancedFilterSidebarEmployees } from "../../store/slices/appSlice";
import {
  duplicateEmployee,
  editEmployee,
} from "../../store/slices/employees/employeeSlice.ts";
import { deleteEmployee } from "../../store/slices/employees/employeeSlice.ts";

function EmployeesTable() {
  const isCollapsedAdvancedSidebar = useSelector(
    (state: RootState) => state.app.isCollapsedAdvancedSidebarEmployees,
  );
  const dispatch = useDispatch();

  const employees = useSelector(selectFilteredEmployees);

  const handleCloseFilterSidebar = () => {
    dispatch(toggleAdvancedFilterSidebarEmployees());
  };

  const deviceMap = useSelector(selectDevicesMap);

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
        <Table columns="0.6fr 1fr 1fr 1.8fr 1.2fr 1fr 0.6fr">
          <Table.Header>
            <div>ID</div>
            <div>Name</div>
            <div>Department</div>
            <div>Assigned Devices</div>
            <div>Location</div>
            <div>Role</div>
            <div>Actions</div>
          </Table.Header>

          <Table.Body
            data={employees}
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
        </Table>
      </Menus>
    </>
  );
}

export default EmployeesTable;
