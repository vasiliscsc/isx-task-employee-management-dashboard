import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Employee, EmployeeId, EmployeeInput } from "@/types";
import { createEmployeeApi, deleteEmployeeApi, fetchEmployeesApi, updateEmployeeApi } from "@/services/employees";

type EmployeesState = {
  items: Employee[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;

  createStatus: "idle" | "loading" | "succeeded" | "failed";
  createError: string | null;

  updateStatus: "idle" | "loading" | "succeeded" | "failed";
  updateError: string | null;

  deleteStatus: "idle" | "loading" | "succeeded" | "failed";
  deleteError: string | null;
};

const initialState: EmployeesState = {
  items: [],
  status: "idle",
  error: null,

  createStatus: "idle",
  createError: null,

  updateStatus: "idle",
  updateError: null,

  deleteStatus: "idle",
  deleteError: null,
};

export const createEmployee = createAsyncThunk<Employee, EmployeeInput>(
  "employees/createEmployee",
  async (employee) => {
    return await createEmployeeApi(employee);
  },
);

export const updateEmployee = createAsyncThunk<Employee, { id: EmployeeId; changes: EmployeeInput }>(
  "employees/updateEmployee",
  async ({ id, changes }) => {
    return await updateEmployeeApi(id, changes);
  },
);

export const deleteEmployee = createAsyncThunk<EmployeeId, EmployeeId>("employees/deleteEmployee", async (id) => {
  await deleteEmployeeApi(id);
  return id;
});

export const fetchEmployees = createAsyncThunk<Employee[]>("employees/fetchEmployees", async () => {
  return await fetchEmployeesApi();
});

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch employees";
      })

      .addCase(createEmployee.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        // add new employee to the top so user sees it immediately
        state.items = [action.payload, ...state.items];
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.error.message ?? "Failed to create employee";
      })

      .addCase(updateEmployee.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const idx = state.items.findIndex((e) => e.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.error.message ?? "Failed to update employee";
      })

      .addCase(deleteEmployee.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.items = state.items.filter((e) => e.id !== action.payload);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.error.message ?? "Failed to update employee";
      });
  },
});

export default employeesSlice.reducer;
