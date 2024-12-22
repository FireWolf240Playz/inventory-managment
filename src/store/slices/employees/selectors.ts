import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../../store.ts";

export const selectEmployees = (state: RootState) => state.employees.employees;
export const selectEmployeesFilter = (state: RootState) =>
  state.employees.filters;

export const selectFilteredEmployees = createSelector(
  [selectEmployees, selectEmployeesFilter],
  (employees, filters) => {
    return employees.filter((emp) => {
      if (filters.employeeId && emp.employeeId !== filters.employeeId)
        return false;
      if (filters.employeeName && emp.employeeName !== filters.employeeName)
        return false;

      if (filters.department && emp.department !== filters.department)
        return false;
      return !(filters.role && emp.role !== filters.role);
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
