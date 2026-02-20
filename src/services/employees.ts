import api from "./api";
import type { Employee, EmployeeInput } from "@/types";

export async function fetchEmployeesApi(): Promise<Employee[]> {
  const res = await api.get<Employee[]>("/employees");
  return res.data;
}

export async function createEmployeeApi(employee: EmployeeInput): Promise<Employee> {
  const res = await api.post("/employees", employee);
  return res.data;
}
