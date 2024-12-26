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
      assignedDevices: ["Laptop-123", "Monitor-456"],
      location: "New York",
      role: ["Developer"],
    },
    {
      employeeId: "2",
      employeeName: "Jane Smith",
      department: "HR",
      assignedDevices: null,
      location: "Los Angeles",
      role: ["Manager"],
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
  },
});

export const {
  setFilter,
  clearFilters,
  addEmployee,
  editEmployee,
  deleteEmployee,
  duplicateEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;
