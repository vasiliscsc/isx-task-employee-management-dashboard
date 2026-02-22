import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import ReduxStoreProvider from "./ReduxStoreProvider";
import theme from "@/theme";
import "./globals.css";
import DashboardLayout from "@/components/layout/DashboardLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Employees | iSX Dashboard",
  description:
    "The iSX Employees Dashboard created as the Home Assignment part of the Senior Frontend Engineer interview.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning was added to prevent SSR flickering of theme
    // https://v6.mui.com/material-ui/customization/css-theme-variables/configuration/#next-js-app-router
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${inter.variable}`}>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ReduxStoreProvider>
              <DashboardLayout>{children}</DashboardLayout>
            </ReduxStoreProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
