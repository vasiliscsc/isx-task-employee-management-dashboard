import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Employee } from "@/types";
import { fetchEmployeesApi } from "@/services/employees";

type EmployeesState = {
  items: Employee[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: EmployeesState = {
  items: [],
  status: "idle",
  error: null,
};

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
      });
  },
});

export default employeesSlice.reducer;
