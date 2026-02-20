"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateEmployee } from "@/redux/employees/employeesSlice";
import type { Employee, EmployeeInput } from "@/types";
import EmployeeFormFields from "@/components/EmployeeFormFields";
import { validateEmployeeInput } from "@/lib/validateEmployeeInput";

type Props = {
  open: boolean;
  onClose: () => void;
  employee: Employee | null;
};

type Touched = Partial<Record<keyof EmployeeInput, boolean>>;

const emptyForm: EmployeeInput = {
  name: "",
  email: "",
  position: "",
  salary: 0,
};

export default function EditEmployeeDialog({ open, onClose, employee }: Props) {
  const dispatch = useAppDispatch();
  const { updateStatus, updateError } = useAppSelector((s) => s.employees);

  const firstInputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState<EmployeeInput>(emptyForm);
  const [touched, setTouched] = useState<Touched>({});

  useEffect(() => {
    // Reset on close (and clear touched each time it opens/closes)
    if (!open) {
      setTouched({});
      setForm(emptyForm);
    } else {
      // Employee should not be null in the edit form. If it is, it is some sort of incorrect state
      if (employee) {
        // prefill the form with the selected employee's data
        setForm({
          name: employee.name,
          email: employee.email,
          position: employee.position,
          salary: employee.salary,
        });
      }
    }
  }, [open, employee]);

  const errors = useMemo(() => validateEmployeeInput(form), [form]);

  if (open && !employee) return null;

  const isSubmitting = updateStatus === "loading";
  const isValid = Object.keys(errors).length === 0;
  const canSubmit = isValid && !isSubmitting && !!employee;

  const markAllTouched = () => {
    const allTouched: Partial<Record<keyof EmployeeInput, boolean>> = {};
    const allFormFields: (keyof EmployeeInput)[] = Object.keys(form) as (keyof EmployeeInput)[];

    allFormFields.forEach((key: keyof EmployeeInput) => {
      allTouched[key] = true;
    });

    setTouched(allTouched);
  };

  const handleSubmit = async () => {
    markAllTouched();
    if (!canSubmit) return;

    const res = await dispatch(
      updateEmployee({
        id: employee.id,
        changes: {
          name: form.name.trim(),
          email: form.email.trim(),
          position: form.position.trim(),
          salary: Number(form.salary),
        },
      }),
    );

    if (updateEmployee.fulfilled.match(res)) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={isSubmitting ? undefined : onClose}
      onTransitionEnter={() => {
        // Ensure that no fields are touched when the form opens to prevent showing errors prematurely
        setTouched({});
        firstInputRef.current?.focus();
      }}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Edit employee</DialogTitle>

      <DialogContent>
        {updateStatus === "failed" && (
          <Alert
            severity="error"
            sx={{ mt: 1 }}
          >
            {updateError ?? "Failed to edit employee"}
          </Alert>
        )}

        <EmployeeFormFields
          form={form}
          setForm={setForm}
          touched={touched}
          setTouched={setTouched}
          errors={errors}
          disabled={isSubmitting}
          firstInputRef={firstInputRef}
        />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
