"use client";

import { AppBar, Toolbar, IconButton, Box, Avatar, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brand from "./Brand";
import ThemeToggle from "./ThemeToggle";

type Props = {
  onMenuClick: () => void;
};

export default function NavBar({ onMenuClick }: Props) {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        width: "100%",
      }}
    >
      <Toolbar>
        <Stack
          direction="row"
          spacing={{ xs: 0.5, sm: 1.5 }}
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <IconButton
            edge="start"
            onClick={onMenuClick}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Brand sx={{ display: { md: "none" } }} />

          <Box sx={{ flexGrow: 1 }} />

          <ThemeToggle />

          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: "secondary.main",
              color: "secondary.contrastText",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            VN
          </Avatar>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
