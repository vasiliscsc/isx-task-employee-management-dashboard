"use client";

import { useEffect, useMemo } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Alert, Box, CircularProgress, Stack, Typography, useColorScheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchEmployees } from "@/redux/employees/employeesSlice";
import { Employee } from "@/types";

export default function EmployeesDataGrid() {
  // MUI colorSchemes: `mode` is undefined on first render (SSR).
  // Guard rendering to prevent hydration mismatch.
  // https://mui.com/material-ui/customization/dark-mode/#toggling-color-mode
  const { mode } = useColorScheme();

  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((s) => s.employees);

  useEffect(() => {
    // status is only idle when employees haven't been fetched yet. Only fetch in that case
    if (status === "idle") {
      dispatch(fetchEmployees());
    }
  }, [dispatch, status]);

  const columns = useMemo<GridColDef<Employee>[]>(
    () => [
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
    ],
    [],
  );

  return (
    <Stack
      spacing={2}
      sx={{ p: 3 }}
    >
      <Typography variant="h5">Employees</Typography>

      {status === "failed" && <Alert severity="error">{error ?? "Failed to load employees"}</Alert>}

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
  );
}
