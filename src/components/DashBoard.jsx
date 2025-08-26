import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Divider,
  Button as MuiButton,
} from "@mui/material";
import { Button, Image, Skeleton } from "antd";
import logo from "./Imgs/CompanyLogo1.png";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountMenu from "./AccountMenu";
import Products, { cooldown } from "./Products";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function DashBoard() {
  const navigate = useNavigate();
  const [err, setErr] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const fletch = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data);
    } catch (e) {
      setErr(`Can't Load`);
      setLoading(false);
    } finally {
      setErr(undefined);
      await cooldown(900);
      setLoading(false);
    }
  };
  //get Data
  useEffect(() => {
    fletch();
  }, []);
  return (
    <Box className="min-h-svh min-w-svw h-auto bg-white flex flex-col gap-3 justify-start items-center">
      <AppBar position="static" color="primary">
        <Toolbar variant="regular" className="bg-blue-500 flex justify-between">
          <Stack
            direction="row"
            spacing={1}
            divider={
              <Divider orientation="vertical" flexItem className="bg-white" />
            }
            className="flex items-center"
            sx={{ py: 1 }}
          >
            <Image src={logo} alt="logo" style={{ height: "60px" }} />
            <Typography variant="h6" fontWeight={700}>
              Dash Board
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            divider={<Divider orientation="vertical" color="white" />}
          >
            <AccountMenu />
            <MuiButton
              onClick={() => navigate("/")}
              variant="outlined"
              color="rgba(255, 255, 255, 1)"
              className="gap-1"
              sx={{ "&:hover": { borderColor: "rgba(0, 4, 255, 1)" } }}
            >
              <LogoutIcon />
              Logout
            </MuiButton>
          </Stack>
        </Toolbar>
      </AppBar>

      {loading ? (
        <Skeleton active />
      ) : (
        <Box p={2}>
          <Products lst={products} />
        </Box>
      )}
    </Box>
  );
}
