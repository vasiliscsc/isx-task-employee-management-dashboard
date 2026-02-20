import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Employee, EmployeeInput } from "@/types";
import { createEmployeeApi, fetchEmployeesApi } from "@/services/employees";

type EmployeesState = {
  items: Employee[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;

  createStatus: "idle" | "loading" | "succeeded" | "failed";
  createError: string | null;
};

const initialState: EmployeesState = {
  items: [],
  status: "idle",
  error: null,

  createStatus: "idle",
  createError: null,
};

export const createEmployee = createAsyncThunk<Employee, EmployeeInput>(
  "employees/createEmployee",
  async (employee) => {
    return await createEmployeeApi(employee);
  },
);

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
      });
  },
});

export default employeesSlice.reducer;
