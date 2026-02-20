import type { EmployeeInput } from "@/types";

export function validateEmployeeInput(form: EmployeeInput) {
  const errors: Partial<Record<keyof EmployeeInput, string>> = {};

  if (!form.name.trim()) errors.name = "Name is required";

  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Invalid email";

  if (!form.position.trim()) errors.position = "Position is required";

  if (Number.isNaN(form.salary) || form.salary <= 0) errors.salary = "Salary must be > 0";

  return errors;
}
