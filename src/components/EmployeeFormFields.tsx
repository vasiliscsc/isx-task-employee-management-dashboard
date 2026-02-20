"use client";

import type { EmployeeInput } from "@/types";
import { Stack, TextField } from "@mui/material";
import type { RefObject } from "react";

type Touched = Partial<Record<keyof EmployeeInput, boolean>>;
type Errors = Partial<Record<keyof EmployeeInput, string>>;

type Props = {
  form: EmployeeInput;
  setForm: React.Dispatch<React.SetStateAction<EmployeeInput>>;
  touched: Touched;
  setTouched: React.Dispatch<React.SetStateAction<Touched>>;
  errors: Errors;
  disabled?: boolean;
  firstInputRef?: RefObject<HTMLInputElement | null>;
};

export default function EmployeeFormFields({
  form,
  setForm,
  touched,
  setTouched,
  errors,
  disabled = false,
  firstInputRef,
}: Props) {
  const markTouched = (key: keyof EmployeeInput) => setTouched((t) => ({ ...t, [key]: true }));

  return (
    <Stack
      spacing={2}
      sx={{ mt: 1 }}
    >
      <TextField
        label="Name"
        value={form.name}
        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
        onBlur={() => markTouched("name")}
        error={!!touched.name && !!errors.name}
        helperText={touched.name ? errors.name : ""}
        fullWidth
        disabled={disabled}
        inputRef={firstInputRef}
      />

      <TextField
        label="Email"
        value={form.email}
        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
        onBlur={() => markTouched("email")}
        error={!!touched.email && !!errors.email}
        helperText={touched.email ? errors.email : ""}
        fullWidth
        disabled={disabled}
      />

      <TextField
        label="Position"
        value={form.position}
        onChange={(e) => setForm((p) => ({ ...p, position: e.target.value }))}
        onBlur={() => markTouched("position")}
        error={!!touched.position && !!errors.position}
        helperText={touched.position ? errors.position : ""}
        fullWidth
        disabled={disabled}
      />

      <TextField
        label="Salary"
        type="number"
        value={form.salary}
        onChange={(e) => setForm((p) => ({ ...p, salary: Number(e.target.value) }))}
        onBlur={() => markTouched("salary")}
        error={!!touched.salary && !!errors.salary}
        helperText={touched.salary ? errors.salary : ""}
        fullWidth
        slotProps={{
          htmlInput: { min: 0 },
        }}
        disabled={disabled}
      />
    </Stack>
  );
}
