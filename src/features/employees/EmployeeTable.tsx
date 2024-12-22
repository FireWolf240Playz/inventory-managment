import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal.tsx";
import { HiPencil, HiSquare2Stack, HiTrash, HiEye } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete.tsx";
import CreateEmployeeForm from "./CreateEmployee.tsx";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store.ts";
import AdvancedFilterSidebar from "../../ui/AdvancedFilterSidebar.tsx";
import AdvancedFilterFormEmployees from "./AdvancedFilterFormEmployees.tsx";
import { setAdvancedFilterSidebarStateEmployees } from "../../store/slices/appSlice.ts";
import { Option } from "../../ui/Filter.tsx";
import ViewWindow from "../../ui/ViewWindow.tsx";

interface Employee {
  employeeId: string;
  employeeName: string;
  department: string;
  assignedDevices: string[] | null;
  location: string;
  role: string;
}

function EmployeesTable() {
  const isCollapsedAdvancedSidebar = useSelector(
    (state: RootState) => state.app.isCollapsedAdvancedSidebarEmployees,
  );
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // Simulated data
  const employees: Employee[] = [
    {
      employeeId: "1",
      employeeName: "John Doe",
      department: "IT",
      assignedDevices: ["Laptop-123", "Monitor-456"],
      location: "New York",
      role: "Developer",
    },
    {
      employeeId: "2",
      employeeName: "Jane Smith",
      department: "HR",
      assignedDevices: null,
      location: "Los Angeles",
      role: "Manager",
    },
  ];

  const departmentsOptions: Option[] = Array.from(
    new Set(employees.map((d) => d.department)),
  ).map((dept) => ({
    value: dept,
    label: dept,
  }));

  // Extract filters from URL
  const getCurrentFilters = (): Partial<Employee> => {
    const department = searchParams.get("department") || undefined;
    const employeeName = searchParams.get("employeeName") || undefined;
    const employeeId = searchParams.get("employeeId") || undefined;
    const role = searchParams.get("role") || undefined;
    return { department, employeeName, employeeId, role };
  };

  const currentFilters = getCurrentFilters();

  // Filter employees
  const filteredEmployees = employees.filter((emp) => {
    if (
      currentFilters.department &&
      emp.department !== currentFilters.department
    )
      return false;
    if (
      currentFilters.employeeName &&
      emp.employeeName !== currentFilters.employeeName
    )
      return false;
    if (
      currentFilters.employeeId &&
      emp.employeeId !== currentFilters.employeeId
    )
      return false;
    if (currentFilters.role && emp.role !== currentFilters.role) return false;

    return true;
  });

  // Handlers to apply or clear filters
  const handleApplyFilters = (filters: Partial<Employee>) => {
    const params: Record<string, string> = {};
    if (filters.department && filters.department !== "all") {
      params.department = filters.department;
    }
    if (filters.employeeName && filters.employeeName !== "all") {
      params.employeeName = filters.employeeName;
    }
    if (filters.employeeId && filters.employeeId !== "all") {
      params.employeeId = filters.employeeId;
    }
    if (filters.role && filters.role !== "all") {
      params.role = filters.role;
    }
    setSearchParams(params);
    dispatch(setAdvancedFilterSidebarStateEmployees(false));
  };

  const handleClearFilters = () => {
    setSearchParams({});
    dispatch(setAdvancedFilterSidebarStateEmployees(false));
  };

  return (
    <>
      {isCollapsedAdvancedSidebar && (
        <AdvancedFilterSidebar
          isOpen={isCollapsedAdvancedSidebar}
          onClose={() =>
            dispatch(setAdvancedFilterSidebarStateEmployees(false))
          }
        >
          <AdvancedFilterFormEmployees
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
            //Todo: Will generate them dynamically once the backend is ready
            departments={departmentsOptions}
            roles={["Developer", "Manager"]}
            employeeNames={["John Doe", "Jane Smith"]}
            employeeIds={["1", "2"]}
          />
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
            data={filteredEmployees}
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
