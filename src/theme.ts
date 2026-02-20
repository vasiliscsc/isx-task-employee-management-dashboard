"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    dark: true,
  },
  typography: {
    fontFamily: ["var(--font-geist-mono)", "var(--font-geist-sans)"].join(","),
  },
});

export default theme;
