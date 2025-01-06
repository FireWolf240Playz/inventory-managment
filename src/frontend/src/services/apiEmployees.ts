import { Employee } from "../store/slices/employees/employeeSlice.ts";

import api from "./api.ts";

export async function getEmployees(): Promise<Employee[]> {
  const response = await api.get("/employees");

  return response.data.data.employees;
}
export async function getEmployee(id: string): Promise<Employee> {
  const response = await api.get(`/employees/${id}`);
  return response.data.data.employee;
}

export async function createEmployee(employee: Employee): Promise<void> {
  await api.post("/employees", employee);
}

export async function editEmployee(employee: Employee): Promise<void> {
  await api.put(`/employees/${employee.employeeId}`, employee);
}

export async function deleteEmployee(id: string): Promise<void> {
  await api.delete(`/employees/${id}`);
}
