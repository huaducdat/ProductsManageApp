import { AppBar, Box, Button, Typography, Toolbar } from "@mui/material";
import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ProductDetailPage() {
  return (
    <Box className="min-h-screen w-full bg-white">
      <AppBar sx={{ bgcolor: "rgba(228, 228, 228, 1)" }}>
        <Toolbar className="justify-between items-center text-center flex-wrap">
          <Button variant="contained" component={RouterLink} to="/DashBoard" className="gap-1">
            <ArrowBackIcon /> Back
          </Button>
          <Typography variant="overline" color="primary" fontWeight={900}>
            Product Detail
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
