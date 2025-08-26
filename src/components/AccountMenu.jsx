import SettingsIcon from "@mui/icons-material/Settings";
import {
  Avatar,
  IconButton,
  MenuItem,
  Tooltip,
  Menu,
  ListItemIcon,
  Divider,
  Stack,
} from "@mui/material";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

export default function AccountMenu({
  onProfile,
  avatarUrl,
  userName = "Dat",
  onSettings,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  return (
    <>
      <Tooltip title="Account">
        <IconButton
          onClick={handleOpen}
          size="small"
          className="rounded-full hover:ring-2 hover:ring-white/70"
          aria-controls={open ? "acount-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          sx={{
            outline: "none",
            "&:focus": { border: "none", outline: "none" },
          }}
        >
          <Avatar
            src={avatarUrl || undefined}
            sx={{ width: 36, height: 36, bgcolor: "white", color: "black" }}
          >
            {<strong>{userName?.[0]?.toUpperCase()}</strong> || (
              <strong>U</strong>
            )}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{ paper: { sx: { minWidth: 200 } } }}
      >
        <Stack divider={<Divider variant="middle"/>}>
          <MenuItem onClick={onProfile}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={onSettings}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            Settings
          </MenuItem>
        </Stack>
      </Menu>
    </>
  );
}
