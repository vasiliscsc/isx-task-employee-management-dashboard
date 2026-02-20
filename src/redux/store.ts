import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./employees/employeesSlice";

/**
 * Redux store factory instead of singleton, based on Next.js integration documentation, specifically for the case of AppRouter
 *
 * RSCs ability to block for data requests means that with the App Router you no longer have getServerSideProps to fetch data for rendering. Any component in the tree can make asynchronous requests for data. While this is very convenient it also means thats if you define global variables (like the Redux store) they will be shared across requests. This is a problem because the Redux store could be contaminated with data from other requests.
 *
 * @see https://redux.js.org/usage/nextjs#the-app-router-architecture-and-redux
 * @returns
 */
export const makeStore = () => {
  return configureStore({
    reducer: {
      employees: employeesReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
