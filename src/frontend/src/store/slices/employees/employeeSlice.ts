import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { duplicateEntity } from "../entityUtils.ts";

export interface Employee {
  employeeId: string;
  employeeName: string;
  department: string;
  assignedDevices: string[] | null;
  assignedLicenses: string[] | null;
  location: string;
  role: string[];
}

interface EmployeeFilters {
  employeeId?: string | string[];
  employeeName?: string | string[];
  department?: string | string[];
  role?: string | string[];
  location?: string | string[];
}

interface EmployeeState {
  employees: Employee[];
  filters: EmployeeFilters;
}

export interface AddDeviceToEmployeePayload {
  employeeId: string;
  deviceId: string;
}

export interface AddLicenseToEmployeePayload {
  employeeId: string;
  licenseId: string;
}

const initialState: EmployeeState = {
  employees: [],
  filters: {},
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setEmployees(state, action: PayloadAction<Employee[]>) {
      state.employees = action.payload;
    },
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

      state.filters[key] = Array.isArray(value) ? value : [value];
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

    addLicenseToEmployee(
      state,
      action: PayloadAction<AddLicenseToEmployeePayload>,
    ) {
      const { employeeId, licenseId } = action.payload;

      const employee = state.employees.find(
        (emp) => emp.employeeId === employeeId,
      );

      if (!employee) return state;

      if (!employee.assignedLicenses) employee.assignedLicenses = [];

      if (!employee.assignedLicenses.includes(licenseId)) {
        employee.assignedLicenses.push(licenseId);
      }
    },
  },
});

export const {
  setEmployees,
  setFilter,
  clearFilters,
  addEmployee,
  editEmployee,
  deleteEmployee,
  duplicateEmployee,
  addDeviceToEmployee,
  addLicenseToEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;
