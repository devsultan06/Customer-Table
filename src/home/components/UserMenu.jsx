import React, { useState } from "react";
import { Menu, MenuItem, Button, IconButton } from "@mui/material";
import {
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

export default function UserMenu({ email, handleLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          color: "black", // Adjust the color based on your theme
          marginRight: "2px",
        }}
      >
        <AccountCircleIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          disabled
          sx={{
            color: "black", // Adjust the color based on your theme
          }}
        >
          {email}
        </MenuItem>
        <Button
          onClick={handleLogout}
          variant="contained"
          startIcon={<LogoutIcon />}
          sx={{
            marginLeft: "15px",
          }}
        >
          Logout
        </Button>
      </Menu>
    </>
  );
}
