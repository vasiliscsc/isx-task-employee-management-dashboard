import { SxProps, Typography } from "@mui/material";
import Link from "next/link";

type Props = {
  sx?: SxProps;
};

export default function Brand({ sx }: Props) {
  return (
    <Typography
      component={Link}
      href="/"
      variant="h6"
      sx={{ fontWeight: 700, textDecoration: "none", color: "inherit", ...sx }}
    >
      iSX Dashboard
    </Typography>
  );
}
