import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../../store.ts";

export const selectEmployees = (state: RootState) => state.employees.employees;
export const selectEmployeesFilter = (state: RootState) =>
  state.employees.filters;

export const selectFilteredEmployees = createSelector(
  [selectEmployees, selectEmployeesFilter],
  (employees, filters) => {
    return employees.filter((emp) => {
      if (filters.employeeId) {
        const ids = Array.isArray(filters.employeeId)
          ? filters.employeeId
          : [filters.employeeId];
        if (!ids.includes(emp.employeeId)) return false;
      }

      if (filters.employeeName) {
        const names = Array.isArray(filters.employeeName)
          ? filters.employeeName
          : [filters.employeeName];
        if (!names.includes(emp.employeeName)) return false;
      }

      if (filters.department) {
        const departments = Array.isArray(filters.department)
          ? filters.department
          : [filters.department];
        if (!departments.includes(emp.department)) return false;
      }

      if (filters.location) {
        const locations = Array.isArray(filters.location)
          ? filters.location
          : [filters.location];
        if (!locations.includes(emp.location)) return false;
      }

      if (filters.role) {
        const roles = Array.isArray(filters.role)
          ? filters.role
          : [filters.role];
        const hasMatchingRole = emp.role.some((r) => roles.includes(r));
        if (!hasMatchingRole) return false;
      }

      return true;
    });
  },
);

//Department
export const selectDepartmentOptions = createSelector(
  [selectEmployees],
  (employees) => {
    return Array.from(new Set(employees.map((emp) => emp.department)))
      .filter(Boolean)
      .map((department) => ({
        value: department,
        label: department,
      }));
  },
);

//Name
export const selectEmployeeNameOptions = createSelector(
  [selectEmployees],
  (employees) =>
    employees.map((emp) => ({
      value: emp.employeeName,
      label: emp.employeeName,
    })),
);

//Id
export const selectEmployeeIdOptions = createSelector(
  [selectEmployees],
  (employees) =>
    employees.map((emp) => ({
      value: emp.employeeId,
      label: emp.employeeId,
    })),
);
export const selectEmployeeRoleOptions = createSelector(
  [selectEmployees],
  (employees) => {
    const allRoles = employees.flatMap((emp) => emp.role);
    const uniqueRoles = Array.from(new Set(allRoles));
    return uniqueRoles.map((role) => ({
      value: role,
      label: role,
    }));
  },
);

export const selectEmployeeLocationOptions = createSelector(
  [selectEmployees],
  (employees) => {
    const allLocations = employees.flatMap((emp) => emp.location);
    const uniqueLocations = Array.from(new Set(allLocations));
    return uniqueLocations.map((location) => ({
      value: location,
      label: location,
    }));
  },
);

export const selectAllEmployees = createSelector(
  [selectEmployees],
  (employees) => {
    return employees.map((emp) => ({
      value: emp.employeeId,
      label: emp.employeeName,
    }));
  },
);

export const findEmployeeById = (id: string) =>
  createSelector([selectEmployees], (employees) =>
    employees.find((employee) => employee.employeeId === id),
  );
