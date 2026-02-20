import api from "./api";
import type { Employee, EmployeeId, EmployeeInput } from "@/types";

export async function fetchEmployeesApi(): Promise<Employee[]> {
  const res = await api.get<Employee[]>("/employees");
  return res.data;
}

export async function createEmployeeApi(employee: EmployeeInput): Promise<Employee> {
  const res = await api.post("/employees", employee);
  return res.data;
}

export async function updateEmployeeApi(id: EmployeeId, changes: EmployeeInput): Promise<Employee> {
  const res = await api.put<Employee>(`/employees/${id}`, changes);
  return res.data;
}

export async function deleteEmployeeApi(id: EmployeeId): Promise<void> {
  await api.delete(`/employees/${id}`);
}
