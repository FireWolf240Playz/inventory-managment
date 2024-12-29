import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { duplicateEntity } from "../entityUtils.ts";

export interface Employee {
  employeeId: string;
  employeeName: string;
  department: string;
  assignedDevices: string[] | null;
  location: string;
  role: string[];
}

export interface AddDeviceToEmployeePayload {
  employeeId: string;
  deviceId: string;
}

interface EmployeeFilters {
  employeeId?: string;
  employeeName?: string;
  department?: string;
  role?: string[];
}

interface EmployeeState {
  employees: Employee[];
  filters: EmployeeFilters;
}

const initialState: EmployeeState = {
  employees: [
    {
      employeeId: "1",
      employeeName: "John Doe",
      department: "IT",
      assignedDevices: ["1", "2"], // these are the ids of devices
      location: "New York",
      role: ["Developer"],
    },
    {
      employeeId: "2",
      employeeName: "Jane Smith",
      department: "Human Resources",
      assignedDevices: null,
      location: "Los Angeles",
      role: ["Manager"],
    },
    {
      employeeId: "3",
      employeeName: "Michael Brown",
      department: "Finance",
      assignedDevices: null,
      location: "Chicago",
      role: ["Accountant"],
    },
    {
      employeeId: "4",
      employeeName: "Emily Davis",
      department: "Marketing",
      assignedDevices: null,
      location: "Sofia",
      role: ["Marketing Specialist"],
    },
    {
      employeeId: "5",
      employeeName: "Robert Miller",
      department: "IT",
      assignedDevices: null,
      location: "Sofia",
      role: ["Developer"],
    },
    {
      employeeId: "6",
      employeeName: "Sarah Wilson",
      department: "Human Resources",
      assignedDevices: null,
      location: "New York",
      role: ["Recruiter"],
    },
    {
      employeeId: "7",
      employeeName: "David Anderson",
      department: "Finance",
      assignedDevices: null,
      location: "Chicago",
      role: ["Manager"],
    },
    {
      employeeId: "8",
      employeeName: "Linda Thompson",
      department: "Marketing",
      assignedDevices: null,
      location: "Los Angeles",
      role: ["Manager"],
    },
    {
      employeeId: "9",
      employeeName: "Mark Williams",
      department: "IT",
      assignedDevices: null,
      location: "Seattle",
      role: ["Developer"],
    },
    {
      employeeId: "10",
      employeeName: "James Adams",
      department: "Finance",
      assignedDevices: null,
      location: "Chicago",
      role: ["Paralegal"],
    },
    {
      employeeId: "11",
      employeeName: "Nicole Reed",
      department: "Marketing",
      assignedDevices: null,
      location: "Varna",
      role: ["Coordinator"],
    },
    {
      employeeId: "12",
      employeeName: "William Carter",
      department: "IT",
      assignedDevices: null,
      location: "New York",
      role: ["QA Engineer"],
    },
    {
      employeeId: "13",
      employeeName: "Olivia Green",
      department: "Human Resources",
      assignedDevices: null,
      location: "Los Angeles",
      role: ["Assistant"],
    },
    {
      employeeId: "14",
      employeeName: "Daniel White",
      department: "Finance",
      assignedDevices: null,
      location: "Remote",
      role: ["Analyst"],
    },
  ],
  filters: {},
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setFilter(
      state,
      action: PayloadAction<{
        key: keyof EmployeeFilters;
        value: string | string[];
      }>,
    ) {
      const { key, value } = action.payload;

      if (value === "all" || (Array.isArray(value) && value.length === 0)) {
        state.filters[key] = undefined;
        return;
      }

      if (key === "role") {
        state.filters.role = Array.isArray(value) ? value : [value];
      } else {
        state.filters[key] = Array.isArray(value) ? value[0] : value;
      }
    },

    clearFilters(state) {
      state.filters = {};
    },

    addEmployee(state, action: PayloadAction<Employee>) {
      state.employees.push(action.payload);
    },

    editEmployee(state, action: PayloadAction<Employee>) {
      const index = state.employees.findIndex(
        (emp) => emp.employeeId === action.payload.employeeId,
      );

      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },

    deleteEmployee(state, action: PayloadAction<string>) {
      state.employees = state.employees.filter(
        (emp) => emp.employeeId !== action.payload,
      );
    },
    duplicateEmployee(state, action: PayloadAction<Employee>) {
      const duplicatedEmployee = duplicateEntity(action.payload) as Employee;
      state.employees.push(duplicatedEmployee);
    },
    addDeviceToEmployee(
      state,
      action: PayloadAction<AddDeviceToEmployeePayload>,
    ) {
      const { employeeId, deviceId } = action.payload;
      const employee = state.employees.find(
        (emp) => emp.employeeId === employeeId,
      );

      if (!employee) return state;

      if (!employee.assignedDevices) employee.assignedDevices = [];

      if (!employee.assignedDevices.includes(deviceId)) {
        employee.assignedDevices.push(deviceId);
      }
    },
  },
});

export const {
  setFilter,
  clearFilters,
  addEmployee,
  editEmployee,
  deleteEmployee,
  duplicateEmployee,
  addDeviceToEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;
