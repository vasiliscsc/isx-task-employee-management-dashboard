import type { EmployeeInput } from "@/types";

export function validateEmployeeInput(form: EmployeeInput) {
  const errors: Partial<Record<keyof EmployeeInput, string>> = {};

  const name = form.name.trim();
  if (!name.trim()) errors.name = "Name is required";
  else if (!/[A-Za-z]/.test(name)) errors.name = "Name must contain at least one letter";
  else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(name)) errors.name = "Invalid characters in name";

  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Invalid email";

  if (!form.position.trim()) errors.position = "Position is required";

  if (Number.isNaN(form.salary) || form.salary <= 0) errors.salary = "Salary must be > 0";

  return errors;
}
