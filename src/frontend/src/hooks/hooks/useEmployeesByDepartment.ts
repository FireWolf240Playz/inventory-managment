// src/hooks/useEmployeesByDepartment.ts
import { Employee } from "../../store/slices/employees/employeeSlice.ts";
import { getEmployees } from "../../services/apiEmployees.ts";
import { useGroupedData } from "./useGroupedData";

function groupEmployeesByDepartment(employees: Employee[]) {
  const departmentMap: Record<string, number> = {};

  employees.forEach((employee) => {
    const dept = employee.department || "Unknown";
    departmentMap[dept] = (departmentMap[dept] || 0) + 1;
  });

  return Object.entries(departmentMap).map(([dept, count]) => ({
    label: dept,
    value: count,
  }));
}

export function useEmployeesByDepartment() {
  return useGroupedData<Employee>(getEmployees, groupEmployeesByDepartment);
}
