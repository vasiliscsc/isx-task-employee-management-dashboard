import api from "./api";
import type { Employee } from "@/types";

export async function fetchEmployeesApi(): Promise<Employee[]> {
  const res = await api.get<Employee[]>("/employees");
  return res.data;
}
