import React, { useState } from "react";
import { Menu, MenuItem, Button, IconButton } from "@mui/material";
import {
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function UserMenu({ email, handleLogout }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickAdmin = () => {
    navigate("/admin");
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
          onClick={handleClickAdmin}
          variant="contained"
          sx={{
            marginLeft: "15px",
            marginBottom: "15px",
          }}
        >
          Go to Admin
        </Button>
        <br />
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
