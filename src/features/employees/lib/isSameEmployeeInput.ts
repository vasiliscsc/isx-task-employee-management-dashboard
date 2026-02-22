import { Employee, EmployeeInput } from "@/types";

function normalizeEmployeeInput(e: EmployeeInput): EmployeeInput {
  return {
    name: e.name.trim(),
    email: e.email.trim(),
    position: e.position.trim(),
    salary: Number(e.salary),
  };
}

export function isSameEmployeeInput(e1: EmployeeInput, e2: EmployeeInput): boolean {
  const ne1 = normalizeEmployeeInput(e1);
  const ne2 = normalizeEmployeeInput(e2);

  return ne1.name === ne2.name && ne1.email === ne2.email && ne1.position === ne2.position && ne1.salary === ne2.salary;
}

export function toEmployeeInput(e: Employee): EmployeeInput {
  const { id: _id, ...employeeInput } = e;
  void _id; // satisfy eslint
  return employeeInput;
}
