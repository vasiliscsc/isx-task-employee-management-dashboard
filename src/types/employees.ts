export type EmployeeId = number;

export interface Employee {
  id: EmployeeId;
  name: string;
  email: string;
  position: string;
  salary: number;
}

// For create payloads (json-server can generate id on POST)
export type EmployeeInput = Omit<Employee, "id">;

export type EmployeesQuery = {
  page: number;
  pageSize: number;
  sortField?: keyof Employee;
  sortDir?: "asc" | "desc";
  search?: string;
};
