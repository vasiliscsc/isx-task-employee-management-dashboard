import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Employee, EmployeeId, EmployeeInput, EmployeesQuery } from "@/types";
import { createEmployeeApi, deleteEmployeeApi, fetchEmployeesApi, updateEmployeeApi } from "@/services/employees";
import { RootState } from "../store";

type EmployeesState = {
  items: Employee[];
  query: EmployeesQuery;
  currentRequestId: string | null;
  total: number;
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
  query: {
    page: 0,
    pageSize: 10,
  },
  currentRequestId: null,
  total: 0,
  status: "idle",
  error: null,

  createStatus: "idle",
  createError: null,

  updateStatus: "idle",
  updateError: null,

  deleteStatus: "idle",
  deleteError: null,
};

export const createEmployee = createAsyncThunk<Employee, EmployeeInput, { state: RootState }>(
  "employees/createEmployee",
  async (employee, thunkAPI) => {
    // this throws if unsuccessful so the query refetch will not happen
    const created = await createEmployeeApi(employee);

    const q = thunkAPI.getState().employees.query;
    await thunkAPI.dispatch(fetchEmployees(q));

    return created;
  },
);

export const updateEmployee = createAsyncThunk<
  Employee,
  { id: EmployeeId; changes: EmployeeInput },
  { state: RootState }
>("employees/updateEmployee", async ({ id, changes }, thunkAPI) => {
  // this throws if unsuccessful so the query refetch will not happen
  const updated = await updateEmployeeApi(id, changes);

  const q = thunkAPI.getState().employees.query;
  await thunkAPI.dispatch(fetchEmployees(q));

  return updated;
});

export const deleteEmployee = createAsyncThunk<EmployeeId, EmployeeId, { state: RootState }>(
  "employees/deleteEmployee",
  async (id, thunkAPI) => {
    // this throws if unsuccessful so the query refetch will not happen
    await deleteEmployeeApi(id);

    const q = thunkAPI.getState().employees.query;
    await thunkAPI.dispatch(fetchEmployees(q));

    return id;
  },
);

export const fetchEmployees = createAsyncThunk<{ items: Employee[]; total: number }, EmployeesQuery>(
  "employees/fetchEmployees",
  async (query) => {
    return await fetchEmployeesApi(query);
  },
);

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    clearEmployeeMutations(state) {
      state.createStatus = "idle";
      state.createError = null;
      state.updateStatus = "idle";
      state.updateError = null;
      state.deleteStatus = "idle";
      state.deleteError = null;
    },
    setEmployeesQuery(state, action: PayloadAction<EmployeesQuery>) {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
        // overwrite current with new requestId - always keep most fresh request
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        // guard against potential race conditions
        if (state.currentRequestId !== action.meta.requestId) return;
        state.currentRequestId = null;
        state.status = "succeeded";
        state.items = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        // guard against potential race conditions
        if (state.currentRequestId !== action.meta.requestId) return;
        state.currentRequestId = null;
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch employees";
      })

      .addCase(createEmployee.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createEmployee.fulfilled, (state) => {
        state.createStatus = "succeeded";
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.error.message ?? "Failed to create employee";
      })

      .addCase(updateEmployee.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(updateEmployee.fulfilled, (state) => {
        state.updateStatus = "succeeded";
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.error.message ?? "Failed to update employee";
      })

      .addCase(deleteEmployee.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteEmployee.fulfilled, (state) => {
        state.deleteStatus = "succeeded";
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.error.message ?? "Failed to delete employee";
      });
  },
});

export const { clearEmployeeMutations, setEmployeesQuery } = employeesSlice.actions;

export default employeesSlice.reducer;
