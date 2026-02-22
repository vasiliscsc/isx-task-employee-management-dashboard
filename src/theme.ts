"use client";
import { createTheme, alpha } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";

const ISX_GOLD = "#FAD900";
const ISX_NAVY = "#001336";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: ISX_NAVY, contrastText: "#FFFFFF" },
        secondary: { main: ISX_GOLD, contrastText: ISX_NAVY },

        background: {
          default: "#F2F3F5",
          paper: "#FFFFFF",
        },
        text: {
          primary: "#0A1A40",
          secondary: "#334155",
        },
        divider: alpha(ISX_NAVY, 0.12),
      },
    },

    dark: {
      palette: {
        mode: "dark",

        primary: { main: ISX_NAVY, contrastText: "#FFFFFF" },
        secondary: { main: ISX_GOLD, contrastText: ISX_NAVY },

        background: {
          default: "#0B1220",
          paper: "#142033",
        },

        text: {
          primary: "#F8FAFC",
          secondary: "#CBD5E1",
        },

        divider: alpha("#FFFFFF", 0.1),
      },
    },
  },

  typography: {
    fontFamily: ["var(--font-inter)", "system-ui", "sans-serif"].join(","),
    h5: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam: any) => ({
        ".MuiDataGrid-panel .MuiCheckbox-root.MuiCheckbox-colorPrimary": {
          color: themeParam.palette.secondary.main,
        },
        ".MuiDataGrid-panel .MuiButton-colorPrimary": {
          color: themeParam.palette.secondary.main,
        },
      }),
    },

    MuiPaper: { styleOverrides: { rounded: { borderRadius: 12 } } },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          boxShadow: "0px 12px 40px rgba(0, 0, 0, 0.35)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        containedSecondary: {
          backgroundColor: ISX_GOLD,
          color: ISX_NAVY,
          "&:hover": { backgroundColor: "#c7ac00" },
        },
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        root: ({ theme }) => ({
          "--unstable_DataGrid-headWeight": 700,
          "& .MuiDataGrid-toolbar .MuiIconButton-colorPrimary": {
            color: theme.palette.secondary.main,
          },
          "& .MuiDataGrid-toolbar .MuiBadge-badge": {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
          },
        }),
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 10,
          marginInline: theme.spacing(1),
          marginBlock: theme.spacing(0.5),
          borderLeft: `8px solid transparent`,

          "&.Mui-selected": {
            background: "none",
            backgroundColor: "transparent",
            borderLeft: `8px solid ${theme.palette.secondary.main}`,

            "& .MuiListItemIcon-root": {
              color: ISX_GOLD,
            },

            "& .MuiListItemText-primary": {
              fontWeight: 800,
            },
          },
          "&.Mui-selected:hover": {
            backgroundColor: alpha(ISX_GOLD, 0.25),
          },
        }),
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.text.primary,
          },
        }),
        notchedOutline: ({ theme }) => ({
          borderColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.23)",
        }),
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.Mui-focused": {
            color: theme.palette.text.primary,
          },
        }),
      },
    },
  },
});

export default theme;
