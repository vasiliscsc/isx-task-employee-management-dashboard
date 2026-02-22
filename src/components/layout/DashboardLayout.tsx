"use client";

import { useState } from "react";
import { Box, Stack } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const sidebarWidth = 240;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar
        sidebarWidth={sidebarWidth}
        mobileOpen={mobileOpen}
        onClose={handleDrawerToggle}
      />
      <Stack sx={{ flexGrow: 1, minWidth: 0 }}>
        <Navbar onMenuClick={handleDrawerToggle} />
        <Box
          component="main"
          sx={{ py: { xs: 2, md: 4 }, px: { xs: 2, sm: 3, md: 6, lg: 8 }, minWidth: 320 }}
        >
          {children}
        </Box>
      </Stack>
    </Box>
  );
}
