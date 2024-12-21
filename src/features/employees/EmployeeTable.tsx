import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal.tsx";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete.tsx";
import CreateEmployeeForm from "./CreateEmployee.tsx";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store.ts";
import AdvancedFilterSidebar from "../../ui/AdvancedFilterSidebar.tsx";
import AdvancedFilterForm from "../../ui/AdvancedFilterForm.tsx";
import { setAdvancedFilterSidebarState } from "../../store/slices/appSlice.ts";

interface Employee {
  employeeId: string;
  employeeName: string;
  department: string;
  assignedDevices: string[] | null;
  location: string;
  role: string;
}

function EmployeesTable() {
  // Redux state for advanced sidebar
  const isCollapsedAdvancedSidebar = useSelector(
    (state: RootState) => state.app.isCollapsedAdvancedSidebar,
  );
  const dispatch = useDispatch();

  // For URL-based filtering
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

  // Build unique filter options
  const departments = Array.from(new Set(employees.map((e) => e.department)));
  const roles = Array.from(new Set(employees.map((e) => e.role)));
  const employeeNames = Array.from(
    new Set(employees.map((e) => e.employeeName)),
  );
  const employeeIds = Array.from(new Set(employees.map((e) => e.employeeId)));

  // Current filters from the URL (or undefined if not present)
  const getCurrentFilters = (): Partial<Employee> => {
    const department = searchParams.get("department") || undefined;
    const employeeName = searchParams.get("employeeName") || undefined;
    const employeeId = searchParams.get("employeeId") || undefined;
    const role = searchParams.get("role") || undefined;
    return { department, employeeName, employeeId, role };
  };

  // Handler: apply new filters (update URL parameters)
  const handleApplyFilters = (filters: Partial<Employee>) => {
    const params: Record<string, string> = {};

    // Add to params if not "all" or undefined
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
    // Optionally close the sidebar after applying
    dispatch(setAdvancedFilterSidebarState(false));
  };

  // Handler: clear filters (remove from URL parameters)
  const handleClearFilters = () => {
    setSearchParams({});
    // Optionally close the sidebar after clearing
    dispatch(setAdvancedFilterSidebarState(false));
  };

  const currentFilters = getCurrentFilters();

  const filteredEmployees = employees.filter((emp) => {
    if (
      currentFilters.department &&
      emp.department !== currentFilters.department
    ) {
      return false;
    }
    if (
      currentFilters.employeeName &&
      emp.employeeName !== currentFilters.employeeName
    ) {
      return false;
    }
    if (
      currentFilters.employeeId &&
      emp.employeeId !== currentFilters.employeeId
    ) {
      return false;
    }
    if (currentFilters.role && emp.role !== currentFilters.role) {
      return false;
    }

    return true; // If all checks passed, this employee remains in the array
  });

  return (
    <>
      {/* Conditionally render the advanced filter sidebar */}
      {isCollapsedAdvancedSidebar && (
        <AdvancedFilterSidebar
          isOpen={isCollapsedAdvancedSidebar}
          onClose={() => dispatch(setAdvancedFilterSidebarState(false))}
        >
          {/* Pass the relevant props to the form */}
          <AdvancedFilterForm
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
            departments={departments}
            roles={roles}
            employeeNames={employeeNames}
            employeeIds={employeeIds}
          />
        </AdvancedFilterSidebar>
      )}

      <Menus>
        <Table columns="0.6fr 1fr 1fr 2.5fr 1.5fr 1.5fr 0.5fr">
          <Table.Header>
            <div>ID</div>
            <div>Name</div>
            <div>Location</div>
            <div>Assigned Devices</div>
            <div>Department</div>
            <div>Role</div>
          </Table.Header>

          <Table.Body
            // For demonstration, we're ignoring the filters in the actual data logic
            // In a real app, you'd filter or re-fetch data based on these filters
            data={filteredEmployees}
            render={(employee) => (
              <Table.Row key={employee.employeeId}>
                <span data-label="ID:">{employee.employeeId}</span>
                <span data-label="Employee Name:">{employee.employeeName}</span>
                <span data-label="Location:">
                  <span>{employee.location}</span>
                </span>
                <span data-label="Assigned devices:">
                  {(employee.assignedDevices !== null &&
                    employee.assignedDevices.join(", ")) ||
                    "No devices"}
                </span>
                <span>{employee.department}</span>
                <span>{employee.role}</span>

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
                      </Menus.List>

                      <Modal.Window name="edit">
                        <CreateEmployeeForm employeeToEdit={employee} />
                      </Modal.Window>

                      <Modal.Window name="delete">
                        <ConfirmDelete
                          resourceName="employees"
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

export default EmployeesTable;
