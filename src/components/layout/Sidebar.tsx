"use client";

import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, Stack } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Brand from "./Brand";
import Link from "next/link";

type Props = {
  mobileOpen: boolean;
  onClose: () => void;
  sidebarWidth: number;
};

export default function Sidebar({ mobileOpen, onClose, sidebarWidth }: Props) {
  const siderbarContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar>
          <Brand />
        </Toolbar>
      </Box>
      <Box
        component="nav"
        sx={{ flex: 1, minHeight: 0, overflowY: "auto", borderRight: "1px solid", borderColor: "divider" }}
      >
        <List
          component="ul"
          disablePadding
        >
          <ListItemButton
            component={Link}
            href="/"
            selected
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Employees" />
          </ListItemButton>

          <ListItemButton
            component={Link}
            href="/"
          >
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: sidebarWidth },
        }}
      >
        {siderbarContent}
      </Drawer>

      {/* Desktop */}
      <Stack
        sx={{
          top: 0,
          position: "sticky",
          display: { xs: "none", md: "flex" },
          width: sidebarWidth,
          flexShrink: 0,
          height: "100vh",
          bgcolor: "background.paper",
        }}
      >
        {siderbarContent}
      </Stack>
    </>
  );
}
