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
import { toggleAdvancedFilterSidebarEmployees } from "../../store/slices/appSlice";

function EmployeesTable() {
  const isCollapsedAdvancedSidebar = useSelector(
    (state: RootState) => state.app.isCollapsedAdvancedSidebarEmployees,
  );
  const dispatch = useDispatch();

  const employees = useSelector(selectFilteredEmployees);

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
                  {employee.assignedDevices?.join(", ") || "No devices"}
                </div>
                <div data-label="Location:">{employee.location}</div>
                <div data-label="Role:">{employee.role}</div>
                <div data-label="Actions:">
                  <Modal>
                    <Menus.Menu>
                      <Menus.Toggle id={employee.employeeId} />

                      <Menus.List id={employee.employeeId}>
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
                        <CreateEmployeeForm employeeToEdit={employee} />
                      </Modal.Window>

                      <Modal.Window name="delete">
                        <ConfirmDelete
                          resourceName="employees"
                          disabled={false}
                          onConfirm={() => console.log("delete")}
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
                              ? employee.assignedDevices.join(", ")
                              : "None",
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
