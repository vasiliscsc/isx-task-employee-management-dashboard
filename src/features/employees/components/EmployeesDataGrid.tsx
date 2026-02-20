"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { GridActionsCellItem, DataGrid, type GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Alert, Box, CircularProgress, Stack, Typography, useColorScheme, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchEmployees } from "@/redux/employees/employeesSlice";
import { Employee } from "@/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateEmployeeDialog from "./CreateEmployeeDialog";
import EditEmployeeDialog from "./EditEmployeeDialog";
import DeleteEmployeeDialog from "./DeleteEmployeeDialog";

function buildEmployeeColumns(
  openEditDialog: (e: Employee) => void,
  openDeleteDialog: (e: Employee) => void,
): GridColDef<Employee>[] {
  return [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 160 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 220 },
    { field: "position", headerName: "Position", flex: 1, minWidth: 160 },
    {
      field: "salary",
      headerName: "Salary",
      type: "number",
      flex: 0.6,
      minWidth: 120,
      valueFormatter: (value: number | null) => (value ?? 0).toLocaleString(),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 110,
      getActions: (params: GridRowParams<Employee>) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          onClick={() => openEditDialog(params.row)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => openDeleteDialog(params.row)}
          showInMenu
        />,
      ],
    },
  ];
}

function useEmployeeDialogs() {
  const [activeDialog, setActiveDialog] = useState<"create" | "edit" | "delete" | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const closeDialog = useCallback(() => {
    setActiveDialog(null);
    setSelectedEmployee(null);
  }, []);

  const openCreateDialog = useCallback(() => {
    setSelectedEmployee(null);
    setActiveDialog("create");
  }, []);

  const openEditDialog = useCallback((e: Employee) => {
    setSelectedEmployee(e);
    setActiveDialog("edit");
  }, []);

  const openDeleteDialog = useCallback((e: Employee) => {
    setSelectedEmployee(e);
    setActiveDialog("delete");
  }, []);

  return {
    activeDialog,
    selectedEmployee,
    openCreateDialog,
    openEditDialog,
    openDeleteDialog,
    closeDialog,
  };
}

type EmployeeDialogsProps = {
  activeDialog: "create" | "edit" | "delete" | null;
  selectedEmployee: Employee | null;
  onClose: () => void;
};

function EmployeeDialogs({ activeDialog, selectedEmployee, onClose }: EmployeeDialogsProps) {
  return (
    <>
      <CreateEmployeeDialog
        open={activeDialog === "create"}
        onClose={onClose}
      />
      <EditEmployeeDialog
        open={activeDialog === "edit"}
        onClose={onClose}
        employee={selectedEmployee}
      />
      <DeleteEmployeeDialog
        open={activeDialog === "delete"}
        onClose={onClose}
        employee={selectedEmployee}
      />
    </>
  );
}

export default function EmployeesDataGrid() {
  // MUI colorSchemes: `mode` is undefined on first render (SSR).
  // Guard rendering to prevent hydration mismatch.
  // https://mui.com/material-ui/customization/dark-mode/#toggling-color-mode
  const { mode } = useColorScheme();

  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((s) => s.employees);
  const { activeDialog, selectedEmployee, openCreateDialog, openEditDialog, openDeleteDialog, closeDialog } =
    useEmployeeDialogs();

  useEffect(() => {
    // status is only idle when employees haven't been fetched yet. Only fetch in that case
    if (status === "idle") {
      dispatch(fetchEmployees());
    }
  }, [dispatch, status]);

  const columns = useMemo(
    () => buildEmployeeColumns(openEditDialog, openDeleteDialog),
    [openEditDialog, openDeleteDialog],
  );

  return (
    <>
      <Stack
        spacing={2}
        sx={{ p: 3 }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">Employees</Typography>
          <Button
            variant="contained"
            onClick={openCreateDialog}
          >
            Add employee
          </Button>
        </Stack>

        {status === "failed" && (
          <Alert severity="error">{error ? `Failed to load employees: ${error}` : "Failed to load employees"}</Alert>
        )}

        <Box sx={{ height: 520, width: "100%" }}>
          {mode ? (
            <DataGrid<Employee>
              rows={items}
              columns={columns}
              loading={status === "loading"}
              disableRowSelectionOnClick
              pagination
              initialState={{
                pagination: { paginationModel: { page: 0, pageSize: 10 } },
              }}
              pageSizeOptions={[5, 10, 25, 50]}
              showToolbar
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 300 },
                },
              }}
            />
          ) : (
            <Box sx={{ height: "100%", width: "100%", display: "grid", placeItems: "center" }}>
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Stack>
      <EmployeeDialogs
        activeDialog={activeDialog}
        selectedEmployee={selectedEmployee}
        onClose={closeDialog}
      />
    </>
  );
}
