"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearEmployeeMutations, createEmployee } from "@/redux/employees/employeesSlice";
import type { EmployeeInput } from "@/types";
import EmployeeFormFields from "./EmployeeFormFields";
import { validateEmployeeInput } from "../lib/validateEmployeeInput";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Touched = Partial<Record<keyof EmployeeInput, boolean>>;

const emptyForm: EmployeeInput = {
  name: "",
  email: "",
  position: "",
  salary: 0,
};

export default function CreateEmployeeDialog({ open, onClose }: Props) {
  const dispatch = useAppDispatch();
  const { createStatus, createError } = useAppSelector((s) => s.employees);

  const firstInputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState<EmployeeInput>(emptyForm);
  const [touched, setTouched] = useState<Touched>({});

  useEffect(() => {
    if (open) dispatch(clearEmployeeMutations());
  }, [open]);

  // Reset on close (and clear touched each time it closes)
  useEffect(() => {
    if (!open) {
      setTouched({});
      setForm(emptyForm);
    }
  }, [open]);

  const errors = useMemo(() => validateEmployeeInput(form), [form]);

  const isSubmitting = createStatus === "loading";
  const isValid = Object.keys(errors).length === 0;
  const canSubmit = isValid && !isSubmitting;

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
      createEmployee({
        name: form.name.trim(),
        email: form.email.trim(),
        position: form.position.trim(),
        salary: Number(form.salary),
      }),
    );

    if (createEmployee.fulfilled.match(res)) {
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
      maxWidth="xs"
    >
      <DialogTitle sx={{ pb: 1 }}>Create employee</DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {createStatus === "failed" && (
          <Alert
            severity="error"
            variant="outlined"
            sx={{ mb: 3 }}
          >
            {createError ?? "Failed to create employee"}
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

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          disabled={isSubmitting}
          color="inherit"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <CircularProgress
              size={18}
              sx={{ m: "3px" }}
            />
          )}
          {!isSubmitting && "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
