import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import { Image } from "antd";
import logo from "./Imgs/CompanyLogo1.png";

export default function DashBoard() {
  return (
    <Box className="min-h-svh min-w-svw bg-white">
      <AppBar position="fixed" color="primary">
        <Toolbar variant="regular" className="bg-blue-500">
          <Stack
            direction="row"
            spacing={1}
            divider={
              <Divider orientation="vertical" flexItem className="bg-white" />
            }
            className="flex items-center"
            sx={{py:1}}
          >
            <Image src={logo} alt="logo" style={{ height: "60px" }} />
            <Typography variant="h6" fontWeight={700}>
              Dash Board
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
