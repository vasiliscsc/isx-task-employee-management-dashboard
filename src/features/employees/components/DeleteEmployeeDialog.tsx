"use client";

import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteEmployee } from "@/redux/employees/employeesSlice";
import type { Employee } from "@/types";

type Props = {
  open: boolean;
  onClose: () => void;
  employee: Employee | null;
};

export default function DeleteEmployeeDialog({ open, onClose, employee }: Props) {
  const dispatch = useAppDispatch();
  const { deleteStatus, deleteError } = useAppSelector((s) => s.employees);

  const isDeleting = deleteStatus === "loading";

  const handleDelete = async () => {
    if (!employee || isDeleting) return;

    const res = await dispatch(deleteEmployee(employee.id));
    if (deleteEmployee.fulfilled.match(res)) {
      onClose();
    }
  };

  if (open && !employee) return null;

  return (
    <Dialog
      open={open}
      onClose={isDeleting ? undefined : onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Delete employee</DialogTitle>

      <DialogContent>
        {deleteStatus === "failed" && (
          <Alert
            severity="error"
            sx={{ mt: 1 }}
          >
            {deleteError ?? "Failed to delete employee"}
          </Alert>
        )}

        <Typography sx={{ mt: 1 }}>
          Are you sure you want to delete <strong>{employee?.name}</strong>?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          disabled={isDeleting || !employee}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
