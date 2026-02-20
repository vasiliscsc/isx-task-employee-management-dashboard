export type EmployeeId = number;

export interface Employee {
  id: EmployeeId;
  name: string;
  email: string;
  position: string;
  salary: number;
}
