import EmployeesDataGrid from "@/features/employees/components/EmployeesDataGrid";
import { Box, Paper } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <Paper
        elevation={1}
        sx={{ p: 3, borderRadius: 2 }}
      >
        <EmployeesDataGrid />
      </Paper>
    </Box>
  );
}
